"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [typedText, setTypedText] = useState("actually works!");
  const [statMin, setStatMin] = useState(0);
  const [statMax, setStatMax] = useState(0);

  const variations = [
    "actually works!",
    "really works!",
    "truly works!",
    "just works!",
  ];

  useEffect(() => {
    let currentIndex = 0;

    const typeText = () => {
      const text = variations[currentIndex];
      let charIndex = 0;

      // Clear current text
      setTypedText("");

      // Type out character by character
      const typeInterval = setInterval(() => {
        if (charIndex <= text.length) {
          setTypedText(text.substring(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);

          // Wait 2 seconds before starting next variation
          setTimeout(() => {
            currentIndex = (currentIndex + 1) % variations.length;
            typeText();
          }, 2000);
        }
      }, 100);
    };

    // Start typing animation
    typeText();
  }, []);

  useEffect(() => {
    // Animate stat numbers on load
    const duration = 2000; // 2 seconds
    const targetMin = 50;
    const targetMax = 90;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const animateNumbers = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setStatMin(Math.round(targetMin * progress));
      setStatMax(Math.round(targetMax * progress));

      if (currentStep >= steps) {
        clearInterval(animateNumbers);
        setStatMin(targetMin);
        setStatMax(targetMax);
      }
    }, stepDuration);

    return () => clearInterval(animateNumbers);
  }, []);

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
              <svg className="absolute left-0 top-full w-full pointer-events-none z-[1]" viewBox="0 0 400 20" preserveAspectRatio="none" style={{height: '20px', marginTop: '-8px'}}>
                <path
                  d="M 5 12 Q 100 5, 200 12 T 395 12"
                  stroke="#30A46C"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            <em className="italic font-bold text-[#1A1A1A]">
              {typedText}
              <span className="animate-pulse">|</span>
            </em>
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

              {/* Simple hand-drawn arrow */}
              <svg
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-16 h-12 pointer-events-none hidden lg:block"
                viewBox="0 0 64 48"
                fill="none"
              >
                <path
                  d="M 32 4 L 32 36"
                  stroke="#1A1A1A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 24 28 L 32 36 L 40 28"
                  stroke="#1A1A1A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Harvard Stat Card */}
        <div className="max-w-full lg:max-w-[480px] lg:justify-self-end">
          <div className="border-[3px] border-[#30A46C] bg-white p-6 lg:p-8 rounded-lg shadow-[0_4px_0_#DCDCDC]">
            {/* Stat Number - Sans-serif with curvy GREEN underline */}
            <div className="mb-5 relative">
              <p className="font-sans font-bold text-[56px] lg:text-[72px] leading-none text-[#30A46C] relative inline-block pb-3">
                {statMin}-{statMax}%
              </p>
              <svg className="absolute left-0 bottom-0 w-[200px] lg:w-[280px] pointer-events-none" viewBox="0 0 280 20" style={{height: '20px'}}>
                <path
                  d="M 5 12 Q 70 6, 140 12 T 275 12"
                  stroke="#30A46C"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Stat Text - Italic with quotes, larger size */}
            <p className="font-serif italic text-[26px] lg:text-[30px] leading-[1.4] text-[#1A1A1A] mb-5 max-w-[420px]">
              &ldquo;of at-risk readers <span className="not-italic font-semibold text-[#30A46C]">reach grade level</span> with targeted instruction&rdquo;
            </p>

            {/* Harvard Logo - Centered */}
            <div className="flex justify-center">
              <Image
                src="/assets/harvard-logo-grey.png"
                alt="Harvard Medical School"
                width={280}
                height={100}
                className="h-20 lg:h-24 w-auto grayscale opacity-75"
                priority
              />
            </div>
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
