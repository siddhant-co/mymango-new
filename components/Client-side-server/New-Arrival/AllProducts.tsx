"use client";

import { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types/Products";

interface ProductsPageProps {
  products: Product[];
}

export default function ProductsPage({ products }: ProductsPageProps) {
  const [selectedVariants, setSelectedVariants] = useState<{
    [productId: number]: any;
  }>({});
  const sliderRef = useRef<any>(null);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    rows: 2,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          rows: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 2,
        },
      },
    ],
  };

  return (
    <main className="px-2 sm:px-3 py-6 max-w-7xl mx-auto">
      <h1
        className="text-2xl md:text-[48px] mb-6 text-center font-playfair"
        style={{ color: "#3E3E3E" }}
      >
        DISCOVER ALL PRODUCTS
      </h1>

      <div className="slider-container">
        <Slider {...settings} ref={sliderRef}>
          {products.map((product) => {
            const selected = selectedVariants[product.id];
            const displayImage = selected?.images?.[0] || product.images[0];
            const displayPrice =
              selected?.selling_price || product.selling_price;
            const basePrice = product.base_price;

            return (
              <div key={product.id} className="px-2">
                <div
                  className="border shadow hover:shadow-md transition min-h-full w-full mb-6"
                  style={{ border: "1px solid #9B9B9B" }}
                >
                  <div
                    className="p-1 flex items-center justify-center relative"
                    style={{ borderBottom: "1px solid gray" }}
                  >
                    <Image
                      src={`https://nxadmin.consociate.co.in${displayImage}`}
                      width={300}
                      height={300}
                      className="object-cover rounded mb-3"
                      alt={product.name}
                    />
                    <div className="absolute top-1 right-1 z-20 bg-white p-1 rounded-full shadow hover:text-red-500 h-8 w-8 flex items-center justify-center">
                      <button>
                        <Heart size={16} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between items-center text-center sm:text-left px-2">
                    <div className="flex flex-col p-2">
                      <h2 className="text-sm font-semibold">{product.name}</h2>
                      <p className="text-xs sm:text-sm text-[#f83a3a]">
                        ₹{displayPrice}
                        {basePrice !== displayPrice && (
                          <span className="line-through text-xs ml-1 text-gray-500">
                            ₹{basePrice}
                          </span>
                        )}
                      </p>

                      <div className="flex gap-1 mt-1 flex-wrap">
                        {product.variant_list
                          ?.slice(0, 3)
                          .map((variant: any) => (
                            <div
                              key={variant.id}
                              title={variant.specification.colour}
                              onClick={() =>
                                setSelectedVariants((prev) => ({
                                  ...prev,
                                  [product.id]: variant,
                                }))
                              }
                              className={`w-8 h-8 border cursor-pointer rounded-full overflow-hidden flex items-center justify-center ${
                                selected?.id === variant.id
                                  ? "ring-2 ring-blue-400"
                                  : ""
                              }`}
                            >
                              {variant.images && variant.images.length > 0 && (
                                <Image
                                  src={`https://nxadmin.consociate.co.in${variant.images[0]}`}
                                  alt={
                                    variant.specification.colour || "Variant"
                                  }
                                  width={20}
                                  height={20}
                                  className="object-contain"
                                />
                              )}
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="text-yellow-500 text-sm sm:text-base whitespace-nowrap mt-2 sm:mt-0">
                      ★★★★<span className="text-gray-300">★</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>

        {/* Custom Navigation */}
        <div className="flex justify-center gap-3 items-center mb-6">
          <div className="h-px flex-1 bg-gray-300" />
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white-200 shadow hover:bg-gray-300"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white-200 shadow hover:bg-gray-300"
          >
            <ChevronRight size={24} />
          </button>
          <div className="h-px flex-1 bg-gray-300" />
        </div>
      </div>
    </main>
  );
}
