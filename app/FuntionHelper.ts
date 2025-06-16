// "use client";

// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-hot-toast";
// import { addToCartApi } from "@/app/Function";
// import { addToCart } from "@/store/slices/cartSlice";
// import { RootState } from "@/store/store";

// export function useAddToCart() {
//   const dispatch = useDispatch();
//   const token = useSelector((state: RootState) => state.auth.token);

//   const handleAddToCart = async ({
//     product,
//     selectedVariant,
//     quantity = 1,
//   }: {
//     product: any;
//     selectedVariant?: any;
//     quantity?: number;
//   }) => {
//     if (!token) {
//       toast.error("You must be logged in to add items to the cart.");
//       return;
//     }

//     const displayImage = selectedVariant?.imageUrl || product.imageUrl;
//     const displayPrice = selectedVariant?.basePrice ?? product.basePrice;

//     try {
//       await addToCartApi({ productId: product.id, quantity }, token);

//       dispatch(
//         addToCart({
//           id: product.id,
//           name: product.name + (selectedVariant?.name ? ` (${selectedVariant.name})` : ""),
//           basePrice: displayPrice,
//           quantity,
//           image: displayImage,
//           variantId: selectedVariant?.id ?? null,
//           product: undefined,
//           price: undefined,
//         })
//       );

//       toast.success("Added to cart!");
//     } catch (error: any) {
//       toast.error(error.message || "Failed to add to cart");
//       console.error("❌ Add to cart error:", error);
//     }
//   };

//   return { handleAddToCart };
// }




// hooks/useAddToCart.ts
"use client";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addToCartApi } from "@/app/Function";
import { addToCart } from "@/store/slices/cartSlice";
import { RootState } from "@/store/store";

export function useAddToCart() {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleAddToCart = async ({
    product,
    selectedVariant,
    quantity = 1,
  }: {
    product: any;
    selectedVariant?: any;
    quantity?: number;
  }) => {
    if (!token) {
      toast.error("You must be logged in to add items to the cart.");
      return;
    }

    const displayImage = selectedVariant?.images?.[0]?.url || product.imageUrl;
    const displayPrice = selectedVariant?.price ?? product.basePrice;

    try {
      const res = await addToCartApi({
        productId: product.id,
        quantity,
        variantId: selectedVariant?.id ?? null,
      }, token); // ✅ capture response

      dispatch(
        addToCart({
          productId: res.id, // ✅ use response ID
          name: product.name + (selectedVariant?.name ? ` (${selectedVariant.name})` : ""),
          basePrice: displayPrice,
          quantity,
          image: displayImage,
          variantId: selectedVariant?.id ?? null,
          product: undefined,
          price: undefined,
          id: 0
        })
      );

      toast.success("Added to cart!");
    } catch (error: any) {
      toast.error(error.message || "Failed to add to cart");
      console.error("❌ Add to cart error:", error);
    }
  };

  return { handleAddToCart };
}
