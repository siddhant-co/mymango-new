"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ProductCard from "@/components/Client-side-server/All-products/ProductCard";
import { Product } from "@/types/Products";

export default function WishlistPage() {
  const wishlistItems = useSelector((state: RootState) => state.wishlist?.items || []);

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        Your wishlist is empty 💔
      </div>
    );
  }

  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-20">
      {wishlistItems.map((item) => {
        const mockProduct: Product = {
          id: item.id,
          name: item.title,
          slug: `product-${item.id}`, // Fallback slug for linking
          basePrice: item.price,
          sellingPrice: item.price,
          imageUrl: item.image, // required by ProductCard
          images: [{ url: item.image }],
          variants: [],
          description: "",
          category: "",
        };

        return <ProductCard key={item.id} product={mockProduct} />;
      })}
    </div>
  );
}
