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
  try {
    const [headerResponse, categoryResponse] = await Promise.all([
      fetchData(headerEndpoint),
      fetchData(categoryEndpoint),
    ]);

    const navData = Array.isArray(headerResponse?.headers)
      ? headerResponse.headers
      : [];

    const categories = Array.isArray(categoryResponse?.product_categories)
      ? categoryResponse.product_categories
      : [];

    return (
      <>
        <CouponBanner />
        <NavbarClient navData={navData} categories={categories} />
      </>
    );
  } catch (error) {
    console.error("Navbar fetch error:", error);

    return (
      <>
        <CouponBanner />
        <NavbarClient navData={[]} categories={[]} />
      </>
    );
  }
};

export default Navbar;
