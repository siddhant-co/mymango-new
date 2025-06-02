"use client";

import React from "react";
import dynamic from "next/dynamic";
import Button from "@/components/Common-Components/Button";

// Dynamically import CountdownTimer with SSR disabled
const CountdownTimer = dynamic(
  () => import("@/components/Client-side-server/CountDownTimer/CountdownTimer"),
  { ssr: false }
);

const Speciality: React.FC = () => {
  return (
    <div className="mb-12">
      <h1 className="text-2xl md:text-[48px] mb-6 text-center font-playfair text-[#3E3E3E]">
        HERE'S WHAT MAKES US SPECIAL
      </h1>

      <section
        className="w-full h-[450px] overflow-hidden py-5 sm:py-40 bg-no-repeat bg-left bg-cover sm:bg-center md:bg-center"
        style={{ backgroundImage: "url('/WhatMakesSpecial.webp')" }}
      >
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-10 px-4 sm:px-6 md:px-0 text-white">
          <div className="w-full lg:w-1/2" />
          <div className="w-full lg:w-1/2">
            <div className="md:ml-20 mt-18 sm:mt-0">
              <h2 className="text-2xl lg:text-5xl md:text-4xl sm:text-3xl font-semibold mb-6 text-center sm:text-left lg:mt-[-60px] md:mt-[60px]">
                EARLY BIRD SPECIAL
              </h2>

              <div className="mb-0 lg:mb-8">
                <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 items-center">
                  <CountdownTimer />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-center lg:justify-start gap-4 mt-8 sm:mt-12 lg:mt-24 md:mt-20">
                <Button
                  text="Shop Now"
                  className="bg-white text-black border border-black hover:bg-gray-100 px-6 py-2"
                />
                <div className="hidden sm:block border-t border-white w-32 md:w-80 lg:w-90 mt-6 sm:mt-0" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Speciality;
