import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { queryKeys } from "../../../utils/queryKeys";

// services
import {
  createReport,
  getReports,
  getReportById,
  updateReportStatus,
  deleteReport,
} from "../../../services/reports/reports.service";

/* =========================
   CREATE REPORT
========================= */
export const useCreateReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      console.log("[useCreateReport] Payload:", data);
      return createReport(data);
    },

    onSuccess: (data) => {
      console.log("[useCreateReport] Success:", data);

      queryClient.invalidateQueries({
        queryKey: queryKeys.reports.all,
      });
    },

    onError: (error) => {
      console.error("[useCreateReport] Error:", error);
    },
  });
};

/* =========================
   GET REPORTS
========================= */
export const useGetReports = (params = {}) => {
  return useQuery({
    queryKey: queryKeys.reports.list(params),

    queryFn: async () => {
      console.log("[useGetReports] Params:", params);

      const data = await getReports(params);

      console.log("[useGetReports] Response:", data);

      return data;
    },

    keepPreviousData: true,
    staleTime: 2 * 60 * 1000,
  });
};

/* =========================
   GET REPORT BY ID
========================= */
export const useGetReportById = (reportId) => {
  return useQuery({
    queryKey: queryKeys.reports.detail(reportId),

    queryFn: async () => {
      console.log("[useGetReportById] Report ID:", reportId);

      const data = await getReportById(reportId);

      console.log("[useGetReportById] Response:", data);

      return data;
    },

    enabled: !!reportId,
    staleTime: 5 * 60 * 1000,
  });
};

/* =========================
   UPDATE REPORT STATUS
========================= */
export const useUpdateReportStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      reportId,
      status,
    }) => {
      console.log(
        "[useUpdateReportStatus] Payload:",
        {
          reportId,
          status,
        }
      );

      return updateReportStatus(
        reportId,
        { status }
      );
    },

    onSuccess: (data, variables) => {
      console.log(
        "[useUpdateReportStatus] Success:",
        data
      );

      queryClient.invalidateQueries({
        queryKey: queryKeys.reports.all,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.reports.detail(
          variables.reportId
        ),
      });
    },

    onError: (error) => {
      console.error(
        "[useUpdateReportStatus] Error:",
        error
      );
    },
  });
};

/* =========================
   DELETE REPORT
========================= */
export const useDeleteReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reportId) => {
      console.log(
        "[useDeleteReport] Report ID:",
        reportId
      );

      return deleteReport(reportId);
    },

    onSuccess: (data) => {
      console.log(
        "[useDeleteReport] Success:",
        data
      );

      queryClient.invalidateQueries({
        queryKey: queryKeys.reports.all,
      });
    },

    onError: (error) => {
      console.error(
        "[useDeleteReport] Error:",
        error
      );
    },
  });
};