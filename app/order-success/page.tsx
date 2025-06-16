'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface OrderItem {
  id: number;
  name: string;
  image: string;
  unit_price: string;
  quantity: number;
  category: string;
}

interface OrderData {
  id: string;
  items: OrderItem[];
  customer_info: {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    billing_address: string;
    delivery_address: string;
  };
  order_info: {
    sub_total: number;
    final_total: number;
    order_status: string;
    created_at_formatted: string;
    invoice_url: string;
  };
  payment_info: {
    is_payment_done: boolean;
    payment_type: string;
  };
}

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId || !token) return router.push('/');
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/order/detail/${orderId}`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setOrder(res.data.results?.[0]);
      } catch (err) {
        console.error(err);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, token, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium text-gray-600">
        Loading your order...
      </div>
    );
  }

  if (!order) return null;

  const { items, customer_info, order_info, payment_info } = order;

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl p-8 grid md:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <div className="space-y-8">
          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
  <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
    {items.map((item, i) => (
      <div key={i} className="flex justify-between border-b pb-2">
        <span>{item.name} x{item.quantity}</span>
        <span className="font-medium">₹{item.unit_price}</span>
      </div>
    ))}
  </div>

  <div className="flex justify-between pt-4 mt-4 border-t font-semibold text-base">
    <span>Total</span>
    <span>₹{order_info.final_total}</span>
  </div>
</div>

          </div>

          {/* Shipping Address */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipping Address</h2>
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 space-y-1">
              <p className="font-medium">{customer_info.first_name} {customer_info.last_name}</p>
              <p>{customer_info.phone_number}</p>
              <p>{customer_info.delivery_address}</p>
              <p>{customer_info.email}</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col justify-between">
          {/* Thank You Card */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center py-8 px-6 rounded-lg shadow-lg mb-8">
            <div className="text-5xl mb-2">✅</div>
            <h1 className="text-3xl font-bold">Thank You!</h1>
            <p className="text-lg mt-2">Your order has been placed successfully.</p>
          </div>

          {/* Payment Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Info</h2>
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 space-y-2">
              <p><span className="font-medium">Method:</span> {payment_info.payment_type}</p>
              <p><span className="font-medium">Status:</span> {payment_info.is_payment_done ? 'Paid' : 'Pending'}</p>
            </div>
          </div>

          {/* Invoice Download & CTA */}
          <div className="mt-10 space-y-10 text-center ">
            {order_info.invoice_url && (
              <Link
                href={`${process.env.NEXT_PUBLIC_API_URL}${order_info.invoice_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-md  px-4 py-3 rounded-full text-white bg-green-600 mx-2"
              >
              
                Download Invoice
              </Link>
            )}
            <Link
              href="/shop"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
