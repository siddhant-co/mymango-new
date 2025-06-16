"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, Heart } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import UserAvatar from "../UserAvatar";

interface Props {
  mobile?: boolean;
}

const NavbarActions: React.FC<Props> = ({ mobile = false }) => {
  const wishlistCount = useSelector(
    (state: RootState) => state.wishlist?.items?.length || 0
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`flex items-center ${mobile ? "gap-3" : "gap-6"}`}>
      <UserAvatar />

      <Link href="/wishlist" className="relative cursor-pointer">
        <Heart
          className={`${mobile ? "text-black w-5 h-5" : "transition-colors text-amber-500 hover:text-orange-600"}`}
        />
        {wishlistCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
            {wishlistCount}
          </span>
        )}
      </Link>

      <Link href="/cart" className="relative cursor-pointer">
        <ShoppingBag
          className={`${mobile ? "text-black w-5 h-5" : "transition-colors text-amber-500 hover:text-orange-600"}`}
        />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Link>
    </div>
  );
};

export default NavbarActions;
