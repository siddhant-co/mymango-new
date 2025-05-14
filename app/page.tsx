import Banner from "@/components/Client-side-server/Banner/Banner";
import fetchData from "../api/fetchdata";
import Category from "@/components/Client-side-server/Category/Category";
import Speciality from "@/components/Client-side-server/What-Make-Us-Special/Speciality";
import WhyChooseUsSection from "@/components/Client-side-server/Why-Choose-Us/WhyChooseUS";

const Home = async () => {
  const bannerdata = await fetchData("frontend/banners");
  const response = await fetchData("frontend/categories");

  console.log("Categories from API:", response);

  // Extract the 'product_categories' array from the response
  const categories = response.product_categories || [];

  return (
    <>
      <Banner bannerEndpoint={bannerdata} />
      <h2 className="text-[40px] font-medium text-center mt-12 tracking-widest">
        BROWSE THROUGH OUR CATEGORIES
      </h2>
      <Category categories={categories} />{" "}
      {/* Pass the correct categories data here */}
      <Speciality />
      <WhyChooseUsSection /> {/* Include the WhyChooseUsSection */}
    </>
  );
};

export default Home;
