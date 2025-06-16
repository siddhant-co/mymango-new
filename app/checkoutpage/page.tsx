// app/checkout/page.tsx (still server component)
import CheckoutClient from './CheckoutClient';

export default function CheckoutPage() {
  return (
    <div className="mt-20 px-5">
      <CheckoutClient />
    </div>
  );
}
