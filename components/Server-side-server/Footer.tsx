import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <section>
      <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:items-start w-full bg-white py-8 px-6">
        {/* Left section (logo and about us) */}
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex flex-col gap-6 max-w-md">
            <Image
              src="https://template.getbazaar.io/assets/images/logo2.svg"
              alt="Logo"
              width={100}
              height={40}
            />
            <span className="text-[14px] font-sans text-[#2B3445] font-normal leading-[1.5]">
              Transform your space with timeless, handcrafted furniture designed
              for comfort, style, and elegance—where quality meets lasting
              impressions.
            </span>
            <span className="text-[14px] font-sans font-normal leading-[1.5]">
              © 2025 By UI Lib. All rights reserved.
            </span>
          </div>

          <div>
            <h4 className="text-[16px] font-medium text-black pb-4">
              About Us
            </h4>
            <ul className="text-[14px] text-[#2B3445] flex flex-col gap-1.5">
              <li>Careers</li>
              <li>Our Stores</li>
              <li>Our Cares</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        {/* Right section (Customer Care and Contact) */}
        <div className="flex flex-col lg:flex-row gap-10 mt-8 lg:mt-0">
          <div>
            <h4 className="text-[16px] font-medium pb-4 text-black">
              Customer Care
            </h4>
            <ul className="text-[14px] text-[#2B3445] flex flex-col gap-1.5">
              <li>Help Center</li>
              <li>Track Your Order</li>
              <li>Corporate & Bulk Purchasing</li>
              <li>Return & Refunds</li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h4 className="text-[16px] font-medium pb-4 text-black">
                Contact Us
              </h4>
              <ul className="text-[14px] text-[#2B3445] flex flex-col gap-1.5">
                <li>
                  70 Washington Square South, New York, NY 10012, United States
                </li>
                <li>Email: uilib.help@gmail.com</li>
                <li>Phone: +1 1123 456 780</li>
              </ul>
            </div>

            <div className="flex gap-2">
              <TwitterIcon className="size-8 border bg-black text-white p-1.5 rounded-[12px]" />
              <FacebookIcon className="size-8 border bg-black text-white p-1.5 rounded-[12px]" />
              <InstagramIcon className="size-8 border bg-black text-white p-1.5 rounded-[12px]" />
              <YoutubeIcon className="size-8 border bg-black text-white p-1.5 rounded-[12px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
