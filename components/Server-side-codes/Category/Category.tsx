import React from "react";
import Image from "next/image";

interface Category {
  id: number;
  title: string;
  image: string;
}

interface CategoryProps {
  categories: Category[];
}

const Category: React.FC<CategoryProps> = ({ categories }) => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseURL) {
    // Prevent rendering if baseURL not set to avoid mismatch
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
          src={`${baseURL}${category.image}`}
          alt={category.title}
          fill
          priority={category.id === categories[0].id}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          unoptimized
        />
        <div className="absolute top-0 left-0 p-4 bg-black/30 w-full">
          <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold uppercase tracking-wider">
            {category.title}
          </h3>
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
