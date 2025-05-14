"use client";

import React from "react";
import Image from "next/image";
import { BannerData } from "@/types/Banner_datatypes";
// import Slider from "react-slick";  // Commented out the Slider import
// import "slick-carousel/slick/slick.css";  // Commented out slick styles
// import "slick-carousel/slick/slick-theme.css";  // Commented out slick styles
import { ChevronsDown } from "lucide-react";

interface BannerProps {
  bannerEndpoint: { banners?: BannerData[] };
}

const Banner: React.FC<BannerProps> = ({ bannerEndpoint }) => {
  const bannerDataArray = Array.isArray(bannerEndpoint?.banners)
    ? bannerEndpoint.banners
    : [];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  // Scroll handler
  const handleScroll = () => {
    window.scrollBy({
      top: window.innerHeight * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full relative">
      {/* Slider code is commented out */}
      {/* <Slider {...settings}> */}
      {bannerDataArray.map((banner, index) => (
        <div key={index} className="relative w-full">
          {banner.image && process.env.NEXT_PUBLIC_API_BASE_URL && (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${banner.image}`}
              alt={banner.heading || `Banner ${index + 1}`}
              width={1920}
              height={1080}
              className="rounded-none object-cover w-full h-auto min-h-screen"
            />
          )}

          {/* Heading */}
          {banner.heading && (
            <p className="absolute top-48 sm:top-48 left-16 text-left text-3xl sm:text-4xl md:text-2xl font-semibold text-white">
              {banner.heading}
            </p>
          )}

          {/* Description */}
          {banner.description && (
            <p className="absolute top-[18rem] sm:top-[15rem] left-16 text-left text-sm sm:text-lg md:text-[40px] text-white font-thin pr-[30px] max-w-[1000px]">
              <span className="text-base sm:text-xl md:text-[55px] text-white font-medium">
                {banner.description}
              </span>
            </p>
          )}

          {/* Scroll Down Text and Arrow */}
          <div
            onClick={handleScroll}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce text-white z-20 flex items-center"
          >
            {/* Scroll Down Text */}
            <p className="text-left text-xl mr-2">Scroll Down</p>

            {/* Double Chevron Down Icon with reduced gap */}
            <div className="flex flex-col items-start gap-0.5">
              {" "}
              {/* Reduced gap between icons */}
              <ChevronsDown size={25} />
            </div>
          </div>
        </div>
      ))}
      {/* </Slider> */}
    </section>
  );
};

export default Banner;
