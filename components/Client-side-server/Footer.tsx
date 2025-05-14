import Image from "next/image";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="text-black py-10 px-6 md:px-16 lg:px-20">
      {/* Divider line at the top */}
      <div className="border-t border-gray-300 mb-10"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {/* LOGO + CONTACT */}
        <div>
          <Image
            src="/MangoLogo.webp" // Make sure your logo is in the /public folder
            alt="Company Logo"
            width={140}
            height={40}
            className="mb-6"
          />
          <div className="text-sm space-y-2">
            <p>
              <strong>WhatsApp</strong> : +62 859 9999 999
            </p>
            <p>
              <strong>Email</strong> : hello@modeva.com
            </p>
            <p>
              <strong>Address</strong> : Lorem ipsum street Block B <br />
              Number 08, Jakarta, Indonesia, 12345
            </p>
          </div>
        </div>

        {/* MENU */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Menu</h4>
          <ul className="space-y-2 text-sm">
            <li>Sale</li>
            <li>New Arrivals</li>
            <li>Formal Men</li>
            <li>Formal Woman</li>
            <li>Casual Men</li>
            <li>Casual Woman</li>
          </ul>
        </div>

        {/* GET HELP */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Get Help</h4>
          <ul className="space-y-2 text-sm">
            <li>FAQ</li>
            <li>Customer Service</li>
            <li>Refund and Return</li>
            <li>Terms and Conditions</li>
            <li>Shipping</li>
          </ul>
        </div>

        {/* ACCOUNT */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Account</h4>
          <ul className="space-y-2 text-sm">
            <li>My Account</li>
            <li>My Orders</li>
            <li>Vouchers and Discounts</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
