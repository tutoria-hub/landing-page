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
      <section className="relative min-h-screen bg-[#F7F5ED] grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center px-6 lg:px-24 py-24 lg:py-32 max-w-[1440px] mx-auto">
        {/* LEFT COLUMN: Headline + CTA */}
        <div className="max-w-[640px] space-y-12">
          {/* Headline - Clean, Flowing */}
          <h1 className="font-serif text-[48px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-[-0.02em] text-[#1A1A1A]">
            <span className="relative inline-block">
              <span className="relative z-[2]">Structured phonics</span>
              <svg className="absolute left-0 top-full w-full pointer-events-none z-[1]" viewBox="0 0 400 20" preserveAspectRatio="none" style={{height: '16px', marginTop: '-6px'}}>
                <path
                  d="M 5 12 Q 100 5, 200 12 T 395 12"
                  stroke="#30A46C"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            <em className="italic font-bold text-[#30A46C]">actually works!</em>
          </h1>

          {/* CTA Section */}
          <div className="space-y-4 relative">
            <p className="font-sans text-[16px] text-[#595959]">
              Help your child learn to read
            </p>
            <div className="relative inline-block">
              <button className="bg-[#30A46C] hover:bg-[#2A9461] text-white font-sans font-semibold text-[18px] px-12 py-4 rounded-full transition-all duration-150 shadow-[0_6px_0_#2A9461] hover:shadow-[0_2px_0_#2A9461] hover:translate-y-[4px] active:translate-y-[6px] active:shadow-[0_0px_0_#2A9461]">
                Join the Waitlist
              </button>

              {/* Hand-drawn curved arrow pointing from right */}
              <svg
                className="absolute -right-32 top-0 w-28 h-24 pointer-events-none hidden lg:block"
                viewBox="0 0 120 100"
                fill="none"
              >
                {/* Curved arrow path */}
                <path
                  d="M 110 15 Q 90 20, 75 30 T 45 50 Q 30 60, 20 75"
                  stroke="#1A1A1A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Arrowhead */}
                <path
                  d="M 20 75 L 15 68 M 20 75 L 28 73"
                  stroke="#1A1A1A"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Harvard Stat Card */}
        <div className="max-w-full lg:max-w-[480px] lg:justify-self-end">
          <div className="border-[3px] border-[#30A46C] bg-white p-8 lg:p-10 rounded-lg shadow-[0_4px_0_#DCDCDC]">
            {/* Stat Number - Sans-serif with curvy blue underline */}
            <div className="mb-6 relative">
              <p className="font-sans font-bold text-[56px] lg:text-[72px] leading-none text-[#30A46C] relative inline-block pb-3">
                50-90%
              </p>
              <svg className="absolute left-0 bottom-0 w-[200px] lg:w-[280px] pointer-events-none" viewBox="0 0 280 16" style={{height: '16px'}}>
                <path
                  d="M 5 10 Q 70 4, 140 10 T 275 10"
                  stroke="#2563EB"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Stat Text - Larger, Italic with quotes */}
            <p className="font-serif italic text-[24px] lg:text-[28px] leading-[1.4] text-[#1A1A1A] mb-6 max-w-[420px]">
              &ldquo;of at-risk readers <span className="not-italic font-semibold text-[#30A46C]">reach grade level</span> with targeted instruction&rdquo;
            </p>

            {/* Harvard Logo - Better scaled */}
            <Image
              src="/assets/harvard-logo-grey.png"
              alt="Harvard Medical School"
              width={200}
              height={70}
              className="h-14 lg:h-16 w-auto grayscale opacity-75"
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
