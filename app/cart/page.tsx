"use client";

import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { CartItem } from "@/types/CartItem";
import { removeFromCart } from "@/store/slices/cartSlice";
import { useState } from "react";
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems: CartItem[] = useSelector(
    (state: RootState) => state.cart.items || []
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const totalPages = Math.ceil(cartItems.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedItems = cartItems.slice(startIdx, startIdx + itemsPerPage);

  const getTotalAmount = (): number =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const totalAmount = getTotalAmount();
  const discount = totalAmount * 0.2; // 20% discount
  const finalAmount = totalAmount - discount;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <main className="max-w-6xl mx-auto mt-32 p-4 flex flex-col lg:flex-row gap-6">
      {/* Left: Cart Items */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">
          My Bag ({cartItems.length})
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {paginatedItems.map((item, index) => {
                const imageUrl = item.image
                  ? `https://nxadmin.consociate.co.in${item.image.startsWith("/") ? item.image : `/${item.image}`}`
                  : "/placeholder.png";

                return (
                  <div
                  key={`${item.id}-${index}`}
                  className="flex items-center gap-6 border border-gray-200 rounded-lg p-5 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
                    <Image
                      src={imageUrl}
                      alt={item.title}
                      width={96}
                      height={96}
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                
                  <div className="flex-1 flex flex-col justify-between h-full">
                    <div>
                      <p className="font-semibold text-xl text-gray-900 hover:text-indigo-600 cursor-pointer transition-colors duration-200">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-400 mt-1 tracking-wide uppercase font-medium">
                        
                      </p>
                
                      <div className="mt-3 flex items-center gap-4 text-gray-600 text-sm">
                        <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md font-medium">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-gray-400">|</span>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md font-medium">
                          Price: ₹{item.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-lg font-bold text-gray-900">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 rounded transition-colors"
                        aria-label={`Remove ${item.title} from cart`}
                        title="Remove from cart"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
                
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === i + 1 ? "bg-pink-600 text-white" : ""
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Right: Summary */}
      {cartItems.length > 0 && (
        <div className="w-full lg:w-80 h-fit bg-white border rounded-md p-4 shadow-sm sticky top-32">
          <h2 className="text-lg font-bold mb-4">PRICE DETAILS</h2>
          <div className="flex justify-between mb-2 text-sm text-gray-700">
            <span>Total MRP</span>
            <span>₹{totalAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm text-green-600">
            <span>Discount (20%)</span>
            <span>
              - ₹{discount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between border-t pt-2 mt-2 text-base font-semibold">
            <span>Total Amount</span>
            <span>
              ₹{finalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          </div>


          <Link
            href="/checkout"
  className="block w-full bg-pink-600 hover:bg-pink-700 text-white text-center font-medium py-2 rounded mt-4 transition"
>
  PLACE ORDER
</Link>
   
        </div>
      )}
    </main>
  );
}
