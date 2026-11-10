import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../utils/queryKeys";
import { 
    getBookingById, 
    getMyBookings, 
    cancelBooking, 
    createBooking, 
    deleteBooking,
    acceptBooking,
    completeBooking,
    payBooking
} from "../../../services/booking/booking.service";
import { redirect } from "react-router-dom";

export const useBooking = (id, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.bookings.detail(id),
    enabled: !!id && enabled,
    queryFn: async ()=> await getBookingById(id),
    select: (res) => {
      return res?.data?.data;
    },
  });
};

export const useMyBookings = (params = {}) => {
  return useQuery({
    queryKey: queryKeys.bookings.my(params),
    queryFn: async ()=> await getMyBookings(params),
    staleTime: 1000 * 60 * 2,
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.bookings.all,
      });
    }
  });
};

export const useAcceptBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: acceptBooking,
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.bookings.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.bookings.detail(id),
      });
    }
  });
};

export const useCompleteBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: completeBooking,
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.bookings.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.bookings.detail(id),
      });
    }
  });
};

export const usePayBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: payBooking,
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.bookings.all,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.bookings.detail(id),
      });

      if(data.checkoutURL)
        window.location.href = data.checkoutURL;
    }
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelBooking,
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.bookings.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.bookings.detail(id),
      });
    }
  });
};

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.bookings.all,
      });
    }
  });
};