"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCategoryProducts } from "@/app/Function";
import { Product } from "@/types/Products";
import TagFilter from "@/components/Client-side-server/TagFilter";
import ProductCard from "@/components/Client-side-server/All-products/ProductCard"; // 

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("all");

  useEffect(() => {
    if (!slug) return;

    async function fetchData() {
      const data = await getCategoryProducts(slug);
      setProducts(data);
      setSelectedTag("all");
    }

    fetchData();
  }, [slug]);

  const allTags = Array.from(
    new Set(products.flatMap((product) => product.tags || []))
  );

  const filteredProducts =
    selectedTag === "all"
      ? products
      : products.filter((product) =>
          product.tags?.includes(selectedTag)
        );

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-10 mt-15 max-w-full ">
      <h1 className="text-3xl font-bold mb-8 capitalize text-center">{slug}</h1>

      
      <div className="flex gap-10">
      <TagFilter
        allTags={allTags}
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {filteredProducts.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No products found for selected tag.
          </p>
        )}
      </div>

      </div>
  
    </div>
  );
}
