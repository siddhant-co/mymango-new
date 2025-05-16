import React from "react";
import Button from "@/components/Common-Components/Button";
import CountdownTimer from "@/components/Client-side-server/CountDownTimer/CountdownTimer";

type Props = {};

const Speciality = (props: Props) => {
  return (
    <div className="mb-12">
      <h1
        className="text-2xl md:text-[48px]  mb-6 text-center font-playfair"
        style={{ color: "#3E3E3E" }}
      >
        HERE'S WHAT MAKES US SPECIAL
      </h1>

      <section
        className="w-full h-[450px] overflow-hidden py-5  sm:py-40 bg-cover sm:bg-center md:bg-center bg-no-repeat bg-left"
        style={{
          backgroundImage: `url('/WhatMakesSpecial.webp')`,
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-betn sm:justify-center gap-10 px-4 sm:px-6 md:px-0 text-white">
          {/* Left Side – Centered only for tablet and mobile */}
          <div className="w-full lg:w-1/2 flex justify-center sm:justify-center lg:justify-start"></div>

          {/* Right Side */}
          <div className="w-full lg:w-1/2 md:w-full sm:w-1/2 ">
            <div className="md:ml-20 mt-18 sm:mt-0">
              <h2 className="text-2xl lg:pb-3 sm:text-3xl md:text-4xl lg:mt-[-60px] md:mt-[60px] lg:text-5xl font-semibold mb-6 sm:mb-4 text-center sm:text-left mx-auto sm:mx-0">
                EARLY BIRD SPECIAL
              </h2>

              {/* Timer container */}
              <div className="mb-0 lg:mb-8">
                <div className="flex flex-wrap justify-center md:justify-start lg:justify-start gap-4 sm:gap-6 items-center">
                  <CountdownTimer />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-center lg:justify-start gap-4 mt-8 sm:mt-12 lg:mt-24 md:mt-20">
                <Button
                  text="Shop Now"
                  className="bg-white text-black border border-black hover:bg-gray-100 px-6 py-2"
                />
                <div className="hidden sm:block border-t border-white w-32 md:w-80 lg:w-90 mt-6 sm:mt-0"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Speciality;
