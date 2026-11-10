import axios from "axios";
import { store } from "../store/store";
import { logout } from "../store/slices/auth.slice";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });

  failedQueue = [];
};

const forceLogout = () => {
  store.dispatch(logout());

  const currentPath = window.location.pathname;

  if (currentPath !== "/login") {
    window.location.replace("/login");
  }
};

apiClient.interceptors.response.use(
  (response) => response.data,

  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }

    const isUnauthorized = error.response.status === 401;

    const isRefreshRequest =
      originalRequest?.url?.includes("/auth/refresh-token");

    if (isRefreshRequest) {
      forceLogout();
      return Promise.reject(error);
    }

    if (isUnauthorized && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => apiClient(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axios.post(
          "http://localhost:5000/api/v1/auth/refresh-token",
          {},
          { withCredentials: true }
        );

        processQueue(null);

        return apiClient(originalRequest);
      } catch (err) {
        processQueue(err);
        forceLogout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);