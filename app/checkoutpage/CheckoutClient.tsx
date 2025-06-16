// 'use client';

// import { useEffect, useState } from 'react';
// import { useSelector, useStore } from 'react-redux';
// import { RootState } from '@/store/store';
// import CartItemCard from '@/components/Client-side-server/CartItemCard';
// import AddressList from '@/components/Client-side-server/AddressList';
// import { CartItem } from '@/types/CartItem';
// import toast from 'react-hot-toast';
// import { useRouter } from 'next/navigation';
// import { showAddress } from '../Function';
// import { Address } from '@/types/address';
// import PaymentMethodSelector from '@/components/Client-side-server/PaymentMethodSelector';

// export default function CheckoutClient() {
//   const [email, setEmail] = useState('');
//   const [selectedAddressId, setSelectedAddressId] = useState<string | undefined>(undefined);
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod' | null>(null);

//   const deliveryAddress = addresses.find(addr => addr.type === 'Delivery address');
//   const billingAddress = addresses.find(addr => addr.type === 'Billing address');

//   const store = useStore();
//   const cartItems: CartItem[] = useSelector((state: RootState) => state.cart.items || []);
//   const token = useSelector((state: RootState) => state.auth.token);
//   const customerId = useSelector((state: RootState) => state.auth.customer?.id);

//   const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   const discount = totalAmount * 0.2;
//   const finalAmount = totalAmount - discount;

//   const canPlaceOrder =
//     !!token && selectedAddressId !== null && cartItems.length > 0 && email.trim() !== '' && paymentMethod;

//   const router = useRouter();

//   const fetchAddresses = async () => {
//     try {
//       const data = await showAddress(Number(customerId), String(token));
//       if (data && Array.isArray(data.addresses)) {
//         setAddresses(data.addresses);
//       } else {
//         setAddresses([]);
//         console.error('Unexpected addresses data format:', data);
//       }
//     } catch (err) {
//       console.error('Error fetching addresses:', err);
//     }
//   };

//   useEffect(() => {
//     fetchAddresses();
//   }, [customerId, token]);

//   const handlePlaceOrder = async ({
//     isPaymentDone,
//     paymentType,
//     transactionId,
//   }: {
//     isPaymentDone: boolean;
//     paymentType: string;
//     transactionId: string;
//   }) => {
//     setIsSubmitting(true);
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/order/place-order/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Token ${token}`,
//         },
//         body: JSON.stringify({
//           sub_total: totalAmount,
//           tax: 0,
//           discount,
//           delivery_charge: 0,
//           final_total: finalAmount,
//           is_payment_done: isPaymentDone,
//           payment_transaction_id: transactionId,
//           payment_type: paymentType,
//           payment_datetime: new Date().toISOString(),
//           billing_address: `${billingAddress?.city} ${billingAddress?.country}`,
//           delivery_address: deliveryAddress?.city,
//           products: cartItems.map((item) => ({
//             product_id: Number(item.id),
//             unit_price: Number(item.price),
//             quantity: Number(item.quantity),
//           })),
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         router.push(`/OrderSuccess`);
//       } else {
//         console.error('Order API response:', response.status, data);
//         toast.error(`Failed to place order: ${data?.message || `HTTP ${response.status}`}`);
//       }
//     } catch (error) {
//       console.error('Order placement error:', error);
//       toast.error('An error occurred while placing your order.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleRazorpayPayment = async (amount: number) => {
//     try {
//       const res = await fetch('/api/razorpay', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ amount }),
//       });

//       const order = await res.json();
//       if (!res.ok) throw new Error(order.error || 'Failed to create Razorpay order');

//       await new Promise((resolve, reject) => {
//         const script = document.createElement('script');
//         script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//         script.onload = resolve;
//         script.onerror = reject;
//         document.body.appendChild(script);
//       });

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
//         amount: order.amount,
//         currency: order.currency,
//         name: 'Your Store Name',
//         description: 'Order Payment',
//         order_id: order.id,
//         handler: function (response: any) {
//           console.log('Payment success:', response);
//           handlePlaceOrder({
//             isPaymentDone: true,
//             paymentType: 'Razorpay',
//             transactionId: response.razorpay_payment_id,
//           });
//         },
//         prefill: { email },
//         theme: { color: '#fb4b02' },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error('Razorpay error:', error);
//       toast.error('Payment failed.');
//     }
//   };

//   const handleOrderClick = () => {
//     if (paymentMethod === 'cod') {
//       handlePlaceOrder({
//         isPaymentDone: true,
//         paymentType: 'Cash on Delivery',
//         transactionId: 'COD-PLACEHOLDER',
//       });
//     } else if (paymentMethod === 'razorpay') {
//       handleRazorpayPayment(finalAmount * 100); // Razorpay expects amount in paise
//     }
//   };

//   return (
//     <>
//       <h1 className="mb-10 text-2xl font-bold">You're almost there...!</h1>

//       <div className="flex gap-3">
//         <div className="w-1/2 flex flex-col gap-4">
//           <div className="border rounded-sm mb-4 shadow p-4">
//             <h2 className="text-2xl font-bold mb-4 bg-[#fb4b02] text-white p-2 rounded">Contact</h2>
//             <label htmlFor="email" className="block mb-1 font-medium text-[#fb4b02]">
//               Enter Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="w-full p-2 border rounded"
//               placeholder="you@example.com"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div className="border rounded-sm shadow p-4 flex-grow">
//             <h2 className="text-2xl font-bold mb-4 bg-[#fb4b02] text-white p-2 rounded">
//               Delivery & Billing Details
//             </h2>
//             {token && customerId ? (
//               <AddressList
//                 customerId={customerId.toString()}
//                 token={token}
//                 onSelectAddress={setSelectedAddressId}
//                 selectedAddressId={selectedAddressId}
//                 addresses={addresses}
//               />
//             ) : (
//               <p className="text-red-500">Please log in to see your addresses.</p>
//             )}
//           </div>

//           <PaymentMethodSelector paymentMethod={paymentMethod} onChange={setPaymentMethod} />
//         </div>

//         <div className="w-1/2 flex flex-col">
//           <div className="border rounded-sm shadow p-4 max-h-[300px] overflow-y-auto mb-4 flex-grow">
//             <h2 className="text-2xl font-bold mb-4 bg-[#fb4b02] text-white p-2 rounded">Your Cart</h2>
//             {cartItems.length === 0 ? (
//               <p className="text-gray-600">Your cart is empty.</p>
//             ) : (
//               cartItems.map((item, index) => (
//                 <CartItemCard key={`${item.id}-${index}`} item={item} index={index} />
//               ))
//             )}
//           </div>

//           <div className="border rounded-sm shadow mb-4 p-4">
//             <h2 className="text-2xl font-bold mb-4 bg-[#fb4b02] text-white p-2 rounded">Order Summary</h2>
//             <div className="flex justify-between p-2 border-b border-gray-600">
//               <span>Subtotal</span>
//               <span>₹{totalAmount.toLocaleString()}</span>
//             </div>
//             <div className="flex justify-between mb-2 text-sm text-green-600 p-2 border-b border-gray-600 shadow">
//               <span>Discount (20%)</span>
//               <span>- ₹{discount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
//             </div>
//             <div className="flex justify-between p-2 font-bold">
//               <span>Total</span>
//               <span>₹{finalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
//             </div>
//           </div>

//           <button
//             className={`text-2xl font-bold mb-4 border p-2 rounded w-full transition-colors duration-200
//               ${
//                 canPlaceOrder
//                   ? 'bg-[#fb4b02] text-white hover:bg-white hover:text-orange-500 hover:border-orange-500 cursor-pointer'
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }
//             `}
//             disabled={!canPlaceOrder || isSubmitting}
//             onClick={handleOrderClick}
//           >
//             {isSubmitting ? 'Placing Order...' : 'Place Order'}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
