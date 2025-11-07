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
        {/* LEFT COLUMN: Label + Headline + CTA */}
        <div className="max-w-[600px] space-y-8">
          {/* Product Label */}
          <p className="text-[14px] font-sans font-semibold tracking-[0.1em] uppercase text-[#595959]">
            Built For Struggling Readers
          </p>

          {/* Headline - Single Weight + Italic Emphasis */}
          <h1 className="font-serif text-[40px] md:text-[56px] lg:text-[72px] leading-[1.1] tracking-[-0.01em] text-[#1A1A1A]">
            <span className="relative inline-block">
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
            </span>
            <br />
            <em className="italic">that </em><strong className="font-bold italic">just works!</strong>
          </h1>

          {/* CTA Button */}
          <div className="mt-8">
            <button className="bg-[#30A46C] hover:bg-[#2A9461] text-white font-sans font-semibold text-[18px] px-12 py-4 rounded-full transition-all duration-200 hover:scale-105 shadow-[0_8px_0_#2A9461] hover:shadow-[0_12px_0_#2A9461]">
              Join the Waitlist
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Harvard Stat Card */}
        <div className="max-w-full lg:max-w-[480px] lg:justify-self-end">
          <div className="border-2 border-[#30A46C] bg-white p-8 lg:p-10 rounded-lg">
            {/* Stat Number */}
            <p className="font-serif font-bold text-[64px] lg:text-[80px] leading-none text-[#1A1A1A] mb-6">
              50-90%
            </p>

            {/* Stat Text */}
            <p className="font-sans text-[18px] lg:text-[20px] leading-[1.6] text-[#1A1A1A] mb-6">
              of at-risk readers can reach grade level with targeted instruction
            </p>

            {/* Harvard Logo */}
            <Image
              src="/assets/harvard-logo-grey.png"
              alt="Harvard Medical School"
              width={240}
              height={80}
              className="h-16 lg:h-20 w-auto grayscale opacity-80"
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

      {/* Testimonials Section - Editorial Asymmetric Grid */}
      <section className="bg-[#F7F5ED] px-6 lg:px-24 py-24 lg:py-32 max-w-[1440px] mx-auto">
        {/* Section Header */}
        <h2 className="font-serif font-bold text-[40px] md:text-[48px] leading-[1.2] tracking-[-0.01em] text-[#1A1A1A] text-center mb-16">
          What Parents Are Saying
        </h2>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12">
          {/* FEATURED TESTIMONIAL - LEFT */}
          <div className="border-2 border-[#30A46C] bg-white p-12 rounded-lg">
            <blockquote className="font-serif text-[28px] leading-[1.4] text-[#1A1A1A] mb-12">
              &ldquo;My son kept saying he couldn&rsquo;t read. After two months, he&rsquo;s <span className="text-[#30A46C]">asking to practice reading</span> on his own. It&rsquo;s like a switch flipped.&rdquo;
            </blockquote>

            <div>
              <p className="font-sans font-semibold text-[18px] text-[#1A1A1A]">
                Sarah Martinez
              </p>
              <p className="font-sans text-[16px] text-[#595959] mb-3">
                Parent, 3rd grade student
              </p>
              <p className="font-sans font-semibold text-[14px] uppercase tracking-[0.05em] text-[#30A46C]">
                Improved 2 grade levels in 4 months
              </p>
            </div>
          </div>

          {/* SUPPORTING TESTIMONIALS - RIGHT STACK */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* SUPPORTING TESTIMONIAL 1 */}
            <div className="border-2 border-[#DCDCDC] bg-white p-8 rounded-lg">
              <blockquote className="font-serif text-[20px] leading-[1.4] text-[#1A1A1A] mb-8">
                &ldquo;We tried three tutors. This system finally cracked the code for our daughter.&rdquo;
              </blockquote>

              <div>
                <p className="font-sans font-semibold text-[18px] text-[#1A1A1A]">
                  James Chen
                </p>
                <p className="font-sans text-[16px] text-[#595959] mb-3">
                  Parent, 2nd grade student
                </p>
                <p className="font-sans font-semibold text-[14px] uppercase tracking-[0.05em] text-[#30A46C]">
                  Reading fluency increased 3x in 6 weeks
                </p>
              </div>
            </div>

            {/* SUPPORTING TESTIMONIAL 2 */}
            <div className="border-2 border-[#DCDCDC] bg-white p-8 rounded-lg">
              <blockquote className="font-serif text-[20px] leading-[1.4] text-[#1A1A1A] mb-8">
                &ldquo;The teacher noticed the difference immediately. He&rsquo;s more confident now.&rdquo;
              </blockquote>

              <div>
                <p className="font-sans font-semibold text-[18px] text-[#1A1A1A]">
                  Lisa Anderson
                </p>
                <p className="font-sans text-[16px] text-[#595959] mb-3">
                  School Reading Specialist
                </p>
                <p className="font-sans font-semibold text-[14px] uppercase tracking-[0.05em] text-[#30A46C]">
                  From below grade level to proficient
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
