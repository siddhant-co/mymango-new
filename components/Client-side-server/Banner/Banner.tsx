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
              priority
              className="w-full object-cover h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[90vh]"
            />
          )}

          {/* Optional dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/30 z-0" />

          {/* Text Over Banner */}
          <div
            className="
              absolute inset-0 z-10
              flex flex-col justify-center items-center text-center
              px-4 sm:px-8 md:px-12
              lg:items-start lg:text-left lg:px-20
            "
          >
            {banner.heading && (
              <p className="text-white font-semibold mb-2 sm:mb-4 text-base sm:text-lg md:text-xl lg:text-2xl">
                {banner.heading}
              </p>
            )}
            {banner.description && (
              <p className="text-white font-light max-w-3xl text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-snug sm:leading-snug">
                {banner.description}
              </p>
            )}
          </div>

          {/* Scroll Down Indicator */}
          <div
            onClick={handleScroll}
            className="hidden sm:flex absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce text-white z-20 items-center"
          >
            <p className="text-sm sm:text-base md:text-lg mr-2">Scroll Down</p>
            <ChevronsDown size={24} />
          </div>
        </div>
      ))}
    </section>
  );
};

export default Banner;
