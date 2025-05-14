import React from "react";

const Footer = () => {
  return (
    <footer className="bg-orange-500 text-black px-6 py-10 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* LOGO + CONTACT */}
        <div>
          <h1 className="text-3xl font-bold mb-6">LOGO</h1>
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
          <h3 className="text-xl font-semibold mb-4">Menu</h3>
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
          <h3 className="text-xl font-semibold mb-4">Get Help</h3>
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
          <h3 className="text-xl font-semibold mb-4">Account</h3>
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
