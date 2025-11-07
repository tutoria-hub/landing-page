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
      {/* Hero Section - Editorial Two-Column Layout */}
      <section className="relative min-h-screen bg-[#F7F5ED] grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-24 items-center px-6 lg:px-24 py-24 lg:py-32 max-w-[1440px] mx-auto">

        {/* LEFT COLUMN: Mixed-Weight Headline */}
        <div className="max-w-[600px]">
          <h1 className="font-serif leading-[1.1] tracking-[-0.01em]">
            <span className="block text-[40px] md:text-[48px] lg:text-[72px] font-normal text-[#666666]">
              Structured phonics
            </span>
            <span className="block text-[36px] md:text-[42px] lg:text-[56px] italic font-normal text-[#1A1A1A]">
              that just
            </span>
            <span className="block text-[40px] md:text-[48px] lg:text-[72px] font-bold text-[#1A1A1A]">
              works!
            </span>
          </h1>
        </div>

        {/* RIGHT COLUMN: Harvard Stat (No Card) */}
        <div className="max-w-full lg:max-w-[480px] lg:justify-self-end space-y-8">
          {/* Stat Number with Green Underline */}
          <div className="inline-block relative pb-3">
            <p className="font-serif font-bold text-[64px] leading-none text-[#1A1A1A]">
              50-90%
            </p>
            {/* Underline positioned below text with gap */}
            <div className="absolute bottom-0 left-[-8px] right-[-8px] h-[5px] bg-[#30A46C] rounded-full"></div>
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

      {/* Green Curve Divider */}
      <div className="flex justify-center py-16 bg-white">
        <svg width="60%" height="120" viewBox="0 0 800 120" className="max-w-[600px]">
          <path
            d="M 0 60 Q 200 20, 400 60 T 800 60"
            stroke="#30A46C"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

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
