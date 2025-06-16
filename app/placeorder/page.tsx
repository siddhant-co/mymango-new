// 'use client';

// import { useSelector, useDispatch } from 'react-redux';
// import { useState } from 'react';
// import { RootState } from '@/store/store';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';

// export default function PlaceOrder() {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const cartItems = useSelector((state: RootState) => state.cart.items);
//   const addressId = useSelector((state: RootState) => state.address.selectedAddressId);
//   const token = useSelector((state: RootState) => state.auth.token);

//   const [loading, setLoading] = useState(false);

//   const totalAmount = cartItems.reduce((acc, item) => acc + item.basePrice * item.quantity, 0);

//   const handlePlaceOrder = async () => {
//     if (!token) return toast.error('Please log in to place order.');
//     if (!addressId) return toast.error('Select a delivery address.');
  
//     const items = cartItems.map(item => ({
//       productId: item.id,
//       variantId: item.variantId,
//       quantity: item.quantity,
//       price: item.basePrice,
//     }));
  
//     const orderPayload = {
//       items,
//       addressId,
//       totalAmount: Number(totalAmount.toFixed(2)),
//       paymentMethod: 'RAZORPAY',
//     };
  
//     try {
//       setLoading(true);
//       const response = await fetch('https://ecom-testing.up.railway.app/order', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(orderPayload),
//       });
  
//       const result = await response.json();
  
//       if (!response.ok) throw new Error(result.message || 'Order failed.');
  
//       // ✅ Store order ID in localStorage
//       localStorage.setItem('recentOrderId', result.id.toString());
  
//       toast.success('Order placed successfully!');
//       router.push('/order-success');
//     } catch (error: any) {
//       toast.error(error.message || 'Order failed.');
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center px-4">
//       <h1 className="text-2xl font-bold mb-6">Review & Place Your Order</h1>
//       <button
//         onClick={handlePlaceOrder}
//         disabled={loading}
//         className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
//       >
//         {loading ? 'Placing Order...' : 'Place Order'}
//       </button>
//     </div>
//   );
// }
