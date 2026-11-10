import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkout } from "../../../services/checkout/checkout.service";
import { queryKeys } from "../../../utils/queryKeys";

let count = 0;
export const useCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    
    mutationFn: checkout,
    onSuccess: (res) => {
      console.log("CheckoutUrl:",count)
      const checkoutUrl = res?.data?.checkoutURL;
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }

      queryClient.invalidateQueries({
        queryKey: queryKeys.cart.all,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.buyerOrders.all,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.shopOrders.all,
      });
    },
  });
};