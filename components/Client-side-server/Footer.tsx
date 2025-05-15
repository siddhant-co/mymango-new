import Image from "next/image";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <>
      <footer className="bg-white pt-6 pb-4">
        <div className=" border-t-1 max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Divider */}
          <div className="border-t border-gray-200 mb-8"></div>

          {/* ===== MOBILE ONLY (less than sm) ===== */}
          <div className="block sm:hidden space-y-8">
            {/* Logo */}
            <div className="flex justify-center">
              <Image
                src="/MangoLogo.webp"
                alt="Company Logo"
                width={200}
                height={40}
              />
            </div>

            {/* Contact Info */}
            <div className="text-left">
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

            {/* Menu + Help side by side */}
            <div className="flex justify-left items-start space-x-18">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-left">Menu</h4>
                <ul className="space-y-2 text-sm text-gray-600 text-left">
                  <li>Sale</li>
                  <li>New Arrivals</li>
                  <li>Formal Men</li>
                  <li>Formal Woman</li>
                  <li>Casual Men</li>
                  <li>Casual Woman</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-left">
                  Get Help
                </h4>
                <ul className="space-y-2 text-sm text-gray-600 text-left">
                  <li>FAQ</li>
                  <li>Customer Service</li>
                  <li>Refund and Return</li>
                  <li>Terms and Conditions</li>
                  <li>Shipping</li>
                </ul>
              </div>
            </div>

            {/* Account on a new row centered */}
            <div className="flex justify-left ">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-left">
                  Account
                </h4>
                <ul className="space-y-2 text-sm text-gray-600 text-left">
                  <li>My Account</li>
                  <li>My Orders</li>
                  <li>Vouchers and Discounts</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ===== TABLET ONLY (sm to lg) ===== */}
          <div className="hidden sm:grid lg:hidden grid-cols-4 gap-6 mt-10 text-center">
            {/* Logo + contact */}
            <div>
              <div className="flex justify-center mb-4">
                <Image
                  src="/MangoLogo.webp"
                  alt="Company Logo"
                  width={140}
                  height={40}
                />
              </div>
              <div className="text-sm text-gray-600 space-y-2 text-left">
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
            <div className="text-center ml-4 mt-4">
              <h4 className="text-lg font-semibold mb-4 text-left">Menu</h4>
              <ul className="space-y-2 text-sm text-gray-600 text-left">
                <li>Sale</li>
                <li>New Arrivals</li>
                <li>Formal Men</li>
                <li>Formal Woman</li>
                <li>Casual Men</li>
                <li>Casual Woman</li>
              </ul>
            </div>

            {/* Get Help */}
            <div className="text-center ml-4 mt-4">
              <h4 className="text-lg font-semibold mb-4 text-left">Get Help</h4>
              <ul className="space-y-2 text-sm text-gray-600 text-left">
                <li>FAQ</li>
                <li>Customer Service</li>
                <li>Refund and Return</li>
                <li>Terms and Conditions</li>
                <li>Shipping</li>
              </ul>
            </div>

            {/* Account */}
            <div className="text-center ml-4 mt-4">
              <h4 className="text-lg font-semibold mb-4 text-left">Account</h4>
              <ul className="space-y-2 text-sm text-gray-600 text-left">
                <li>My Account</li>
                <li>My Orders</li>
                <li>Vouchers and Discounts</li>
              </ul>
            </div>
          </div>

          {/* ===== DESKTOP / LAPTOP (lg+) ===== */}
          <div className="hidden lg:grid grid-cols-4 gap-10 mt-12">
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
      <p className="bg-[#ff9500] text-white text-[10px] sm:text-[8px] lg:text-base md:text-sm flex justify-center py-1 ">
        {" "}
        Powered by Consociate Solutions
      </p>
    </>
  );
};

export default Footer;
