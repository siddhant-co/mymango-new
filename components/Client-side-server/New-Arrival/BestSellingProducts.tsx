
'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../All-products/ProductCard';
import "keen-slider/keen-slider.min.css";


interface Variant {
  id: number;
  name: string;
  basePrice: number;
  imageUrl?: string;
  images?: { url: string }[];
}

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  basePrice: number;
  slug: string;
  variants?: Variant[];
}

function ProductCardWrapper({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  return (
    <ProductCard
      product={product}
      selectedVariant={selectedVariant}
      onVariantSelect={setSelectedVariant}
    />
  );
}

export default function BestSellingProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch('https://ecom-testing.up.railway.app/product?limit=12');
        const json = await res.json();
        setProducts(json.data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <section className="my-8">
     <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 tracking-wide">
  Best Selling Products
</h2>

      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 bg-orange-400 border-l-gray-50">
          {products.slice(0,5).map((product) => (
            <ProductCardWrapper key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
