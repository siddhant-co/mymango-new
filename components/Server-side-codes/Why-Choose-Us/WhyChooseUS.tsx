
import fetchData from "@/api/fetchdata";
import Image from "next/image";


export interface WhyChooseUs {
  id: number;
  sequence_number: number;
  heading: string;
  description: string;
  image: string;
}

interface WhyChooseUsSectionProps {
  whyChooseUsData: WhyChooseUs[];
}

export async function getWhyChooseUsData() {
  const data = await fetchData("frontend/whychooseus_sections/");
  if (data && Array.isArray(data.whychooseus_sections)) {
    return data.whychooseus_sections;
  }
  return [];
}

export default function WhyChooseUsSection({
  whyChooseUsData,
}: WhyChooseUsSectionProps) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <div className="bg-white w-full overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-3">
          {(whyChooseUsData ?? []).map((item, index) => (
            <div
              key={item.id}
              className={`
                bg-white shadow-md p-6 border-14
                flex flex-col items-center text-center w-full
                ${
                  index === 0
                    ? "lg:col-span-1 lg:h-[272px] lg:flex lg:flex-col lg:items-center lg:justify-center"
                    : index === 1
                    ? "lg:col-span-1 lg:flex lg:flex-row lg:items-center lg:text-left lg:gap-x-5 lg:h-32"
                    : index === 2
                    ? "lg:col-start-2 lg:col-span-1 lg:flex lg:flex-row lg:items-center lg:text-left lg:gap-x-6 lg:h-30 lg:mt-[-153px]"
                    : index === 3
                    ? "lg:col-start-3 lg:col-span-1 lg:h-[272px] lg:flex lg:flex-col lg:items-center lg:justify-center lg:mt-[-305px]"
                    : ""
                }
              `}
              style={{
                minWidth: 0,
                borderColor: "#f2f2f2f2", // custom light gray with transparency
              }}
            >
              <div className="relative w-16 h-16 mb-4 lg:mb-0 shrink-0">
                {item.image && (
                  <Image
                    src={`${BASE_URL}${item.image}`}
                    alt={item.heading}
                    fill
                      sizes="64px"
                    style={{ objectFit: "contain" }}
                  />
                )}
              </div>
              <div className="w-full">
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
}
