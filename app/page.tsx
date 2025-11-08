"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const TYPING_VARIATIONS = [
  "actually works!",
  "really works!",
  "truly works!",
  "just works!",
] as const;

export default function Home() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [typedText, setTypedText] = useState("actually works!");
  const [isTypingVisible, setIsTypingVisible] = useState(true);
  const [statMin, setStatMin] = useState(0);
  const [statMax, setStatMax] = useState(0);

  useEffect(() => {
    let currentIndex = 0;

    const typeText = () => {
      const text = TYPING_VARIATIONS[currentIndex];
      let charIndex = 0;

      // Fade out current text
      setIsTypingVisible(false);

      setTimeout(() => {
        // Start typing new text (don't clear - swap directly)
        charIndex = 0;
        setIsTypingVisible(true);

        // Type out character by character
        const typeInterval = setInterval(() => {
          if (charIndex <= text.length) {
            setTypedText(text.substring(0, charIndex));
            charIndex++;
          } else {
            clearInterval(typeInterval);

            // Wait 10 seconds before starting next variation
            setTimeout(() => {
              currentIndex = (currentIndex + 1) % TYPING_VARIATIONS.length;
              typeText();
            }, 10000);
          }
        }, 100);
      }, 600); // Wait for fade out to complete
    };

    // Start typing animation
    typeText();
  }, []);

  useEffect(() => {
    // Animate stat numbers on load
    const duration = 800; // 0.8 seconds - much faster
    const targetMin = 50;
    const targetMax = 90;
    const steps = 40;
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
    const scrollInterval = setInterval(animateIndicator, 15000);

    // Hide on scroll
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(animateNumbers);
      clearInterval(scrollInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Editorial Two-Column Layout */}
      <section className="relative min-h-[85vh] lg:min-h-[75vh] bg-[#F7F5ED] grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-center px-6 lg:px-24 pt-24 pb-0 lg:pt-32 lg:pb-0 max-w-[1440px] mx-auto">
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
            </span>
            <br />
            <span className="inline-block min-w-[320px]">
              <em className="italic font-bold text-[#1A1A1A]">truly works!</em>
            </span>
          </h1>

          {/* CTA Section */}
          <div className="space-y-4 relative">
            <p className="font-sans text-[18px] leading-[1.5] text-[#595959] max-w-[560px]">
              Designed for struggling readers.
            </p>
            <button className="bg-[#30A46C] hover:bg-[#2A9461] text-white font-sans font-semibold text-[18px] px-12 py-4 rounded-full transition-all duration-150 shadow-[0_6px_0_#2A9461] hover:shadow-[0_2px_0_#2A9461] hover:translate-y-[4px] active:translate-y-[6px] active:shadow-[0_0px_0_#2A9461]">
              Join the Waitlist
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Harvard Stat Card */}
        <div className="max-w-full lg:max-w-[480px] lg:justify-self-end">
          <div className="relative border-[3px] border-[#30A46C] bg-white p-6 lg:p-8 rounded-lg shadow-[0_4px_0_#DCDCDC]">
            {/* Stat Number - Sans-serif with curvy GREEN underline */}
            <div className="mb-5 relative">
              {/* Harvard Logo - Aligned right with stat */}
              <div className="absolute top-[-10px] right-0 lg:top-[-12px]">
                <Image
                  src="/assets/harvard-logo-grey.png"
                  alt="Harvard Medical School"
                  width={200}
                  height={80}
                  className="h-16 lg:h-20 w-auto grayscale opacity-90"
                  priority
                />
              </div>
              <p className="font-sans font-bold text-[44px] lg:text-[56px] leading-none text-[#30A46C] relative inline-block pb-3">
                {statMin}-{statMax}%
              </p>
              <svg className="absolute left-0 bottom-0 w-[160px] lg:w-[220px] pointer-events-none" viewBox="0 0 220 16" style={{height: '16px'}}>
                <path
                  d="M 5 10 Q 55 5, 110 10 T 215 10"
                  stroke="#30A46C"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Stat Text - Italic with quotes, larger size */}
            <p className="font-serif italic text-[26px] lg:text-[30px] leading-[1.5] text-[#1A1A1A] max-w-[420px]">
              &ldquo;of at-risk readers <span className="not-italic font-semibold text-[#30A46C]">reach grade level</span> with targeted instruction&rdquo;
            </p>
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

      {/* Transition Quote - Absolutely centered */}
      <div className="bg-[#F7F5ED] px-6 pt-0 pb-8 lg:pt-0 lg:pb-12 max-w-[1440px] mx-auto">
        <p className="font-serif italic font-medium text-[32px] lg:text-[48px] leading-[1.3] tracking-[-0.01em] text-[#1A1A1A] text-center max-w-[900px] mx-auto">
          The gift of making reading feel natural.
        </p>
      </div>

      {/* Video Demo Section - Placeholder State */}
      <section className="bg-[#F7F5ED] px-6 lg:px-24 pt-6 pb-24 lg:pt-8 lg:pb-32 max-w-[1440px] mx-auto">
        <div className="max-w-[1120px] mx-auto text-center">
          {/* Video Container - Placeholder */}
          <div className="relative w-full max-w-[896px] mx-auto aspect-video rounded-2xl lg:rounded-[16px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.12)] bg-white">
            <div className="w-full h-full flex flex-col justify-center items-center bg-gradient-to-br from-[#F7F5ED] to-white p-8 lg:p-12">
              {/* Play Icon */}
              <svg className="w-16 h-16 lg:w-20 lg:h-20 mb-6 opacity-90 transition-all duration-200 hover:opacity-100 hover:scale-110" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="40" fill="#30A46C"/>
                <path d="M32 26L54 40L32 54V26Z" fill="#FFFFFF"/>
              </svg>

              {/* Placeholder Text */}
              <p className="font-serif text-[20px] lg:text-[24px] font-bold text-[#1A1A1A] mb-2">
                Demo Video Coming Soon
              </p>
              <p className="font-sans text-[14px] lg:text-[16px] text-[#595959]">
                We&rsquo;re creating an amazing product demo
              </p>
            </div>
          </div>
        </div>
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
