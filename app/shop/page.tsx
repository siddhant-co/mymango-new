// "use client";

// import React, { useEffect, useState } from "react";
// import SortDropdown from "@/components/Client-side-server/SortDropdown";
// import ProductListWithPagination from "@/components/Client-side-server/ProductListWithPagination";
// import { Product } from "@/types/Products";

// const ShopPage: React.FC = () => {
//   const [allProducts, setAllProducts] = useState<Product[]>([]);
//   const [sortOrder, setSortOrder] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);

//   // Fetch all products (no pagination, fetch all for client pagination)
//   const fetchAllProducts = async (sort: string) => {
//     setLoading(true);

//     try {
//       let url = `https://ecom-testing.up.railway.app/product`; // big enough to get all
//       if (sort) url += `&sort=${sort}`;

//       const res = await fetch(url);
//       if (!res.ok) throw new Error("Failed to fetch products");

//       const data = await res.json();

//       setAllProducts(data.products ?? []);
//     } catch (error) {
//       console.error("Failed to load products:", error);
//       setAllProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllProducts(sortOrder);
//   }, [sortOrder]);

//   const handleSortChange = (value: string) => {
//     setSortOrder(value);
//   };

//   return (
//     <div className="mt-25 px-4 md:px-8">
//       <div className="mb-4 max-w-xs">
//         <SortDropdown value={sortOrder} onChange={handleSortChange} />
//       </div>

//       {loading ? (
//         <p>Loading products...</p>
//       ) : (
//         <ProductListWithPagination products={allProducts} />
//       )}
//     </div>
//   );
// };

// export default ShopPage;




import React from 'react'

import ProductList from '@/components/Client-side-server/All-new-products/ProductList';


export default function page() {
  return (
    <div className='mt-25'>
    <ProductList></ProductList>
    </div>
  )
}

