import { useState } from 'react';
import { Address } from '@/types/address';
import { updateAddress } from '@/app/Function';

type Props = {
  address: Address;
  token: string;
  customerId: string;
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddressEditForm({
  address,
  token,
  customerId,
  onClose,
  onSuccess,
}: Props) {
  const [formData, setFormData] = useState({
    address: String(address.address ?? ''),
    locality: String(address.locality ?? ''),
    zipcode: String(address.zipcode ?? ''),
    country: String(address.country ?? ''),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      await updateAddress(Number(address.id), customerId, formData, token);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded bg-white shadow mt-4">
      <h3 className="text-lg font-semibold mb-4">Edit Address</h3>
      <input
        name="address"
        value={formData.address}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        placeholder="Address"
        type="text"
      />
      <input
        name="locality"
        value={formData.locality}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        placeholder="Locality"
        type="text"
      />
      <input
        name="zipcode"
        value={formData.zipcode}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        placeholder="Zip Code"
        type="text"
      />
      <input
        name="country"
        value={formData.country}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        placeholder="Country"
        type="text"
      />
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-black px-5 py-2 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
