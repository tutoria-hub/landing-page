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

    // Initial animation - delay to let user read content first
    setTimeout(animateIndicator, 2000);

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
      <section className="relative min-h-screen bg-[#F7F5ED] grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center px-6 lg:px-24 py-24 lg:py-32 max-w-[1440px] mx-auto">

{/* LEFT COLUMN: Label + Headline + Body Copy */}
        <div className="max-w-[600px] space-y-8">
          {/* Product Label */}
          <p className="text-[14px] font-sans font-semibold tracking-[0.1em] uppercase text-[#595959]">
            Built For Struggling Readers
          </p>

          {/* Headline - Single Weight + Italic Emphasis */}
          <h1 className="font-serif text-[40px] md:text-[56px] lg:text-[72px] leading-[1.1] tracking-[-0.01em] text-[#1A1A1A]">
            <div className="relative inline-block">
              Structured Phonics
              <svg className="absolute left-0 top-full w-full h-6 pointer-events-none" viewBox="0 0 200 12" style={{height: '12px', marginTop: '4px'}}>
                <path
                  d="M 0 8 Q 50 2, 100 8 T 200 8"
                  stroke="#2563EB"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div><em className="italic">that </em><strong className="font-bold italic">just works!</strong></div>
          </h1>

          {/* CTA Button */}
          <div className="mt-8">
            <button className="bg-[#30A46C] hover:bg-[#2A9461] text-white font-sans font-semibold text-[18px] px-12 py-4 rounded-full transition-all duration-200 hover:scale-105 shadow-[0_8px_0_#2A9461] hover:shadow-[0_12px_0_#2A9461]">
              Join the Waitlist
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Harvard Stat (No Card) */}
        <div className="max-w-full lg:max-w-[480px] lg:justify-self-end space-y-8">
          {/* Stat Number with Green Underline */}
          <div className="inline-block relative pb-3">
            <p className="font-serif font-bold text-[80px] leading-none text-[#1A1A1A]">
              50-90%
            </p>
            {/* Underline positioned below text with gap */}
            <div className="absolute bottom-0 left-[-8px] right-[-8px] h-[5px] bg-[#30A46C] rounded-full"></div>
          </div>

          {/* Stat Text */}
          <p className="font-sans text-[20px] leading-[1.6] text-[#1A1A1A]">
            of at-risk readers can reach grade level with targeted instruction
          </p>

          {/* Harvard Logo - Prominent */}
          <div className="flex">
            <Image
              src="/assets/harvard-logo-grey.png"
              alt="Harvard Medical School"
              width={240}
              height={80}
              className="h-20 md:h-28 w-auto grayscale opacity-80"
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
