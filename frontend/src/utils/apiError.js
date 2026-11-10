export const parseApiError = (error) => {
  if (!error) return "Unknown error";

  const response = error?.response;

  // Network / no response case
  if (!response) {
    return "Network error. Please check your connection.";
  }

  const data = response?.data;

  // 1. Direct message
  if (typeof data?.message === "string") {
    return data.message;
  }

  // 2. Direct error string
  if (typeof data?.error === "string") {
    return data.error;
  }

  // 3. Nested error object
  if (typeof data?.error?.message === "string") {
    return data.error.message;
  }

  // 4. Validation errors (array support)
  if (Array.isArray(data?.details) && data.details.length > 0) {
    return data.details[0];
  }

  // 5. Fallback
  return "Something went wrong";
};