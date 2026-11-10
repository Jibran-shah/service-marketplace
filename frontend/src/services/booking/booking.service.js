import { apiClient } from "../apiClient";

export const createBooking = async (data) => {
  const res = await apiClient.post("/bookings", data);
  return res.data;
};

export const getMyBookings = async (params) => {
  const res = await apiClient.get("/bookings/my", {params});
  return res.data;
};

export const getBookingById = async (bookingId) => {
  const res = await apiClient.get(`/bookings/${bookingId}`);
  return res.data;
};

export const acceptBooking = async (
  bookingId,
  data
) => {
  const res = await apiClient.patch(`/bookings/${bookingId}/accept`,data);
  return res.data;
};

export const completeBooking = async (
  bookingId,
  data
) => {
  const res = await apiClient.patch(`/bookings/${bookingId}/complete`,data);
  return res.data;
};

export const payBooking = async (
  bookingId,
  data
) => {
  const res = await apiClient.patch(`/bookings/${bookingId}/pay`,data);
  return res.data;
};

export const cancelBooking = async (bookingId) => {
  const res = await apiClient.patch(`/bookings/${bookingId}/cancel`);
  return res.data;
};

export const deleteBooking = async (bookingId) => {
  const res = await apiClient.delete(`/bookings/${bookingId}`);
  return res.data;
};