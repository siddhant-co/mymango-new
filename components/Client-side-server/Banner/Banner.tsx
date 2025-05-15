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
          {/* Banner Image */}
          {banner.image && process.env.NEXT_PUBLIC_API_BASE_URL && (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${banner.image}`}
              alt={banner.heading || `Banner ${index + 1}`}
              width={1920}
              height={1080}
              className="rounded-none object-cover w-full h-[50vh] sm:h-[40vh] md:h-[52vh] lg:h-auto"
            />
          )}

          {/* Overlay Text (Heading & Description) */}
          <div className="absolute inset-0 flex flex-col justify-start items-center text-center px-4 sm:px-10 pt-26 sm:pt-24 md:pt-32 z-10">
            {banner.heading && (
              <p className="text-3xl sm:text-5xl md:text-6xl font-semibold text-white mb-4">
                {banner.heading}
              </p>
            )}
            {banner.description && (
              <p className="text-base sm:text-lg md:text-xl text-white max-w-3xl font-light">
                {banner.description}
              </p>
            )}
          </div>

          {/* Scroll Down Indicator (Hidden on Mobile) */}
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
