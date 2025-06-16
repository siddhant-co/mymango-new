'use client';

import React from 'react';

interface PaymentMethodSelectorProps {
  paymentMethod: 'razorpay' | 'cod' | null;
  onChange: (method: 'razorpay' | 'cod') => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ paymentMethod, onChange }) => {
  return (
    <div className="border rounded-sm shadow p-4 flex-grow">
      <h2 className="text-2xl font-bold mb-4 bg-[#fb4b02] text-white p-2 rounded">
        Payment Method
      </h2>

      <div className="space-y-4">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="paymentMethod"
            value="razorpay"
            checked={paymentMethod === 'razorpay'}
            onChange={() => onChange('razorpay')}
          />
          <span>Pay Online (Razorpay)</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={paymentMethod === 'cod'}
            onChange={() => onChange('cod')}
          />
          <span>Cash on Delivery</span>
        </label>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
