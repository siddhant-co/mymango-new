"use client";

import { useState, useRef } from "react";
import Slider from "react-slick";
import { Product } from "@/types/Products";
import { useDispatch } from "react-redux";
import ProductCard from "@/components/Client-side-server/All-products/ProductCard";

interface ProductsPageProps {
  products: Product[];
}

export default function ProductsPage({ products }: ProductsPageProps) {
  const [selectedVariants, setSelectedVariants] = useState<Record<number, any>>({});
  const dispatch = useDispatch();
  const sliderRef = useRef<Slider>(null);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    rows: 2, // ✅ only 2 rows
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
    <main className="max-w-7xl mx-auto mb-3">
      <h1 className="text-2xl md:text-[48px] mb-6 text-center font-playfair text-[#3E3E3E]">
        DISCOVER ALL PRODUCTS
      </h1>

      <div className="slider-container px-2 sm:px-3">
      <Slider {...settings} ref={sliderRef}>
  {products.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      selectedVariant={selectedVariants[product.id]}
      onVariantSelect={(variant) =>
        setSelectedVariants((prev) => ({
          ...prev,
          [product.id]: variant,
        }))
      }
    />
  ))}
</Slider>
      </div>

      {/* Custom Navigation */}
      <div className="flex justify-center gap-3 items-center">
        <div className="h-px flex-1 bg-gray-300" />
        <button
          onClick={() => sliderRef.current?.slickPrev()}
          className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100"
          aria-label="Previous Slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => sliderRef.current?.slickNext()}
          className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100"
          aria-label="Next Slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div className="h-px flex-1 bg-gray-300" />
      </div>
    </main>
  );
}
