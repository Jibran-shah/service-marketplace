import { apiClient } from "../apiClient";

/* =========================
   CHECKOUT
========================= */
export const checkout = async (data) => {
  console.log("[checkout] request data:", data);

  try {
    const res = await apiClient.post("/checkout", data);

    console.log("[checkout] response:", res);
    console.log("[checkout] data:", res?.data);
    return res;
  } catch (error) {
    console.error("[checkout] error:", error);
    throw error; // Important for React Query error handling
  }
};