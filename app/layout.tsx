import { Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Server-side-codes/NavbarServer/Navbar"; // Import server-side Navbar here
import Footer from "@/components/Server-side-codes/Footer/Footer";
import ReduxProviderWrapper from "@/components/ReduxProviderWrapper";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "react-hot-toast";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.variable} antialiased`}>
        <ReduxProviderWrapper>
          <Toaster position="top-right" />
          <Navbar
            headerEndpoint="frontend/headers/"
            categoryEndpoint="frontend/categories/"
          />
          {children}
          <Footer />
        </ReduxProviderWrapper>
      </body>
    </html>
  );
}
