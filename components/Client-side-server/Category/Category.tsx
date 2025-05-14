"use client";

import Image from "next/image";

type CategoryProps = {
  categories: {
    id: number;
    title: string;
    image: string;
  }[];
};

export default function Category({ categories }: CategoryProps) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* First Row */}
      <div className="flex flex-col lg:flex-row gap-4">
        {categories.slice(0, 3).map((category, index) => (
          <div
            key={category.id}
            className={`
              relative overflow-hidden h-60 sm:h-64 md:h-72 border group
              ${index === 0 ? "lg:flex-[1.5]" : "lg:flex-[0.65]"}
              w-full
            `}
          >
            <Image
              src={`${BASE_URL}${category.image}`}
              alt={category.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-0 left-0 p-4 bg-opacity-30 flex items-start justify-start w-full">
              <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold uppercase tracking-wider">
                {category.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Second Row */}
      <div className="flex flex-col lg:flex-row gap-4">
        {categories.slice(3, 6).map((category, index) => (
          <div
            key={category.id}
            className={`
              relative overflow-hidden h-60 sm:h-64 md:h-72 border group
              ${index === 2 ? "lg:flex-[1.5]" : "lg:flex-[0.65]"}
              w-full
            `}
          >
            <Image
              src={`${BASE_URL}${category.image}`}
              alt={category.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-0 left-0 p-4 bg-opacity-30 flex items-start justify-start w-full">
              <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold uppercase tracking-wider">
                {category.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
