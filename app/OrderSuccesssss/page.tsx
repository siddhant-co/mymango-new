'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toast } from 'react-hot-toast';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OrderSuccess() {
  const token = useSelector((state: RootState) => state.auth.token);
  const customerId = useSelector((state: RootState) => state.auth.customer?.id);
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchLatestOrder() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/get-customer-orders/?page=1&page_size=1&customer_id=${customerId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Failed to fetch order.');

        if (data.results && data.results.length > 0) {
          setOrder(data.results[0]);
        } else {
          toast.error('No recent orders found.');
        }
      } catch (err: any) {
        console.error(err);
        toast.error(err.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    }

    if (token && customerId) fetchLatestOrder();
  }, [token, customerId]);

  if (loading) return <p className="text-center p-4">Loading your order...</p>;
  if (!order) return <p className="text-center text-red-500">No order found.</p>;

  const firstName =
    order.customer_info?.first_name?.charAt(0).toUpperCase() +
    order.customer_info?.first_name?.slice(1).toLowerCase();

  return (
    <div className="container mx-auto px-4 py-12 mt-15">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Order & Address Section */}
        <div className="lg:w-1/2 w-full space-y-4">
          {/* Order Details */}
          <div className=" rounded-xl shadow p-2 border bg-gray-200">
            <h2 className="text-xl font-semibold mb-4">🧾 Order Details</h2>
            <ul className="divide-y divide-gray-200 mb-4">
              {order.items?.map((item: any, index: number) => (
                <li key={index} className="py-2 flex justify-between text-gray-700">
                  <span>{item.name ?? 'Unnamed Product'} × {item.quantity}</span>
                  <span>₹{item.unit_price ?? '0.00'}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-gray-800 font-medium">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.order_info.sub_total}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>20%</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{order.order_info.delivery_charge}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{order.order_info.final_total}</span>
              </div>
            </div>
          </div>

          {/* Address Details */}
          <div className=" rounded-xl shadow bg-gray-200 p-2 border">
            <h2 className="text-xl font-semibold mb-4">🏠 Address Details</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold">Billing Address:</h3>
                <p>{order.customer_info?.billing_address ?? 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-semibold">Shipping Address:</h3>
                <p>{order.customer_info?.delivery_address ?? 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Success Confirmation */}
        <div className="lg:w-1/2 w-full flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl text-center">
            <CheckCircle className="text-green-600 mx-auto mb-4" size={50} />
            <h1 className="text-3xl font-bold text-green-600 mb-2">
              🎉 Thank You, {firstName}!
            </h1>
            <p className="text-gray-600 mb-6 text-lg">
              Your order has been placed successfully.
            </p>

            <div className="bg-gray-100 rounded-xl p-6 text-left space-y-4 mb-6">
              <div>
                <span className="font-semibold">Order ID:</span>{' '}
                <span className="text-gray-800">{order.id}</span>
              </div>
              <div>
                <span className="font-semibold">Total:</span>{' '}
                ₹{order.order_info.final_total}
              </div>
              <div>
                <span className="font-semibold">Payment Type:</span>{' '}
                {order.payment_info?.payment_type ?? 'N/A'}
              </div>
              <div>
                <span className="font-semibold">Shipping Address:</span>{' '}
                {order.customer_info?.delivery_address ?? 'N/A'}
              </div>
            </div>

            <button
              className="mt-4 bg-[#fb4b02] hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full transition duration-200"
              onClick={() => router.push('/')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
