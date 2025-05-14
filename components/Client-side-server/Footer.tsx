import Image from "next/image";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Divider line at the top */}
        <div className="border-t border-gray-200 mb-8"></div>

        {/* Mobile & Tablet layout */}
        <div className="block lg:hidden space-y-8 sm:grid sm:grid-cols-2 sm:gap-10">
          {/* Row 1: Centered Logo on Mobile / Left on Tablet */}
          <div className="flex justify-center sm:justify-start mb-6 sm:mb-0">
            <Image
              src="/MangoLogo.webp"
              alt="Company Logo"
              width={140}
              height={40}
            />
          </div>

          {/* Row 2: Contact Info on Mobile / Right on Tablet */}
          <div className="text-center sm:text-left mb-6 sm:mb-0">
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p className="text-sm text-gray-600">
              <strong>WhatsApp</strong>: +62 859 9999 999
            </p>
            <p className="text-sm text-gray-600">
              <strong>Email</strong>: hello@modeva.com
            </p>
            <p className="text-sm text-gray-600">
              <strong>Address</strong>: Lorem ipsum street Block B <br />
              Number 08, Jakarta, Indonesia, 12345
            </p>
          </div>

          {/* Row 3 & 4 (Tablet): Menu and Get Help side by side */}
          <div className="sm:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-center sm:text-left">
              Menu
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 text-center sm:text-left">
              <li>Sale</li>
              <li>New Arrivals</li>
              <li>Formal Men</li>
              <li>Formal Woman</li>
              <li>Casual Men</li>
              <li>Casual Woman</li>
            </ul>
          </div>
          <div className="sm:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-center sm:text-left">
              Get Help
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 text-center sm:text-left">
              <li>FAQ</li>
              <li>Customer Service</li>
              <li>Refund and Return</li>
              <li>Terms and Conditions</li>
              <li>Shipping</li>
            </ul>
          </div>

          {/* Row 5 & 6 (Tablet): Account and Categories side by side */}
          <div className="sm:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-center sm:text-left">
              Account
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 text-center sm:text-left">
              <li>My Account</li>
              <li>My Orders</li>
              <li>Vouchers and Discounts</li>
            </ul>
          </div>
          <div className="sm:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-center sm:text-left">
              Categories
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 text-center sm:text-left">
              <li>Chair</li>
              <li>Table</li>
              <li>Stools</li>
              <li>Cabinet</li>
              <li>Dustbin</li>
              <li>Household</li>
            </ul>
          </div>
        </div>

        {/* Laptop and above layout */}
        <div className="hidden lg:grid grid-cols-4 gap-10">
          {/* Logo + Contact Info */}
          <div>
            <Image
              src="/MangoLogo.webp"
              alt="Company Logo"
              width={140}
              height={40}
              className="mb-6"
            />
            <div className="text-sm space-y-2 text-gray-600">
              <p>
                <strong>WhatsApp</strong>: +62 859 9999 999
              </p>
              <p>
                <strong>Email</strong>: hello@modeva.com
              </p>
              <p>
                <strong>Address</strong>: Lorem ipsum street Block B <br />
                Number 08, Jakarta, Indonesia, 12345
              </p>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Menu</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Sale</li>
              <li>New Arrivals</li>
              <li>Formal Men</li>
              <li>Formal Woman</li>
              <li>Casual Men</li>
              <li>Casual Woman</li>
            </ul>
          </div>

          {/* Get Help */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get Help</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>FAQ</li>
              <li>Customer Service</li>
              <li>Refund and Return</li>
              <li>Terms and Conditions</li>
              <li>Shipping</li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>My Account</li>
              <li>My Orders</li>
              <li>Vouchers and Discounts</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
