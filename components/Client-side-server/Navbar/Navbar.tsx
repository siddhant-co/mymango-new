"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CircleUserRound, ShoppingBag, Menu, X, Search } from "lucide-react";

interface NavItem {
  pk: number;
  name: string;
  link: string;
}

interface Category {
  id: number;
  title: string;
  image: string;
}

interface NavbarClientProps {
  navData: NavItem[];
  categories: Category[];
}

const NavbarClient: React.FC<NavbarClientProps> = ({ navData, categories }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCloseMenu = () => {
    setIsMobileMenuOpen(false);
    setShowMobileDropdown(false);
  };

  // Icon color logic:
  // White if NOT scrolled and mobile menu closed
  // Black otherwise
  const iconColor = !isScrolled && !isMobileMenuOpen ? "white" : "black";

  const dynamicTextColor =
    isScrolled || isMobileMenuOpen ? "text-black" : "text-white";

  const renderCategoryDropdown = () => (
    <div className="absolute left-1/2 top-full transform -translate-x-1/2 mt-2 z-50 w-[50vw] max-w-2xl bg-white/30 backdrop-blur-lg shadow-lg p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl">
      {categories.map((cat) => {
        const imageSrc = cat.image.startsWith("/")
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${cat.image}`
          : cat.image;
        return (
          <Link
            key={cat.id}
            href={`/category/${cat.id}`}
            className="flex items-center gap-3 hover:text-orange-500"
          >
            <div className="w-26 h-26 relative lg:left-0">
              <Image
                src={imageSrc}
                alt={cat.title}
                fill
                className="rounded-md object-cover"
              />
            </div>
            <p className="text-sm font-semibold">{cat.title}</p>
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      <style>{`
        /* Mobile menu fade + slide */
        .mobile-menu {
          transition: opacity 0.3s ease, transform 0.3s ease;
          opacity: 0;
          transform: translateY(-10px);
          pointer-events: none;
        }
        .mobile-menu.open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        /* Mobile category dropdown fade + slide */
        .mobile-category-dropdown {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.3s ease, opacity 0.3s ease;
        }
        .mobile-category-dropdown.open {
          max-height: 1000px; /* big enough to show all */
          opacity: 1;
        }

        /* Search input placeholder black */
        input::placeholder {
          color: black;
          opacity: 1;
        }
      `}</style>

      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-300
      bg-white/10 backdrop-blur-md
      ${isScrolled || isMobileMenuOpen ? "shadow-md" : "shadow-none"}

      /* Mobile View */
      sm:top-[10px] sm:mt-[10px]

      /* Tablet View */
      md:top-[14px] md:mt-[8px]

      /* Laptop/Desktop View */
      lg:top-[30px] lg:mt-[0px]
    `}
        style={{
          top: isScrolled || isMobileMenuOpen ? 0 : undefined,
          marginTop: isScrolled || isMobileMenuOpen ? 0 : undefined,
        }}
      >
        {/* Main Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/">
              <div className="relative w-40 h-16 lg:w-52 lg:h-20 ml-[-8px] sm:ml-0 lg:ml-[-40px]">
                <Image
                  src="/MangoLogo.webp"
                  alt="Mango Logo"
                  fill
                  className="object-contain"
                  priority
                  style={{ objectFit: "contain" }}
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center space-x-8 group relative">
              {navData.map((navItem) =>
                navItem.name.toLowerCase() === "categories" ? (
                  <li
                    key={navItem.pk}
                    className="relative group"
                    onMouseEnter={() => setShowMobileDropdown(true)}
                    onMouseLeave={() => setShowMobileDropdown(false)}
                  >
                    <Link
                      href={navItem.link}
                      className={`cursor-pointer font-semibold hover:text-orange-500 ${dynamicTextColor}`}
                    >
                      {navItem.name}
                    </Link>
                    {renderCategoryDropdown()}
                  </li>
                ) : (
                  <li key={navItem.pk}>
                    <Link
                      href={navItem.link}
                      className={`font-semibold hover:text-orange-500 ${dynamicTextColor}`}
                    >
                      {navItem.name}
                    </Link>
                  </li>
                )
              )}
            </ul>

            {/* Desktop Search + Icons (Laptop View Only) - NO Hamburger on lg */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Search */}
              <div className="flex items-center border border-transparent bg-white px-2 py-1 max-w-[280px] flex-shrink-0">
                <Search color="black" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="outline-none border-none text-sm bg-white text-black placeholder-black w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ borderRadius: 0 }}
                />
              </div>

              {/* Icons */}
              <div className="flex items-center space-x-4">
                <CircleUserRound
                  className="cursor-pointer"
                  size={24}
                  color={iconColor}
                />
                <ShoppingBag
                  className="cursor-pointer"
                  size={24}
                  color={iconColor}
                />
              </div>
            </div>

            {/* Tablet View: Search + Icons + Hamburger */}
            <div className="hidden md:flex lg:hidden items-center space-x-4 flex-1 justify-end">
              {/* Search bar with reduced width */}
              <div className="flex items-center border border-transparent bg-white px-2 py-1 max-w-[180px] flex-shrink-0">
                <Search color="black" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="outline-none border-none text-sm bg-white text-black placeholder-black w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ borderRadius: 0 }}
                />
              </div>

              {/* Icons */}
              <div className="flex items-center space-x-4">
                <CircleUserRound
                  className="cursor-pointer"
                  size={24}
                  color={iconColor}
                />
                <ShoppingBag
                  className="cursor-pointer"
                  size={24}
                  color={iconColor}
                />
              </div>

              {/* Hamburger */}
              <button
                className="p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X size={24} color={iconColor} />
                ) : (
                  <Menu size={24} color={iconColor} />
                )}
              </button>
            </div>

            {/* Mobile Search */}
            <div className="flex lg:hidden md:hidden flex-1 mx-4">
              <div className="flex items-center w-full border border-transparent bg-white px-2 py-1">
                <Search color="black" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="outline-none border-none text-sm bg-white text-black placeholder-black w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ borderRadius: 0 }}
                />
              </div>
            </div>

            {/* Mobile Hamburger (hidden on tablet and desktop because handled above) */}
            <button
              className="lg:hidden md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={24} color={iconColor} />
              ) : (
                <Menu size={24} color={iconColor} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu with transition */}
        <div
          className={`lg:hidden fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg shadow-md p-4 space-y-4 max-h-[calc(100vh-96px)] overflow-auto z-50 mobile-menu ${
            isMobileMenuOpen ? "open" : ""
          }`}
          style={{ height: "100vh" }}
        >
          <ul>
            {navData.map((navItem) =>
              navItem.name.toLowerCase() === "categories" ? (
                <li key={navItem.pk}>
                  <button
                    onClick={() => setShowMobileDropdown((prev) => !prev)}
                    className="flex justify-between w-full font-semibold text-black"
                  >
                    {navItem.name}
                    <span>{showMobileDropdown ? "-" : "+"}</span>
                  </button>
                  <div
                    className={`mobile-category-dropdown ${
                      showMobileDropdown ? "open" : ""
                    } mt-2 pl-4 space-y-2`}
                  >
                    {categories.map((cat) => {
                      const imageSrc = cat.image.startsWith("/")
                        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${cat.image}`
                        : cat.image;
                      return (
                        <Link
                          key={cat.id}
                          href={`/category/${cat.id}`}
                          onClick={handleCloseMenu}
                          className="flex items-center gap-3 hover:text-orange-500"
                        >
                          <div className="w-10 h-10 relative">
                            <Image
                              src={imageSrc}
                              alt={cat.title}
                              fill
                              className="rounded-md object-cover"
                            />
                          </div>
                          <p className="text-sm font-semibold text-black">
                            {cat.title}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                </li>
              ) : (
                <li key={navItem.pk}>
                  <Link
                    href={navItem.link}
                    onClick={handleCloseMenu}
                    className="block py-2 font-semibold text-black hover:text-orange-500"
                  >
                    {navItem.name}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Mobile Icons */}
          <div className="flex items-center space-x-6 mt-6 border-t pt-4">
            <CircleUserRound className="cursor-pointer text-black" size={28} />
            <ShoppingBag className="cursor-pointer text-black" size={28} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarClient;
