import Banner from "@/components/Server-side-codes/Banner/Banner";
import fetchData from "../api/fetchdata";
import Category from "@/components/Server-side-codes/Category/Category";
import Speciality from "@/components/Server-side-codes/What-Make-Us-Special/Speciality";
import WhyChooseUsSection, {
  getWhyChooseUsData,
} from "@/components/Server-side-codes/Why-Choose-Us/WhyChooseUS";
import Stories from "@/components/Server-side-codes/Stories/Stories";
import ProductsPage from "@/components/Client-side-server/New-Arrival/AllProducts";
import NewArrivals from "@/components/Client-side-server/New-Arrival/NewArrival";
import TestimonialSliderClient from "@/components/Client-side-server/New-Arrival/Testimonials";
import {
  fetchNewArrivals,
  fetchAllProducts,
  getTestimonials,
} from "./Function";
import YouTubePlayer from "@/components/Server-side-codes/VideoPlayer/YouTubePlayer";

const Home = async () => {
  const bannerdata = await fetchData("frontend/banners");
  const response = await fetchData("frontend/categories");
  const allProducts = await fetchNewArrivals();
  const products = await fetchAllProducts();
  const testimonials = await getTestimonials();

  const categories = response.product_categories || [];
  const whyChooseUsData = await getWhyChooseUsData();

  return (
    <>
      <Banner bannerEndpoint={bannerdata} />

      <h1
        className="text-2xl md:text-[48px] mt-6 text-center font-playfair"
        style={{ color: "#3E3E3E" }}
      >
        BROWSE THROUGH OUR CATEGORY
      </h1>

      <Category categories={categories} />
      <Speciality />
      <WhyChooseUsSection whyChooseUsData={whyChooseUsData} />
      <ProductsPage products={products} />
      <NewArrivals products={allProducts} />

      <YouTubePlayer />

      <Stories />
      <TestimonialSliderClient testimonials={testimonials} />
    </>
  );
};

export default Home;
