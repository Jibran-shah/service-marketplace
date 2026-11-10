import { apiClient } from "../apiClient";

// ================= HELPERS =================
const logRequest = (name, payload) => {
  console.log(`[REPORT REQUEST] ${name}`, payload ?? "");
};

const logResponse = (name, response) => {
  console.log(`[REPORT RESPONSE] ${name}`, response?.data);
};

const logError = (name, error) => {
  console.error(
    `[REPORT ERROR] ${name}`,
    error?.response?.data || error.message
  );
};

// ================= REPORTS =================

/**
 * Create a report
 * body:
 * {
 *   entityId,
 *   entityType,
 *   description
 * }
 */
export const createReport = async (data) => {
  try {
    logRequest("createReport", data);

    const res = await apiClient.post("/reports", data);

    logResponse("createReport", res);

    return res;
  } catch (err) {
    logError("createReport", err);
    throw err;
  }
};

/**
 * Get reports with filters
 * params:
 * {
 *   status,
 *   entityType,
 *   page,
 *   limit
 * }
 */
export const getReports = async (params = {}) => {
  try {
    logRequest("getReports", params);

    const res = await apiClient.get("/reports", {
      params,
    });

    logResponse("getReports", res);

    return res;
  } catch (err) {
    logError("getReports", err);
    throw err;
  }
};

/**
 * Get single report
 */
export const getReportById = async (reportId) => {
  try {
    logRequest("getReportById", reportId);

    const res = await apiClient.get(
      `/reports/${reportId}`
    );

    logResponse("getReportById", res);

    return res;
  } catch (err) {
    logError("getReportById", err);
    throw err;
  }
};

/**
 * Update report status
 * body:
 * {
 *   status: "PENDING" | "REVIEWED" | "RESOLVED" | "REJECTED"
 * }
 */
export const updateReportStatus = async (
  reportId,
  data
) => {
  try {
    logRequest("updateReportStatus", {
      reportId,
      ...data,
    });

    const res = await apiClient.patch(
      `/reports/${reportId}/status`,
      data
    );

    logResponse("updateReportStatus", res);

    return res;
  } catch (err) {
    logError("updateReportStatus", err);
    throw err;
  }
};

/**
 * Delete report
 */
export const deleteReport = async (reportId) => {
  try {
    logRequest("deleteReport", reportId);

    const res = await apiClient.delete(
      `/reports/${reportId}`
    );

    logResponse("deleteReport", res);

    return res;
  } catch (err) {
    logError("deleteReport", err);
    throw err;
  }
};