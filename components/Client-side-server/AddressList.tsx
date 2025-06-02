'use client';
import { useEffect, useState } from 'react';
import { Address } from '@/types/address';
import { showAddress } from '@/app/Function';
import AddressEditForm from '@/components/Server-side-codes/AddressEditForm'; 
import { SquarePen } from 'lucide-react';

type Props = {
  customerId: string;
  token: string;
  onSelectAddress: (selectedId: string) => void;
  selectedAddressId?: string;  // add this prop to track selection
  addresses:Address[]
};

export default function AddressList({ customerId, token, onSelectAddress, selectedAddressId, addresses }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);



  if (loading) return <p>Loading addresses...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const deliveryAddress = addresses.find(addr => addr.type === 'Delivery address');
  // console.log("addresses", deliveryAddress)
  const billingAddress = addresses.find(addr => addr.type === 'Billing address');

  // helper to detect if an address is selected
  const isSelected = (id: string) => selectedAddressId === id;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {deliveryAddress && (
        <div
          className={`bg-white border shadow rounded-xl p-4 cursor-pointer ${
            isSelected(deliveryAddress.id) ? 'border-orange-600 ring-2 ring-orange-400' : ''
          }`}
          onClick={() => onSelectAddress(deliveryAddress.id)}
        >
          <h3 className="text-lg font-semibold text-orange-600 mb-2 flex justify-between items-center">
            Delivery Address
            <button
              className="text-blue-600 underline text-sm cursor-pointer"
              onClick={e => {
                e.stopPropagation(); // Prevent selecting address when editing
                setEditingAddress(deliveryAddress);
              }}
              aria-label="Edit delivery address"
            >
              <SquarePen />
            </button>
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {deliveryAddress.address},<br />
            {deliveryAddress.locality}, {deliveryAddress.zipcode},<br />
            {deliveryAddress.country}
          </p>
          {editingAddress?.id === deliveryAddress.id && (
            <AddressEditForm
              address={deliveryAddress}
              token={token}
              customerId={customerId}
              onClose={() => setEditingAddress(null)}
              onSuccess={() => {
                setEditingAddress(null);
              }}
            />
          )}
        </div>
      )}

      {billingAddress && (
        <div
          className={`bg-white border shadow rounded-xl p-4 cursor-pointer ${
            isSelected(billingAddress.id) ? 'border-green-600 ring-2 ring-green-400' : ''
          }`}
          onClick={() => onSelectAddress(billingAddress.id)}
        >
          <h3 className="text-lg font-semibold text-green-600 mb-2 flex justify-between items-center">
            Billing Address
            <button
              className="text-blue-600 underline text-sm cursor-pointer"
              onClick={e => {
                e.stopPropagation(); // Prevent selecting address when editing
                setEditingAddress(billingAddress);
              }}
              aria-label="Edit billing address"
            >
              <SquarePen />
            </button>
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {billingAddress.address},<br />
            {billingAddress.locality}, {billingAddress.zipcode},<br />
            {billingAddress.country}
          </p>
          {editingAddress?.id === billingAddress.id && (
            <AddressEditForm
              address={billingAddress}
              token={token}
              customerId={customerId}
              onClose={() => setEditingAddress(null)}
              onSuccess={() => {
                setEditingAddress(null);
              }}
            />
          )}
        </div>
      )}

      {!deliveryAddress && !billingAddress && (
        <p className="col-span-2 text-center text-gray-500">No addresses found.</p>
      )}
    </div>
  );
}
