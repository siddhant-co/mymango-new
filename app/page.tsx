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

const Home = async () => {
  const bannerdata = await fetchData("frontend/banners");
  const response = await fetchData("frontend/categories");
  const allProducts = await fetchNewArrivals();
  const products = await fetchAllProducts();
  const testimonials = await getTestimonials();

  console.log("Categories from API:", response);

  const categories = response.product_categories || [];

  return (
    <>
      <Banner bannerEndpoint={bannerdata} />
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-medium text-center my-6 mb-0 tracking-widest px-4">
        BROWSE THROUGH OUR CATEGORIES
      </h2>
      <Category categories={categories} /> <Speciality />
      <WhyChooseUsSection />
      <ProductsPage products={products} />
      <NewArrivals products={allProducts} />
      <TestimonialSliderClient testimonials={testimonials} />
      <Stories />
    </>
  );
};

export default Home;
