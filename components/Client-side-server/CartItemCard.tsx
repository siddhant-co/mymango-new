// components/CartItemCard.tsx
'use client';

import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '@/store/slices/cartSlice';
import { CartItem } from '@/types/CartItem';
import { Trash2 } from 'lucide-react';

interface CartItemCardProps {
  item: CartItem;
  index: number;
}

export default function CartItemCard({ item, index }: CartItemCardProps) {
  const dispatch = useDispatch();
  const imageUrl = item.image
    ? `https://nxadmin.consociate.co.in${item.image.startsWith('/') ? item.image : `/${item.image}`}`
    : '/placeholder.png';

  return (
<div
  key={`${item.id}-${index}`}
  className="flex items-start gap-6 border border-gray-200 rounded-lg p-5 bg-white shadow-md mb-6 hover:shadow-lg transition-shadow duration-300"
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
        Sold by: CONSOCIATE
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
        className="text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 rounded transition-colors px-3 py-1 text-sm font-semibold cursor-pointer"
        aria-label={`Remove ${item.title} from cart`}
        title="Remove from cart"
      >
        <Trash2 />
      </button>
    </div>
  </div>
</div>

  );
}
