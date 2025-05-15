"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import fetchData from "@/api/fetchdata";
import { stripHtmlTags } from "@/app/utils/stripHtmlTags";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
  product_category_name: string;
  author: string;
  publish_date: string;
}

const Stories = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const data = await fetchData("frontend/blogs/");
        if (data.blogs) {
          setBlogs(data.blogs);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    getBlogs();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="pt-8 px-4 sm:px-6 lg:px-8 bg-white">
      <h1
        className="text-2xl md:text-[48px]  mb-6 text-center font-playfair"
        style={{ color: "#3E3E3E" }}
      >
        READ OUR LATEST STORIES
      </h1>
      <div className="max-w-7xl mx-auto">
        {blogs.length > 0 ? (
          <Slider {...settings} ref={sliderRef}>
            {blogs.map((post) => (
              <div key={post.id} className="px-8 my-6">
                <div
                  className=" overflow-hidden flex flex-col h-[450px] bg-white"
                  style={{
                    boxShadow:
                      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                  }}
                >
                  <div className="w-full h-[200px] relative overflow-hidden">
                    <Image
                      src={`https://nxadmin.consociate.co.in/${post.image}`}
                      alt={post.title}
                      fill
                      className="object-contain object-center"
                      priority
                    />
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <p className="text-sm text-orange-500 font-semibold mb-2">
                        {post.product_category_name}
                      </p>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {post.title}
                        </h3>
                        <span className="text-gray-400 text-xl">↗</span>
                      </div>

                      {/* Show only sanitized plain text with max 2 lines */}
                      <p className="text-sm text-gray-700 line-clamp-2 mt-1">
                        {stripHtmlTags(post.content)} {/* No HTML tags */}
                      </p>
                    </div>
                    <div className="mt-[-15px] lg:mt-6">
                      <p className="font-medium text-sm text-gray-700">
                        {post.author}
                      </p>
                      <p className="text-xs text-gray-500">
                        {post.publish_date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p>Loading blogs...</p>
        )}

        {/* Custom navigation arrows */}
        <div className="relative flex items-center justify-center mt-10 w-full">
          <div className="absolute left-0 w-[calc(50%-4.5rem)] border-t-2 border-gray-300"></div>
          <div className="absolute right-0 w-[calc(50%-4.5rem)] border-t-2 border-gray-300"></div>

          <div className="flex gap-4 px-4 z-10">
            <button
              className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100"
              onClick={() => sliderRef.current?.slickPrev()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100"
              onClick={() => sliderRef.current?.slickNext()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stories;
