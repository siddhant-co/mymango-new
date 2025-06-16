"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Menu, X } from "lucide-react";

// Dynamically import client-heavy parts
const NavbarActions = dynamic(() => import("./NavbarActions"), { ssr: false });

interface NavItem {
  pk: number;
  name: string;
  link: string;
}

interface Category {
  title: string;
  id: number;
  name: string;
  image: string;
  slug: string;
}

interface NavbarClientProps {
  navData: NavItem[];
  categories: Category[];
}

const NavbarClient: React.FC<NavbarClientProps> = ({ navData, categories }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderCategoryDropdown = () => (
    <div
      className="absolute top-full left-0 mt-3 z-50 w-64 bg-white rounded-md shadow-xl p-4 grid grid-cols-1 gap-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-[-10px] group-hover:translate-y-0 transition-all duration-300 ease-in-out before:absolute before:top-[-8px] before:left-5 before:border-8 before:border-x-transparent before:border-b-white before:border-t-transparent"
    >
      {/* {categories.slice(0, 8).map((cat) => (
        <Link
          key={cat.id}
          href={`/categories/${cat.slug}`}
          className="flex items-center gap-3 p-2 rounded-md hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 transform hover:scale-105"
        >
          <p className="text-sm font-semibold">{cat.title}</p>
        </Link>
      ))} */}
    </div>
  );

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/30 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      {/* Mobile Top Bar */}
      <div className="flex lg:hidden justify-between items-center px-2 py-3">
        <Link href="">
          <Image src="/MangoLogo.webp" alt="Logo" width={100} height={30} priority />
        </Link>
        <div className="flex items-center gap-3 ml-auto mr-2">
          <NavbarActions mobile />
          {isMobileMenuOpen ? (
            <X className="text-black w-6 h-6 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)} />
          ) : (
            <Menu className="text-black w-6 h-6 cursor-pointer" onClick={() => setIsMobileMenuOpen(true)} />
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="lg:hidden px-4 mb-3 flex justify-center">
        <div className="relative w-[90%] max-w-sm">
          <span className="absolute inset-y-0 left-3 flex items-center">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 rounded-full w-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden lg:flex justify-between items-center p-4 md:px-8">
        <Link href="">
          <Image src="/MangoLogo.webp" alt="Logo" width={160} height={40} priority />
        </Link>

        <div className="flex gap-10 items-center">
          {navData.map((item, index) => (
            <div key={item.pk} className="relative group">
              <Link
                href={item.link}
                className={`flex items-center hover:text-orange-500 font-medium ${
                  isScrolled ? "text-black" : "text-amber-500"
                }`}
              >
                {item.name}
                {index === 1 && (
                  <span className="ml-2 mt-1 text-sm flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-chevron-down"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                )}
              </Link>
              {index === 1 && categories.length > 0 && renderCategoryDropdown()}
            </div>
          ))}
        </div>

        <NavbarActions />
      </div>

      {/* Mobile Links */}
      {isMobileMenuOpen && (
        <div className="lg:hidden px-4 pb-4">
          <ul className="flex flex-col gap-3 text-sm">
            {navData.map((item) => (
              <li key={item.pk}>
                <Link href={item.link} onClick={() => setIsMobileMenuOpen(false)}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavbarClient;