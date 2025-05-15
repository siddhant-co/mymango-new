"use client";

import React, { useEffect, useState } from "react";
import fetchData from "@/api/fetchdata";
import Image from "next/image";

interface WhyChooseUs {
  id: number;
  sequence_number: number;
  heading: string;
  description: string;
  image: string;
}

const WhyChooseUsSection = () => {
  const [whyChooseUsData, setWhyChooseUsData] = useState<WhyChooseUs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchWhyChooseUs = async () => {
      try {
        const data = await fetchData("frontend/whychooseus_sections/");
        if (data && Array.isArray(data.whychooseus_sections)) {
          setWhyChooseUsData(data.whychooseus_sections);
        } else {
          setError("Failed to load 'Why Choose Us' data.");
        }
      } catch (err: any) {
        setError("Error fetching 'Why Choose Us' data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWhyChooseUs();
  }, []);

  if (loading) {
    return <div className="py-16 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="py-16 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-3">
          {whyChooseUsData.map((item, index) => (
            <div
              key={item.id}
              className={`
      bg-white shadow-md p-6 border border-18 border-[#f2f2f2f2]
      flex flex-col items-center text-center w-full
      ${
        index === 0
          ? "lg:col-span-1 lg:h-[272px] lg:w-98 lg:mx-[-95px] lg:flex lg:flex-col lg:items-center lg:justify-center"
          : index === 1
          ? "lg:col-span-1 lg:flex lg:flex-row lg:items-center lg:text-left lg:gap-x-6 lg:w-96 lg:h-32 lg:mx-[-10px]"
          : index === 2
          ? "lg:col-start-2 lg:col-span-1 lg:flex lg:flex-row lg:items-center lg:text-left lg:gap-x-6 lg:w-98 lg:h-30 lg:mt-[-153px] lg:mx-[-10px]"
          : index === 3
          ? "lg:col-start-3 lg:col-span-1 lg:h-[272px] lg:w-96 lg:mt-[-305px] lg:mx-18 lg:flex lg:flex-col lg:items-center lg:justify-center"
          : ""
      }
    `}
            >
              <div className="relative w-16 h-16 mb-4 lg:mb-0">
                {item.image && (
                  <Image
                    src={`${BASE_URL}${item.image}`}
                    alt={item.heading}
                    layout="fill"
                    objectFit="contain"
                  />
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {item.heading}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUsSection;
