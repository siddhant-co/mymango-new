"use client";

import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/types/Products";
import { useDispatch , useSelector  } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { addToWishlist, removeFromWishlist } from "@/store/slices/wishlistSlice";
import { RootState } from "@/store/store";

interface Props {
  product: Product;
  selectedVariant?: any;
  onVariantSelect?: (variant: any) => void;
}

export default function ProductCard({ product, selectedVariant, onVariantSelect }: Props) {
  const dispatch = useDispatch();

  const selected = selectedVariant;
  const displayImage = selected?.images?.[0] || product.images?.[0];
  const displayPrice = selected?.selling_price ?? product.selling_price;
  const basePrice = product.base_price;


  const wishlistItems = useSelector((state: RootState) => state.wishlist?.items || []);
const isInWishlist = wishlistItems.some(item => item.id === product.id);

const handleWishlistToggle = () => {
  if (isInWishlist) {
    dispatch(removeFromWishlist(product.id));
    toast.success("Removed from wishlist");
  } else {
    dispatch(
      addToWishlist({
        id: product.id,
        title: product.name,
        price: displayPrice,
        image: displayImage,
      })
    );
    toast.success("Added to wishlist");
  }
};

  return (

    <div className="px-2">
   <Link href={`/products/${product.slug}`} className="block">
      <div className="border border-[#C5C5C5] hover:shadow-md transition min-h-full w-full mb-6">
        {/* Image Section */}
    
        <div className="p-1 flex items-center justify-center relative border-b border-[#C5C5C5] bg-[#fff7f5]">
          <Image
            src={`https://nxadmin.consociate.co.in${displayImage}`}
            width={300}
            height={300}
            alt={product.name}
            className="object-cover rounded mb-3"
            unoptimized
          />
          <div className="absolute top-1 right-1 z-20 bg-white p-1 rounded-full shadow hover:text-red-500 h-8 w-8 flex items-center justify-center">
          <button onClick={handleWishlistToggle}>
  <Heart
    size={16}
    strokeWidth={1.5}
    fill={isInWishlist ? "red" : "none"}
    color={isInWishlist ? "red" : "black"}
  />
</button>
          </div>
          <div
            className="w-max p-1 rounded-full text-[0.8rem] absolute top-1 left-3 px-2"
            style={{ backgroundColor: "#fb2c36" }}
          >
            {product.base_and_selling_price_difference_in_percent}% off
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between items-center text-center sm:text-left px-2 py-1">
          <div className="flex flex-col p-0 sm:p-2 md:p-2">
            <h2 className="line-clamp-1 text-sm font-semibold">{product.name}</h2>
            <p className="text-xs sm:text-sm text-[#f83a3a]">
              ₹{displayPrice}
              {basePrice !== displayPrice && (
                <span className="line-through text-xs ml-1 text-gray-500">₹{basePrice}</span>
              )}
            </p>

            <div className="flex gap-1 mt-1 ">
              {product.variant_list?.slice(0, 3).map((variant: any) => (
                <div
                  key={variant.id}
                  title={variant.specification?.colour}
                  onClick={() => onVariantSelect?.(variant)}
                  className={`w-8 h-8 border border-[#C5C5C5] cursor-pointer rounded-full overflow-hidden flex items-center justify-center hover:border-blue-400 ${
                    selected?.id === variant.id ? "ring-2 ring-orange-400" : ""
                  }`}
                >
                  {variant.images?.[0] && (
                    <Image
                      src={`https://nxadmin.consociate.co.in${variant.images[0]}`}
                      alt={variant.specification?.colour || "Variant"}
                      width={20}
                      height={20}
                      className="object-contain"
                      unoptimized
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Rating & Cart Section */}
          <div className="flex flex-col items-center gap-1 mt-2 sm:mt-0">
            <div className="text-yellow-500 text-sm sm:text-base whitespace-nowrap">
              ★★★★<span className="text-gray-300">★</span>
            </div>

            <ShoppingCart
              className="cursor-pointer"
              onClick={() => {
                const variant = selected || product;

                dispatch(
                  addToCart({
                    id: variant.id,
                    title: product.name,
                    price: variant.selling_price || product.selling_price,
                    quantity: 1,
                    image: displayImage,
                  })
                );

                toast.success("Added to cart!");
              }}
            />
          </div>
        </div>
      </div>
      </Link>
    </div>
  );
}
