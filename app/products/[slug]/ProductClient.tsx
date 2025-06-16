"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product, Variant } from "@/types/Products";
import { useAddToCart } from "@/app/FuntionHelper";


interface ProductClientProps {
  product: Product;
}

export default function ProductClient({ product }: ProductClientProps) {
  const { handleAddToCart } = useAddToCart();
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  const displayImage =
    selectedVariant?.images?.[0]?.url || product.imageUrl;

  const displayPrice = selectedVariant?.price ?? product.basePrice;

  const handleVariantSelect = (variant: Variant) => {
    setSelectedVariant(variant);
  };

  return (
    <div className="container mx-auto px-4 py-10 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white p-8 rounded-2xl shadow-lg">
        {/* Product Image */}
        <div className="flex items-center justify-center">
          <Image
            src={displayImage}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-2xl max-h-[500px] object-contain w-full"
            unoptimized
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-gray-800">
  {selectedVariant?.name || product.name}
</h1>
          <p className="text-gray-600 text-lg">{product.description}</p>

          <div className="text-2xl font-semibold text-red-500">
  ₹{selectedVariant?.price ?? selectedVariant?.price ?? product.basePrice}
</div>

          {/* Variant Selection */}
          {product.variants?.length ? (
            <div className="flex flex-wrap gap-3">
              {product.variants.map((variant:any) => (
                <div
                  key={variant.id}
                  onClick={() => handleVariantSelect(variant)}
                  className={`cursor-pointer border rounded-lg p-1 w-12 h-12 flex items-center justify-center transition ${
                    selectedVariant?.id === variant.id
                      ? "ring-2 ring-red-500"
                      : "hover:ring-2 hover:ring-gray-300"
                  }`}
                  title={variant.name}
                >
                  {variant.images?.[0]?.url ? (
                    <Image
                      src={variant.images[0].url}
                      alt={variant.name}
                      width={40}
                      height={40}
                      className="object-cover rounded"
                      unoptimized
                    />
                  ) : (
                    <span className="text-[8px]">{variant.name}</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No variants available</p>
          )}

          {/* Add to Cart */}
          <button
            className="bg-green-500 text-white px-6 py-3 rounded-full text-lg hover:bg-green-600 transition-all duration-300 w-fit"
            onClick={() => handleAddToCart({ product, selectedVariant, quantity: 1 })}

          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}


