import Banner from "@/components/Client-side-server/Banner/Banner";
import fetchData from "../api/fetchdata";
import Category from "@/components/Client-side-server/Category/Category";
import Speciality from "@/components/Client-side-server/What-Make-Us-Special/Speciality";
import WhyChooseUsSection from "@/components/Client-side-server/Why-Choose-Us/WhyChooseUS";
import Stories from "@/components/Client-side-server/Stories/Stories";
import ProductsPage from "@/components/Client-side-server/New-Arrival/AllProducts";
import NewArrivals from "@/components/Client-side-server/New-Arrival/NewArrival";
import TestimonialSliderClient from "@/components/Client-side-server/New-Arrival/Testimonials";
import {
  fetchNewArrivals,
  fetchAllProducts,
  getTestimonials,
} from "./Function";
import YouTubePlayer from "@/components/Client-side-server/VideoPlayer/YouTubePlayer";

const Home = async () => {
  const bannerdata = await fetchData("frontend/banners");
  const response = await fetchData("frontend/categories");
  const allProducts = await fetchNewArrivals();
  const products = await fetchAllProducts();
  const testimonials = await getTestimonials();

  const categories = response.product_categories || [];

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
      <WhyChooseUsSection />
      <ProductsPage products={products} />
      <NewArrivals products={allProducts} />
      <TestimonialSliderClient testimonials={testimonials} />

      <YouTubePlayer thumbnail="/VideoThumbnail.png" videoId="FLGOZSFnjV4" />

      <Stories />
    </>
  );
};

export default Home;
