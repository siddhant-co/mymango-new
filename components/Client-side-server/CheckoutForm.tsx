'use client';

import { useState } from 'react';

export default function CheckoutForm() {
  const [delivery, setDelivery] = useState({
    name: '',
    street: '',
    city: '',
    country: 'India',
    state: 'Maharashtra',
    zip: '',
    phone: '',
  });

  const [billing, setBilling] = useState({ ...delivery });
  const [sameAsDelivery, setSameAsDelivery] = useState(true);
  const [addresses, setAddresses] = useState<any[]>([]);
const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

const saveAddress = () => {
  if (
    !delivery.name.trim() ||
    !delivery.street.trim() ||
    !delivery.city.trim() ||
    !delivery.zip.trim() ||
    !delivery.phone.trim()
  ) {
    alert('Please fill all delivery fields.');
    return;
  }

  if (selectedIndex !== null) {
    // Edit existing
    const updated = [...addresses];
    updated[selectedIndex] = delivery;
    setAddresses(updated);
    setSelectedIndex(null);
  } else {
    // Add new
    setAddresses([...addresses, delivery]);
  }

  // Reset form
  setDelivery({
    name: '',
    street: '',
    city: '',
    country: 'India',
    state: 'Maharashtra',
    zip: '',
    phone: '',
  });
  setSameAsDelivery(true);
};

const editAddress = (index: number) => {
  setSelectedIndex(index);
  setDelivery(addresses[index]);
  setSameAsDelivery(true);
};

  

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updated = { ...delivery, [name]: value };
    setDelivery(updated);
    if (sameAsDelivery) setBilling(updated);
  };

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBilling({ ...billing, [name]: value });
  };

  const handleCheckboxChange = () => {
    const newValue = !sameAsDelivery;
    setSameAsDelivery(newValue);
    if (newValue) setBilling(delivery);
  };

  return (
    <div className="border rounded w-full shadow p-4 space-y-6 overflow-y-auto max-h-[500px]">
      <h2 className="text-2xl font-bold mb-2 text-[#fb4b02]">Delivery Address</h2>
      <input name="name" value={delivery.name} onChange={handleDeliveryChange} placeholder="Full Name" className="w-full p-2 border rounded" />
      <input name="street" value={delivery.street} onChange={handleDeliveryChange} placeholder="Street" className="w-full p-2 border rounded" />
      <input name="city" value={delivery.city} onChange={handleDeliveryChange} placeholder="City" className="w-full p-2 border rounded" />
      <select name="country" value={delivery.country} onChange={handleDeliveryChange} className="w-full p-2 border rounded">
        <option value="India">India</option>
      </select>
      <select name="state" value={delivery.state} onChange={handleDeliveryChange} className="w-full p-2 border rounded">
        <option value="Maharashtra">Maharashtra</option>
      </select>
      <input name="zip" value={delivery.zip} onChange={handleDeliveryChange} placeholder="Zipcode" className="w-full p-2 border rounded" />
      <input name="phone" value={delivery.phone} onChange={handleDeliveryChange} placeholder="+91 Phone Number" className="w-full p-2 border rounded" />

      <div className="flex items-center gap-2 mt-4">
        <input type="checkbox" checked={sameAsDelivery} onChange={handleCheckboxChange} id="sameAddress" className="w-4 h-4" />
        <label htmlFor="sameAddress" className="text-sm">Billing address same as delivery</label>

        {/* Save or Update button */}
<button
  onClick={saveAddress}
  className="mt-4 bg-[#fb4b02] text-white py-2 px-4 rounded hover:bg-[#d94301]"
>
  {selectedIndex !== null ? 'Update Address' : 'Save Address'}
</button>

{/* List of saved addresses */}
{addresses.length > 0 && (
  <div className="mt-6">
    <ul>
      {addresses.map((addr, i) => (
        <li
          key={i}
          className="border p-3 mb-2 rounded cursor-pointer hover:bg-gray-100"
          onClick={() => editAddress(i)}
        >
          <strong>{addr.name}</strong>, {addr.street}, {addr.city}, {addr.state}, {addr.zip}, {addr.phone}
        </li>
      ))}
    </ul>
  </div>
)}

      </div>

      {!sameAsDelivery && (
        <>
          <h2 className="text-2xl font-bold mt-6 text-[#fb4b02]">Billing Address</h2>
          <input name="name" value={billing.name} onChange={handleBillingChange} placeholder="Full Name" className="w-full p-2 border rounded" />
          <input name="street" value={billing.street} onChange={handleBillingChange} placeholder="Street" className="w-full p-2 border rounded" />
          <input name="city" value={billing.city} onChange={handleBillingChange} placeholder="City" className="w-full p-2 border rounded" />
          <select name="country" value={billing.country} onChange={handleBillingChange} className="w-full p-2 border rounded">
            <option value="India">India</option>
          </select>
          <select name="state" value={billing.state} onChange={handleBillingChange} className="w-full p-2 border rounded">
            <option value="Maharashtra">Maharashtra</option>
          </select>
          <input name="zip" value={billing.zip} onChange={handleBillingChange} placeholder="Zipcode" className="w-full p-2 border rounded" />
        </>
      )}
    </div>
  );
}
