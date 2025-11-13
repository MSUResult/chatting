"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

export default function AuthContainer() {
  const [isSignup, setIsSignup] = useState(true);
  const audioRef = useRef(null);

  const containerVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((err) => console.log("Audio play blocked:", err));

      // Stop audio after 10 seconds
      const timer = setTimeout(() => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }, 2000); // 10000ms = 10 seconds

      // Cleanup if component unmounts before 10s
      return () => clearTimeout(timer);
    }
  }, [isSignup]);

  return (
    <main className="h-screen flex">
      {/* Hidden Audio */}
      <audio
        ref={audioRef}
        src="/mose.mp3"
        preload="auto"
        style={{ display: "none" }}
      />

      {/* Left Section */}
      <section className="w-1/2 bg-[#43334C] flex items-center justify-center text-white">
        <h1 className="text-4xl font-bold">
          {isSignup ? "Welcome to Signup" : "Welcome Back!"}
        </h1>
      </section>

      {/* Right Section */}
      <section className="w-1/2 flex items-center justify-center bg-[#776483]">
        <AnimatePresence mode="wait">
          {isSignup ? (
            <motion.div
              key="signup"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="w-full max-w-md p-8"
            >
              <SignupForm onSwitch={() => setIsSignup(false)} />
            </motion.div>
          ) : (
            <motion.div
              key="login"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="w-full max-w-md p-8"
            >
              <LoginForm onSwitch={() => setIsSignup(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
