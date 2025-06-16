"use client";

import React from "react";
import Image from "next/image";
import { BannerData } from "@/types/Banner_datatypes";
import { ChevronsDown } from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

interface BannerProps {
  bannerEndpoint: { banners?: BannerData[] };
}

const Banner: React.FC<BannerProps> = ({ bannerEndpoint }) => {
  const bannerDataArray = Array.isArray(bannerEndpoint?.banners)
    ? bannerEndpoint.banners
    : [];

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
    },
    renderMode: "performance",
  });

  return (
    <section className="w-full relative overflow-hidden">
      <div ref={sliderRef} className="keen-slider">
        {bannerDataArray.map((banner, index) => (
          <div
            key={index}
            className="keen-slider__slide relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh]"
          >
            {banner.image && process.env.NEXT_PUBLIC_API_BASE_URL && (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${banner.image}`}
                alt={banner.heading || `Banner ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            )}

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 z-10" />

            {/* Text */}
            <div
              className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center
                px-4 sm:px-8 md:px-12
                lg:items-start lg:text-left lg:px-20"
            >
              {banner.heading && (
                <p className="text-white font-semibold mb-2 sm:mb-4 text-base sm:text-lg md:text-xl lg:text-2xl">
                  {banner.heading}
                </p>
              )}
              {banner.description && (
                <p className="text-white font-light max-w-3xl text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-snug">
                  {banner.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <div className="hidden sm:flex absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-default animate-bounce text-white z-30 items-center">
        <p className="text-sm sm:text-base md:text-lg mr-2">Scroll Down</p>
        <ChevronsDown size={24} />
      </div>
    </section>
  );
};

export default Banner;
