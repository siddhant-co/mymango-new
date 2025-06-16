// 'use client';

// import { useState, useEffect } from 'react';
// import ProductCard from '../All-products/ProductCard';

// // Types
// interface ApiProduct {
//   id: number;
//   name: string;
//   description: string;
//   imageUrl: string;
//   basePrice: number;
//   slug: string;
// }

// export default function ProductList() {
//   const [products, setProducts] = useState<ApiProduct[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     async function fetchProducts() {
//       setLoading(true);
//       try {
//         const res = await fetch('https://ecom-testing.up.railway.app/product?limit=12');
//         const json = await res.json();
//         setProducts(json.data);
//       } catch (err) {
//         console.error('Failed to fetch products:', err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchProducts();
//   }, []);

//   return (
//     <div className="my-6">
//       {loading ? (
//         <p className="text-center">Loading products...</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 ">
//           {products.map((prod) => (
//             <ProductCard key={prod.id} product={prod as any} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import ProductCard from '../All-products/ProductCard';

// Types
interface Variant {
  id: number;
  name: string;
  basePrice: number;
  imageUrl?: string;
  images?: { url: string }[];
}

interface ApiProduct {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  basePrice: number;
  slug: string;
  variants?: Variant[];
}

function ProductCardWrapper({ product }: { product: ApiProduct }) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  return (
    <ProductCard
      product={product}
      selectedVariant={selectedVariant}
      onVariantSelect={(variant) => setSelectedVariant(variant)}
    />
  );
}

export default function ProductList() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
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
    <div className="my-6">
      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5">
          {products.map((prod) => (
            <ProductCardWrapper key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
}
