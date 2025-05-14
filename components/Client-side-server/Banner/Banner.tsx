"use client";

import React from "react";
import Image from "next/image";
import { BannerData } from "@/types/Banner_datatypes";
import { ChevronsDown } from "lucide-react";

interface BannerProps {
  bannerEndpoint: { banners?: BannerData[] };
}

const Banner: React.FC<BannerProps> = ({ bannerEndpoint }) => {
  const bannerDataArray = Array.isArray(bannerEndpoint?.banners)
    ? bannerEndpoint.banners
    : [];

  const handleScroll = () => {
    window.scrollBy({
      top: window.innerHeight * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full relative">
      {bannerDataArray.map((banner, index) => (
        <div key={index} className="relative w-full">
          {banner.image && process.env.NEXT_PUBLIC_API_BASE_URL && (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${banner.image}`}
              alt={banner.heading || `Banner ${index + 1}`}
              width={1920}
              height={1080}
              className="rounded-none object-cover w-full h-[50vh] sm:h-[40vh] md:h-[52vh] lg:h-auto"
            />
          )}

          {/* Heading */}
          {/* Heading */}
          {banner.heading && (
            <p className="absolute top-32 sm:top-[80px] md:top-[180px] left-6 sm:left-16 text-left text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
              {banner.heading}
            </p>
          )}

          {/* Description */}
          {banner.description && (
            <p className="absolute top-[11rem] sm:top-[10rem] md:top-[250px] left-6 sm:left-16 text-left text-base sm:text-sm md:text-lg text-white font-thin pr-6 sm:pr-[30px] max-w-[1000px]">
              <span className="text-lg sm:text-lg md:text-[30px] text-white font-medium">
                {banner.description}
              </span>
            </p>
          )}

          {/* Scroll Down - hidden only on mobile */}
          <div
            onClick={handleScroll}
            className="hidden sm:flex absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce text-white z-20 items-center"
          >
            <p className="text-left text-sm sm:text-xl mr-1 sm:mr-2">
              Scroll Down
            </p>
            <div className="flex flex-col items-start gap-0.5">
              <ChevronsDown size={18} className="sm:size-[25px]" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Banner;
