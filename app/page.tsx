"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    // Trigger scroll indicator animation on load
    const animateIndicator = () => {
      const indicator = document.querySelector('.scroll-indicator');
      if (indicator) {
        indicator.classList.add('animate');
        setTimeout(() => indicator.classList.remove('animate'), 1000);
      }
    };

    // Initial animation
    setTimeout(animateIndicator, 500);

    // Repeat every 15 seconds
    const interval = setInterval(animateIndicator, 15000);

    // Hide on scroll
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Two Column Editorial Layout */}
      <section className="relative min-h-screen grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-24 items-center px-6 lg:px-24 py-12 max-w-[1440px] mx-auto">

        {/* LEFT COLUMN: Headline */}
        <div className="max-w-[600px]">
          <h1 className="font-serif font-bold text-[40px] md:text-[48px] lg:text-[72px] leading-[1.1] tracking-[-0.01em] text-[#1A1A1A]">
            Structured phonics that just works!
          </h1>
        </div>

        {/* RIGHT COLUMN: Harvard Stat (No Card) */}
        <div className="max-w-full lg:max-w-[480px] lg:justify-self-end space-y-8">
          {/* Stat Number with Green Underline */}
          <div className="inline-block">
            <p className="font-serif font-bold text-[64px] md:text-[72px] leading-none text-[#1A1A1A] mb-2">
              50-90%
            </p>
            <div className="h-1 bg-[#30A46C] w-full"></div>
          </div>

          {/* Stat Text */}
          <p className="font-sans text-[20px] leading-[1.6] text-[#1A1A1A]">
            of at-risk readers can reach grade level with targeted instruction
          </p>

          {/* Harvard Logo - Larger */}
          <div className="flex">
            <Image
              src="/assets/harvard-logo-grey.png"
              alt="Harvard Medical School"
              width={200}
              height={64}
              className="h-12 md:h-16 w-auto grayscale opacity-70"
              priority
            />
          </div>
        </div>

        {/* Scroll Indicator - Absolutely Centered */}
        {showScrollIndicator && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 scroll-indicator" aria-label="Scroll to continue">
            <svg
              className="chevron w-6 h-6 mx-auto"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="#595959"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
      </section>

      {/* Placeholder for next sections */}
      <section className="min-h-screen bg-[#F7F5ED] flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif font-bold text-4xl text-[#1A1A1A] mb-4">
            Next Section Coming Soon
          </h2>
          <p className="font-sans text-lg text-[#595959]">
            Video demo, features, CTA, science, and founder sections will be added here
          </p>
        </div>
      </section>
    </main>
  );
}
