import Image from "next/image";
import React from "react";

const LandingN = () => {
  return (
    <main className="relative h-screen p-[7vw] flex items-center">
      {/* IMAGE WRAPPER */}
      <div className="relative w-[60%] h-full">
        {/* Image 1 */}
        <Image
          src="/Black-Prince-scaled.jpg"
          width={280}
          height={380}
          alt="student Image"
          className="absolute top-10 left-8 rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        />

        {/* Image 2 */}
        <Image
          src="/IT-Wizards-scaled.jpg"
          width={260}
          height={760}
          alt="student Image"
          className="absolute top-20 left-88 rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        />

        {/* Image 3 */}
        <Image
          src="/Blue-Moon-scaled.jpg"
          width={320}
          height={360}
          alt="student Image"
          className="absolute top-70 left-18 rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        />

        {/* Small Circle Image */}
        <Image
          src="/main.jpg"
          width={300}
          height={300}
          alt="student Image"
          className="absolute top-90 left-[25rem]  shadow-md transition-transform duration-300 hover:scale-110 hover:shadow-xl"
        />
      </div>

      {/* TEXT SECTION */}
      <aside className="absolute right-10 max-w-md">
        <h1 className="font-bold text-2xl text-gray-800 mb-3">
          To Grow in Grace and Wisdom
        </h1>

        <p className="font-medium text-gray-700 hover:text-gray-900">
          The Summit Country Day School is a Catholic and Independent school
          minutes from downtown Cincinnati. Affiliated with The Sisters of Notre
          Dame de Namur, we offer a coeducational experience for students from
          18 months through grade 12. Our mission is to educate leaders of
          character across five pillars – spiritually, academically, physically,
          socially and artistically.
        </p>
      </aside>
    </main>
  );
};

export default LandingN;
