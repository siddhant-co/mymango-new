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
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* First Row */}
      <div className="flex flex-col lg:flex-row gap-4">
        {categories.slice(0, 3).map((category, index) => {
          // Apply scale only to first container on lg+
          const scaleEffectClass =
            index === 0
              ? "lg:hover:scale-103 lg:hover:-translate-y-1.5 lg:hover:shadow-xl"
              : "";
          return (
            <div
              key={category.id}
              className={`
                relative overflow-hidden h-60 sm:h-64 md:h-72 group
                ${index === 0 ? "lg:flex-[1.5]" : "lg:flex-[0.65]"}
                w-full transition-transform duration-300 ease-out cursor-pointer
                hover:-translate-y-1.5 hover:shadow-xl
                ${scaleEffectClass}
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
          );
        })}
      </div>

      {/* Second Row */}
      <div className="flex flex-col lg:flex-row gap-4">
        {categories.slice(3, 6).map((category, index) => {
          // Apply scale only to last container (index=2) on lg+
          const scaleEffectClass =
            index === 2
              ? "lg:hover:scale-103 lg:hover:-translate-y-1.5 lg:hover:shadow-xl"
              : "";
          return (
            <div
              key={category.id}
              className={`
                relative overflow-hidden h-60 sm:h-64 md:h-72 group
                ${index === 2 ? "lg:flex-[1.5]" : "lg:flex-[0.65]"}
                w-full transition-transform duration-300 ease-out cursor-pointer
                hover:-translate-y-1.5 hover:shadow-xl
                ${scaleEffectClass}
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
          );
        })}
      </div>
    </div>
  );
}
