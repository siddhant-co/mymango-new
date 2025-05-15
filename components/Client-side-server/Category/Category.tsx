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
      <div className="flex flex-col lg:flex-row gap-4 ">
        {categories.slice(0, 3).map((category, index) => {
          return (
            // Outer wrapper to show shadow on hover
            <div
              key={category.id}
              className={`cursor-pointer hover:shadow-md hover:z-10 transition-shadow duration-200 ease-in-out
                ${index === 0 ? "lg:flex-[1.5]" : "lg:flex-[0.65]"}
              `}
            >
              {/* Inner container with overflow-hidden to crop image */}
              <div className="relative overflow-hidden h-60 sm:h-64 md:h-72 w-full m:py-40 bg-cover sm:bg-center md:bg-center bg-no-repeat bg-left">
                <Image
                  src={`${BASE_URL}${category.image}`}
                  alt={category.title}
                  fill
                  className="w-full"
                />
                <div className="absolute top-0 left-0 p-4 bg-opacity-30 flex items-start justify-start w-full">
                  <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold uppercase tracking-wider">
                    {category.title}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Second Row */}
      <div className="flex flex-col lg:flex-row gap-4 ">
        {categories.slice(3, 6).map((category, index) => {
          return (
            <div
              key={category.id}
              className={`cursor-pointer hover:shadow-md hover:z-10 transition-shadow duration-200 ease-in-out
                ${index === 2 ? "lg:flex-[1.5]" : "lg:flex-[0.65]"}
              `}
            >
              <div className="relative overflow-hidden h-60 sm:h-64 md:h-72 w-full ">
                <Image
                  src={`${BASE_URL}${category.image}`}
                  alt={category.title}
                  fill
                  className="w-full overflow-hidden  bg-cover sm:bg-center md:bg-center bg-no-repeat bg-left "
                />
                <div className="absolute top-0 left-0 p-4 bg-opacity-30 flex items-start justify-start w-full">
                  <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold uppercase tracking-wider">
                    {category.title}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
