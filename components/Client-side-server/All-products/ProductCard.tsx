// 📁 ProductCard.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { addToCart } from '@/store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/store/slices/wishlistSlice';
import { RootState } from '@/store/store';
import { addToCartApi } from '@/app/Function';
import { Product } from '@/types/Products';

interface Props {
  product: Product;
  selectedVariant?: any | null;
  onVariantSelect?: React.Dispatch<React.SetStateAction<any | null>>;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useDispatch();
  const [selectedVariant, setSelectedVariant] = useState<any | null>(null);

  const displayImage = selectedVariant?.images?.[0]?.url || product.imageUrl;
  const displayPrice = selectedVariant?.price != null ? selectedVariant.price : product.basePrice;

  const wishlistItems = useSelector((state: RootState) => state.wishlist?.items || []);
  const token = useSelector((state: RootState) => state.auth.token);
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.success('Removed from wishlist');
    } else {
      dispatch(
        addToWishlist({
          id: product.id,
          title: product.name,
          price: displayPrice,
          image: displayImage,
          variantId: selectedVariant?.id ?? null,
        })
      );
      toast.success('Added to wishlist');
    }
  };

  const handleAddToCart = async () => {
    if (!token) {
      toast.error('You must be logged in to add items to the cart.');
      return;
    }

    try {
      const res = await addToCartApi(
        {
          productId: product.id,
          quantity: 1,
          variantId: selectedVariant?.id ?? null,
        },
        token
      );

      dispatch(
        addToCart({
          id: res?.id ?? Date.now(), // ✅ Ensure unique ID
          productId: product.id,
          name: product.name,
          basePrice: displayPrice,
          quantity: 1,
          product: undefined,
          image: displayImage,
          price: displayPrice,
          variantId: selectedVariant?.id ?? null,
        })
      );

      toast.success('Added to cart!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to add to cart');
      console.error('Add to cart error:', error);
    }
  };

  return (
    <div className="p-3 max-w-[350px] w-full items-center justify-center">
      <div className="border border-gray-200 rounded-2xl bg-white hover:shadow-xl transition-transform duration-300 ease-in-out transform hover:-translate-y-1 min-h-[360px] flex flex-col justify-items-center gap-2">
        <Link href={`/products/${product.slug}`} className="block group">
          <div className="relative w-full h-[230px] bg-[#fff7f5] rounded-t-2xl overflow-hidden flex items-center justify-center">
            <Image
              src={displayImage}
              width={200}
              height={200}
              alt={product.name}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              unoptimized
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                handleWishlistToggle();
              }}
              className="absolute top-3 right-3 z-20 bg-white p-2 rounded-full shadow hover:text-red-500 h-10 w-10 flex items-center justify-center"
            >
              <Heart
                size={20}
                strokeWidth={1.5}
                fill={isInWishlist ? 'red' : 'none'}
                color={isInWishlist ? 'red' : 'black'}
              />
            </button>
          </div>
        </Link>

        <div className="flex items-center justify-between px-4 py-1">
          <div className="flex flex-col">
            <h2 className="line-clamp-1 text-base font-semibold">{product.name}</h2>
            <p className="text-[#f83a3a] text-lg font-bold">₹{displayPrice}</p>
          </div>
          <div className="flex flex-col justify-end items-end gap-1">
            <div className="text-yellow-500 text-sm">★★★★☆</div>
            <ShoppingCart
              className="cursor-pointer hover:text-green-500"
              size={24}
              onClick={handleAddToCart}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 px-4 pb-1">
          {product.variants?.length ? (
            product.variants.map((variant: any) =>
              variant.images?.[0] ? (
                <div
                  key={variant.id}
                  className={`border border-gray-200 rounded-lg w-10 h-10 overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#f83a3a] transition-all ${
                    selectedVariant?.id === variant.id ? 'ring-2 ring-[#f83a3a]' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedVariant(variant);
                  }}
                >
                  <Image
                    src={variant.images[0].url || '/fallback.png'}
                    width={40}
                    height={40}
                    alt={variant.name}
                    className="object-cover h-full w-full"
                    unoptimized
                  />
                </div>
              ) : null
            )
          ) : (
            <span className="text-gray-400 text-sm">No variations</span>
          )}
        </div>
      </div>
    </div>
  );
}
