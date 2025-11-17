// src/component/Navbar.tsx

"use client"; // <-- 1. Required to use hooks like usePathname

import Image from "next/image";
import { usePathname } from "next/navigation"; // <-- 2. Import the hook

export default function Navbar() {
  const pathname = usePathname(); // <-- 3. Get the current URL path
  const isHomepage = pathname === "/"; // <-- 4. Check if we are on the homepage

  // Data from your original code (no change)
  const itemsL = [
    { name: "Academics", href: "/news" },
    { name: "Login", href: "/news" },
    { name: "Ebooks", href: "/news" },
  ];

  const itemsR = [
    { name: "Facilities", href: "/facilite" },
    { name: "Contact", href: "/contact" },
    { name: "login", href: "/login" },
  ];

  const main = [
    { name: "ACADEMIC", href: "/about" },
    { name: "ABOUT", href: "/about" },
    { name: "ADMISSION", href: "/about" },
    { name: "PROGRAMS", href: "/about" },
    { name: "ATHLETIC", href: "/about" },
    { name: "GIVING", href: "/about" },
  ];

  const mainLeft = main.slice(0, 3);
  const mainRight = main.slice(3, 6);

  return (
    // 5. Main container now changes position based on page
    <nav
      className={`w-full ${
        isHomepage ? "absolute top-0 z-50" : "relative bg-white shadow-md"
      }`}
    >
      {/* Top Bar: Uses itemsL and itemsR */}
      {/* 6. Top bar background changes */}
      <section
        className={`h-10 ${
          isHomepage ? "bg-gray-800" : "bg-gray-800"
        } text-gray-300`}
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          {/* Left Top Links */}
          <aside className="flex items-center space-x-6">
            {itemsL.map((item, index) => (
              <a
                key={index}
                href={item.href}
                // 7. Text color changes to be visible on the video
                className={`text-sm ${
                  isHomepage ? "text-white" : "text-gray-300"
                } hover:text-white transition-colors`}
              >
                {item.name}
              </a>
            ))}
          </aside>

          {/* Right Top Links */}
          <aside className="flex items-center space-x-6">
            {itemsR.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`text-sm ${
                  isHomepage ? "text-white" : "text-gray-300"
                } hover:text-white transition-colors`}
              >
                {item.name}
              </a>
            ))}
          </aside>
        </div>
      </section>

      {/* Main Navigation: Uses main items and logo */}
      {/* 8. Main nav section background also changes */}
      <section className={`h-24 ${isHomepage ? "bg-transparent" : "bg-white"}`}>
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          {/* Left Main Links */}
          <aside className="flex items-center space-x-8">
            {mainLeft.map((item, index) => (
              <a
                key={index}
                href={item.href}
                // 9. Main link text color changes
                className={`font-semibold ${
                  isHomepage
                    ? "text-white hover:text-gray-200"
                    : "text-gray-700 hover:text-gray-900"
                } transition-colors`}
              >
                {item.name}
              </a>
            ))}
          </aside>

          {/* Logo Section: Uses your logo and school name */}
          {/* 10. Logo background and text color change */}
          <div
            className={`flex flex-col items-center justify-center w-70 h-50 ${
              isHomepage ? "bg-white" : "bg-white"
            }`}
          >
            <Image
              src="/asha.png"
              alt="Asha Modern School Logo"
              width={120}
              height={300}
              className="object-contain"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/110x110/666/fff?text=LOGO";
              }}
            />
            <h1
              className={`font-bold text-lg ${
                isHomepage ? "text-gray-800" : "text-gray-800"
              }`}
            >
              Asha Modern School
            </h1>
          </div>

          {/* Right Main Links */}
          <aside className="flex items-center space-x-8">
            {mainRight.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`font-semibold ${
                  isHomepage
                    ? "text-white hover:text-gray-200"
                    : "text-gray-700 hover:text-gray-900"
                } transition-colors`}
              >
                {item.name}
              </a>
            ))}
          </aside>
        </div>
      </section>
    </nav>
  );
}
