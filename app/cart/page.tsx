
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  setCartItems,
  removeFromCartState,
  clearCartState,
} from '@/store/slices/cartSlice';
import {
  clearCart,
  deleteCartItem,
  fetchCartItems,
} from '../Function';
import Image from 'next/image';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

const fallbackImage = '/placeholder.png';
const ITEMS_PER_PAGE = 5;

export default function CartPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const token = useSelector((state: RootState) => state.auth.token);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const discountThreshold = 500;
  const discountRate = 0.1; // 10% discount

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => acc + item.basePrice * item.quantity,
      0
    );
  }, [cartItems]);

  const discount = subtotal >= discountThreshold ? subtotal * discountRate : 0;
  const total = subtotal - discount;

  const remainingAmount = discountThreshold - subtotal;
  const progress = Math.min((subtotal / discountThreshold) * 100, 100);

  const totalPages = Math.ceil(cartItems.length / ITEMS_PER_PAGE);
  const paginatedItems = cartItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    const loadCart = async () => {
      if (!token) return;

      try {
        const data = await fetchCartItems(token);
        if (Array.isArray(data.items) && data.items.length > 0) {
          const normalizedItems = data.items.map((item: any) => ({
            id: item.id,
            productId: item.product?.id,
            variantId: item.variantId ?? null,
            name: item.product?.name || 'Unnamed Product',
            basePrice: item.product?.productVariants?.[0]?.basePrice || 0,
            quantity: item.quantity,
            image: item.product?.productVariants?.[0]?.image || fallbackImage,
            product: item.product,
            price: item.product?.productVariants?.[0]?.basePrice || 0,
          }));
          dispatch(setCartItems(normalizedItems));
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (cartItems.length === 0) {
      loadCart();
    } else {
      setIsLoading(false);
    }
  }, [dispatch, token, cartItems.length]);

  useEffect(() => {
    setCurrentPage(1);
  }, [cartItems.length]);

  const handleRemove = async (itemId: number) => {
    try {
      console.log('Removing cart item with ID:', itemId);
      await deleteCartItem(itemId, token ?? '');
      dispatch(removeFromCartState(itemId));
      toast.success('Item removed from cart');
    } catch (error: any) {
      console.error('Error removing item:', error.message || error);
      toast.error('Failed to remove item');
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart(token ?? '');
      dispatch(clearCartState());
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    router.push('/checkout');
  };

  return (
    <div className="mt-20 p-4">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 tracking-tight group">
        🛒 Your{' '}
        <span className="text-green-600 group-hover:underline duration-200">
          Cart
        </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {isLoading ? (
            <div className="text-center text-gray-500">Loading your cart...</div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-16 text-gray-600">
              <div className="text-6xl mb-4">🛍️</div>
              <h2 className="text-2xl font-semibold mb-2">
                Your cart is feeling a little light
              </h2>
              <p className="mb-4">Looks like you haven’t added anything yet.</p>
              <a
                href="/shop"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
              >
                Start Shopping
              </a>
            </div>
          ) : (
            <>
              {paginatedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image || fallbackImage}
                      alt={item.name || 'Product Image'}
                      width={100}
                      height={100}
                      unoptimized
                      className="rounded-lg w-[100px] h-[100px] flex-shrink-0"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = fallbackImage;
                      }}
                    />
                    <div>
                      <h2 className="text-xl font-semibold">{item.name}</h2>
                      <p className="text-gray-600">Price: ₹{item.basePrice}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="text-red-500 hover:text-red-600 cursor-pointer"
                    onClick={() => handleRemove(item.id)}
                    aria-label="Remove item"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              ))}

              <div className="flex justify-center gap-4 mt-4">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="flex items-center text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>

        <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-xl h-fit sticky top-30">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            🧾 Order Summary
          </h2>

          {subtotal >= discountThreshold ? (
            <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center font-semibold">
              🎉 Congratulations! You have unlocked a 10% discount! 🎉
            </div>
          ) : (
            <div className="bg-yellow-100 text-yellow-700 p-3 rounded-lg mb-4 text-center font-medium">
              You are ₹{(remainingAmount || 0).toFixed(2)} away from getting a 10% discount!
            </div>
          )}

          <div className="w-full bg-gray-200 h-2 rounded mb-6">
            <div
              className="bg-green-500 h-2 rounded transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="text-slate-700 mb-2 font-medium">
            Total Items: <span className="font-semibold">{cartItems.length}</span>
          </div>
          <div className="text-slate-700 mb-2 font-medium">
            Subtotal: <span className="text-slate-900 font-bold">₹{(subtotal || 0).toFixed(2)}</span>
          </div>
          <div className="text-slate-700 mb-2 font-medium">
            Discount: <span className="text-green-600 font-bold">₹{(discount || 0).toFixed(2)}</span>
          </div>
          <div className="text-slate-700 mb-6 font-medium">
            Total Price: <span className="text-green-600 font-bold">₹{(total || 0).toFixed(2)}</span>
          </div>

          <button
            type="button"
            onClick={handlePlaceOrder}
            className="w-full py-3 px-6 rounded-xl text-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
          >
            🛒 Proceed To Checkout
          </button>

          <button
            type="button"
            onClick={handleClearCart}
            className="w-full mt-4 py-3 px-6 rounded-xl text-lg font-semibold text-white bg-red-500 hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
          >
            🗑️ Clear Cart
          </button>

          <Link href="/shop">
            <button
              type="button"
              className="w-full mt-4 py-3 px-6 rounded-xl text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              🛍️ Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
