// app/page.tsx

import LandingN from "@/src/component/LandingN";
import Landing from "@/src/component/LandingPage";
// import Navbar from "@/src/component/Navbar"; // <-- 1. Remove this import

export const metadata = {
  title: "Asha Modern School",
  description: "Saharanpur Most Trusted School Asha Modern School",
};

export default function Home() {
  return (
    <div>
      {/* <Navbar /> */} {/* <-- 2. Remove this line */}
      <Landing />
      <LandingN />
    </div>
  );
}
