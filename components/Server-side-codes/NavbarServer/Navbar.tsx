// components/Navbar/Navbar.server.tsx
import React from "react";
import NavbarClient from "@/components/Client-side-server/Navbar/Navbar";
import fetchData from "@/api/fetchdata";
import CouponBanner from "@/components/Server-side-codes/CouponBanner/CouponBanner";

interface NavbarProps {
  headerEndpoint: string;
  categoryEndpoint: string;
}

const Navbar = async ({ headerEndpoint, categoryEndpoint }: NavbarProps) => {
  const headerResponse = await fetchData(headerEndpoint);
  const navData = headerResponse?.headers || [];

  const categoryResponse = await fetchData(categoryEndpoint);
  const categories = categoryResponse?.product_categories || [];

  return (
    <>
      <CouponBanner />
      <NavbarClient navData={navData} categories={categories} />
    </>
  );
};

export default Navbar;
