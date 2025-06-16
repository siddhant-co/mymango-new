'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Subcategory {
  id: number;
  name: string;
  slug: string;
}

interface Category {
  id: number;
  name: string;
  image?: string; // optional if not always present
  slug: string;
  subcategories?: Subcategory[];
}

interface CategoryProps {
  categories: Category[];
}

const Category: React.FC<CategoryProps> = ({ categories }) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  if (!baseURL) {
    return <p className="text-center py-8">Loading categories...</p>;
  }

  if (!categories || categories.length === 0) {
    return <p className="text-center py-8">No categories available</p>;
  }

  const renderCategory = (category: Category, flexValue: string) => (
    <div
      key={category.id}
      className={`cursor-pointer hover:shadow-md hover:z-10 transition-shadow duration-200 ease-in-out ${flexValue}`}
    >
      <div className="relative overflow-hidden h-60 sm:h-64 md:h-72 w-full bg-cover bg-no-repeat bg-left">
        <Image
          src={
            category.image
              ? `${baseURL}${category.image}`
              : "/placeholder.jpg" // fallback
          }
          alt={category.name}
          fill
          priority={category.id === categories[0].id}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          unoptimized
        />
        <div className="absolute top-0 left-0 p-4 bg-black/40 w-full">
          <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold uppercase tracking-wider">
            {category.name}
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {category.subcategories?.map((sub) => (
              <Link
                key={sub.id}
                href={`/categories/${category.slug}/${sub.slug}`}
                className="text-sm bg-white/80 text-black px-2 py-1 rounded hover:bg-orange-100 transition"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {categories
          .slice(0, 3)
          .map((cat, i) =>
            renderCategory(cat, i === 0 ? "lg:flex-[1.5]" : "lg:flex-[0.65]")
          )}
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        {categories
          .slice(3, 6)
          .map((cat, i) =>
            renderCategory(cat, i === 2 ? "lg:flex-[1.5]" : "lg:flex-[0.65]")
          )}
      </div>
    </div>
  );
};

export default Category;
