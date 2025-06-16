// app/page.tsx

import Head from "next/head";
import Banner from "@/components/Server-side-codes/Banner/Banner";
import fetchData from "../api/fetchdata";
import Category from "@/components/Server-side-codes/Category/Category";
import Speciality from "@/components/Server-side-codes/What-Make-Us-Special/Speciality";
import WhyChooseUsSection, {
  getWhyChooseUsData,
} from "@/components/Server-side-codes/Why-Choose-Us/WhyChooseUS";
import Stories from "@/components/Server-side-codes/Stories/Stories";
import ProductsPage from "@/components/Client-side-server/All-products/ProductsPage";
import TestimonialSliderClient from "@/components/Client-side-server/New-Arrival/Testimonials";
import {
  fetchNewArrivals,
  fetchAllProducts,
  getTestimonials,
} from "./Function";
import YouTubePlayer from "@/components/Server-side-codes/VideoPlayer/YouTubePlayer";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductsCard from "@/components/Client-side-server/All-new-products/ProductList";
import BestSellingProducts from "@/components/Client-side-server/New-Arrival/BestSellingProducts";


export default async function Home() {
  // Fetch all data in parallel-
  const [
    bannerData,
    categoryData,
    newArrivals,
    allProducts,
    testimonials,
    whyChooseUsData,
  ] = await Promise.all([
    fetchData("frontend/banners"),
    fetchData("frontend/categories"),
    fetchNewArrivals(),
    fetchAllProducts(),
    getTestimonials(),
    getWhyChooseUsData(),
  ]);

  const categories = categoryData.product_categories || [];

  // Preload the first banner image for LCP
  const firstBannerImage = bannerData?.banners?.[0]?.image;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <>
      <Head>
        {firstBannerImage && baseUrl && (
          <link
            rel="preload"
            as="image"
            href={`${baseUrl}${firstBannerImage}`}
          />
        )}
      </Head>

      <Banner bannerEndpoint={bannerData} />

      <h1
        className="text-2xl md:text-[48px] mt-6 text-center font-playfair"
        style={{ color: "#3E3E3E" }}
      >
        BROWSE THROUGH OUR CATEGORY
      </h1>

      {/* <Category categories={categories} /> */}
      <Speciality />
      <WhyChooseUsSection whyChooseUsData={whyChooseUsData} />
      <ProductsCard></ProductsCard>
       <BestSellingProducts/>
      <YouTubePlayer />
      {/* <Stories /> */}
      <TestimonialSliderClient testimonials={testimonials} />
    </>
  );
}
