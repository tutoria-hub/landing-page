"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "./components/Header";
import FlashcardStack from "./components/FlashcardStack";

const TYPING_VARIATIONS = [
  "actually works!",
  "really works!",
  "truly works!",
  "just works!",
] as const;

// Wave Divider Component - Geometric sound wave transitions
const WaveDivider = ({
  fromColor = "#FFFFFF",
  toColor = "#FFFFFF"
}: {
  fromColor?: string;
  toColor?: string;
}) => (
  <div className="w-full relative" style={{ backgroundColor: toColor }} aria-hidden="true">
    <svg
      viewBox="0 0 1440 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-[24px]"
      preserveAspectRatio="none"
    >
      {/* Wave path fills with source color, curves down to reveal destination */}
      <path
        d="M0,0 L0,12 Q180,0 360,12 T720,12 T1080,12 T1440,12 L1440,0 Z"
        fill={fromColor}
      />
    </svg>
  </div>
);

export default function Home() {
  const [typedText, setTypedText] = useState("actually works!");
  const [isTypingVisible, setIsTypingVisible] = useState(true);
  const [statMin, setStatMin] = useState(50);
  const [statMax, setStatMax] = useState(50);

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
    console.log('🎯 Stat animation starting...');
    const duration = 800; // 0.8 seconds - much faster
    const targetMin = 50;
    const targetMax = 90;
    const steps = 40;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const animateNumbers = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      // Only animate statMax from 50→90 (statMin stays at 50)
      const newMax = Math.round(50 + (40 * progress));
      console.log(`📊 Step ${currentStep}/${steps}: ${newMax}%`);
      setStatMax(newMax);

      if (currentStep >= steps) {
        console.log('✅ Animation complete: 50-90%');
        clearInterval(animateNumbers);
        setStatMin(50);
        setStatMax(90);
      }
    }, stepDuration);

    return () => {
      console.log('🧹 Cleaning up animation');
      clearInterval(animateNumbers);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section - Editorial Two-Column Layout */}
        <section className="bg-[#F7F5ED]">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-center px-6 lg:px-24 pt-44 pb-16 lg:pt-52 lg:pb-24 max-w-[1440px] mx-auto">
        {/* LEFT COLUMN: Headline + CTA */}
        <div className="max-w-[640px] space-y-12">
          {/* Headline - Clean, Flowing with Color Contrast */}
          <h1 className="font-serif text-[48px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-[-0.02em]">
            <span className="relative inline-block text-[#595959]">
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
              <span className="font-bold text-[#1A1A1A]">truly works!</span>
            </span>
          </h1>

          {/* CTA Section */}
          <div className="space-y-4 relative">
            <p className="font-sans text-[18px] leading-[1.6] text-[#595959] max-w-[560px]">
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
        </div>
      </section>

      {/* Transition Quote - Absolutely centered */}
      <div className="bg-[#F7F5ED]">
        <div className="px-6 pt-16 pb-24 lg:pt-20 lg:pb-32 max-w-[1440px] mx-auto">
        <p className="font-serif text-[32px] lg:text-[48px] leading-[1.3] tracking-[-0.01em] text-[#1A1A1A] text-center max-w-[900px] mx-auto">
          The gift of making reading feel natural.
        </p>
      </div>
      </div>

      <WaveDivider fromColor="#F7F5ED" toColor="#F5FAF7" />

      {/* Video Demo Section - Duolingo-Inspired Placeholder */}
      <section className="bg-[#F5FAF7]">
        <div className="px-6 lg:px-24 pt-16 pb-24 lg:pt-24 lg:pb-24 max-w-[1440px] mx-auto">
        {/* Video Container */}
        <div className="max-w-[896px] mx-auto">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border-[2px] border-[#DCDCDC] bg-white">
            <div className="w-full h-full flex flex-col justify-center items-center bg-white p-8 lg:p-12">
              {/* Play Icon */}
              <div className="mb-6 cursor-pointer">
                <svg className="w-20 h-20 lg:w-24 lg:h-24" viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="40" fill="#30A46C"/>
                  <path d="M32 26L54 40L32 54V26Z" fill="#FFFFFF"/>
                </svg>
              </div>

              {/* Placeholder Text */}
              <p className="font-sans text-[18px] lg:text-[20px] leading-[1.6] text-[#1A1A1A] mb-2 text-center max-w-[480px]">
                Demo video coming soon
              </p>
              <p className="font-sans text-[16px] text-[#595959] text-center">
                Watch how structured phonics transforms reading
              </p>
            </div>
          </div>
        </div>
        </div>
      </section>

      <WaveDivider fromColor="#F5FAF7" toColor="#FFFFFF" />

      {/* Features Section - Two-Column Layout */}
      <section className="notebook-white">
        <div className="px-6 lg:px-24 py-24 lg:py-32 max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
          className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center"
        >
          {/* LEFT COLUMN: Feature List */}
          <div className="order-2 lg:order-1">
            <h2 className="font-serif font-bold text-[32px] md:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-0.01em] text-[#1A1A1A] mb-8 lg:mb-12">
              What We Offer:
            </h2>

            <ul className="space-y-6 lg:space-y-8">
              <li className="flex gap-4">
                <span className="text-[#30A46C] text-[28px] leading-none mt-1 flex-shrink-0">•</span>
                <p className="font-sans text-[18px] lg:text-[20px] leading-[1.6] text-[#1A1A1A]">
                  Built on proven Orton-Gillingham principles
                </p>
              </li>
              <li className="flex gap-4">
                <span className="text-[#30A46C] text-[28px] leading-none mt-1 flex-shrink-0">•</span>
                <p className="font-sans text-[18px] lg:text-[20px] leading-[1.6] text-[#1A1A1A]">
                  tutoria matches your learning pace seamlessly and its intelligence supports you in the right moments
                </p>
              </li>
              <li className="flex gap-4">
                <span className="text-[#30A46C] text-[28px] leading-none mt-1 flex-shrink-0">•</span>
                <p className="font-sans text-[18px] lg:text-[20px] leading-[1.6] text-[#1A1A1A]">
                  Builds confidence through consistent, judgment-free practice
                </p>
              </li>
            </ul>
          </div>

          {/* RIGHT COLUMN: Flashcard Demo */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <FlashcardStack />
          </div>
        </motion.div>
        </div>
      </section>

      <WaveDivider fromColor="#FFFFFF" toColor="#F7F5ED" />

      {/* CTA Section - Centered Conversion Focus */}
      <section className="notebook-beige">
        <div className="px-6 lg:px-24 py-24 lg:py-32 max-w-[1440px] mx-auto">
        <div className="max-w-[800px] mx-auto text-center">
          {/* Section Header */}
          <h2 className="font-serif font-bold text-[32px] md:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-0.01em] text-[#1A1A1A] mb-8 lg:mb-12">
            For Who?
          </h2>

          {/* Body Copy */}
          <div className="space-y-6 mb-12">
            <p className="font-sans text-[18px] lg:text-[20px] leading-[1.6] text-[#1A1A1A]">
              For any child learning to read. For any adult ready to help. Tutoria bridges the gap between wanting to help and knowing how.
            </p>
            <p className="font-sans text-[18px] lg:text-[20px] leading-[1.6] text-[#1A1A1A]">
              Structured phonics intervention was once locked behind specialists and expense. Now it&rsquo;s accessible to anyone ready to support a child&rsquo;s reading journey.
            </p>
          </div>

          {/* Primary CTA Button */}
          <div className="space-y-4 mb-8">
            <a
              href="mailto:waitlist@tutoria.com?subject=Join%20Waitlist&body=I%27d%20like%20to%20join%20the%20Tutoria%20waitlist"
              className="inline-block bg-[#30A46C] hover:bg-[#2A9461] text-white font-sans font-semibold text-[18px] px-12 py-4 rounded-full transition-all duration-150 shadow-[0_6px_0_#2A9461] hover:shadow-[0_2px_0_#2A9461] hover:translate-y-[4px] active:translate-y-[6px] active:shadow-[0_0px_0_#2A9461]"
            >
              Join the Exclusive Waitlist
            </a>
            <p className="font-sans text-[16px] text-[#595959]">
              Get access very soon
            </p>
          </div>

          {/* Secondary CTA Link */}
          <a
            href="mailto:demo@tutoria.com?subject=Demo%20Request&body=I%27d%20like%20to%20request%20a%20demo%20for%20my%20institution"
            className="inline-block font-sans text-[16px] text-[#30A46C] hover:text-[#2A9461] underline underline-offset-4 transition-colors duration-150"
          >
            Request a demo for your institution
          </a>
        </div>
        </div>
      </section>

      <WaveDivider fromColor="#F7F5ED" toColor="#F5FAF7" />

      {/* Science Section - Research Credibility */}
      <section className="bg-[#F5FAF7]">
        <div className="px-6 lg:px-24 py-24 lg:py-32 max-w-[1440px] mx-auto">
        <div className="max-w-[900px] mx-auto text-center">
          {/* Body Copy - Research Focus */}
          <div className="space-y-6">
            <p className="font-sans text-[18px] lg:text-[20px] leading-[1.6] text-[#1A1A1A]">
              Young brains are remarkably adaptable. Research shows that structured phonics intervention <strong className="font-semibold text-[#30A46C]">literally rewires the brain</strong>&mdash;changes are seen within weeks, and 50-90% can reach grade-level when support arrives during the years of high brain plasticity.
            </p>
            <p className="font-sans text-[18px] lg:text-[20px] leading-[1.6] text-[#1A1A1A]">
              tutoria makes expert phonics intervention universally accessible, adapts to each learner&rsquo;s unique pace and needs, and makes it simple for any parent to help, regardless of their own reading background.
            </p>
          </div>
        </div>
        </div>
      </section>

      <WaveDivider fromColor="#F5FAF7" toColor="#FFFFFF" />

      {/* Testimonials Section - Editorial Asymmetric Grid */}
      <section className="bg-white">
        <div className="px-6 lg:px-24 py-24 lg:py-32 max-w-[1440px] mx-auto">
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
        </div>
      </section>

      <WaveDivider fromColor="#FFFFFF" toColor="#F7F5ED" />

      {/* Founder Section - Personal Connection */}
      <section className="bg-[#F7F5ED]">
        <div className="px-6 lg:px-24 py-24 lg:py-32 max-w-[1440px] mx-auto">
        <div className="max-w-[800px] mx-auto text-center">
          {/* Section Header */}
          <h2 className="font-serif font-bold text-[32px] md:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-0.01em] text-[#1A1A1A] mb-12 lg:mb-16">
            The great minds behind Tutoria
          </h2>

          {/* Founder Grid - Placeholder */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 mb-8">
            {/* Founder 1 - Placeholder */}
            <div className="flex flex-col items-center">
              <div className="w-[160px] h-[160px] rounded-full border-2 border-[#30A46C] bg-[#30A46C] flex items-center justify-center mb-4">
                <span className="font-sans font-bold text-[48px] text-white">FH</span>
              </div>
              <h3 className="font-sans font-bold text-[20px] lg:text-[24px] text-[#1A1A1A] mb-1">
                Founder Name
              </h3>
              <p className="font-sans text-[16px] text-[#595959]">
                Co-founder &amp; CEO
              </p>
            </div>

            {/* Founder 2 - Placeholder */}
            <div className="flex flex-col items-center">
              <div className="w-[160px] h-[160px] rounded-full border-2 border-[#30A46C] bg-[#30A46C] flex items-center justify-center mb-4">
                <span className="font-sans font-bold text-[48px] text-white">TBD</span>
              </div>
              <h3 className="font-sans font-bold text-[20px] lg:text-[24px] text-[#1A1A1A] mb-1">
                Founder Name
              </h3>
              <p className="font-sans text-[16px] text-[#595959]">
                Co-founder &amp; CTO
              </p>
            </div>
          </div>

          {/* Founder Story One-Liner */}
          <p className="font-serif italic text-[18px] lg:text-[20px] leading-[1.6] text-[#595959] max-w-[700px] mx-auto">
            &ldquo;Your dyslexia story one-liner goes here&rdquo;
          </p>
        </div>
        </div>
      </section>
      </main>
    </>
  );
}
