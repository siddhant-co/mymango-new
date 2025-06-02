// components/ProductListWithPagination.tsx

"use client";

import React, { useState } from "react";
import ProductCard from "@/components/Client-side-server/All-products/ProductCard";
import Pagination from "@/components/Client-side-server/Pagination";
import { Product } from "@/types/Products";

interface Props {
  products: Product[];
}

const PRODUCTS_PER_PAGE = 8;

const ProductListWithPagination: React.FC<Props> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div>
      {currentProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductListWithPagination;
