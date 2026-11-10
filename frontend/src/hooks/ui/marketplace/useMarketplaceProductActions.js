import { useNavigate } from "react-router-dom";
import { useAddToCart } from "../../api/cart/cart.hooks";


export function useMarketplaceProductActions() {
  const navigate = useNavigate();
  const addToCartMutation = useAddToCart();

  const handleCardClick = (product) => {
    
  };

  const handleAddToCart = (product) => {
    addToCartMutation.mutate({
      productId: product._id,
      quantity: 1
    });
  };

  return {
    handleCardClick,
    handleAddToCart,
    isAddingToCart: addToCartMutation.isPending
  };
}