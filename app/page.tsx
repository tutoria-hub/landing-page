"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "./components/Header";
import FlashcardStack from "./components/FlashcardStack";
import VideoPlayer from "./components/VideoPlayer";
import WaitlistForm from "./components/WaitlistForm";
import DemoModal from "./components/DemoModal";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShinyButton } from "@/components/ui/shiny-button";
import { Highlighter } from "@/components/ui/highlighter";

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
  const [statMin, setStatMin] = useState(50);
  const [statMax, setStatMax] = useState(50);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const scrollToWaitlist = () => {
    const section = document.getElementById("for-who");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    // Animate stat numbers on load
    console.log('🎯 Stat animation starting...');
    const duration = 800; // 0.8 seconds - much faster
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
          {/* Headline - Two-line layout with varying sizes */}
          <h1 className="font-serif leading-[1.05] tracking-[-0.02em]">
            {/* Line 1: natural reading - big (natural italic + green, reading regular) */}
            <div className="relative inline-block text-[48px] md:text-[64px] lg:text-[80px] whitespace-nowrap">
              <span className="relative z-[2]">
                <span className="italic text-[#1A1A1A]">Learn to</span>{" "}
                <span className="text-[#30A46C]">read</span>
              </span>
              <svg className="absolute left-0 top-full w-full pointer-events-none z-[1]" viewBox="0 0 400 20" preserveAspectRatio="none" style={{height: '20px', marginTop: '-12px'}}>
                <path
                  d="M 5 12 Q 100 5, 200 12 T 395 12"
                  stroke="#30A46C"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Line 3: through structured phonics - medium to small */}
            <div className="font-sans italic text-[22px] md:text-[26px] lg:text-[30px] text-[#595959] mt-4">
              Structured Phonics guided by AI
            </div>
          </h1>

          {/* CTA - Scroll to Waitlist */}
          <ShinyButton
            onClick={scrollToWaitlist}
            className="bg-[#30A46C] hover:bg-[#2A9461] text-white font-sans font-semibold text-[18px] px-12 py-4 rounded-full border-0 hover:scale-105 transition-all duration-200 [&>span]:normal-case [&>span]:tracking-normal [&>span]:text-[18px] [&>span]:text-white cursor-pointer"
          >
            Join the Waitlist
          </ShinyButton>
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
            <p className="font-sans italic text-[26px] lg:text-[30px] leading-[1.5] text-[#1A1A1A] max-w-[420px]">
              &ldquo;of at-risk readers <span className="not-italic font-semibold text-[#30A46C]">reach grade level</span> with targeted instruction&rdquo;
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* Transition Quote - Absolutely centered */}
      <div className="bg-[#F7F5ED]">
        <div className="px-6 pt-16 pb-24 lg:pt-20 lg:pb-32 max-w-[1440px] mx-auto">
        <BlurFade delay={0.1} inView>
          <div className="space-y-12 max-w-[900px] mx-auto">
            <p className="font-serif text-[32px] lg:text-[48px] leading-[1.3] tracking-[-0.01em] text-[#1A1A1A] text-center">
              Step by step to <span className="italic text-[#30A46C]">natural</span> reading.
            </p>
            <p className="font-serif font-medium italic text-[22px] lg:text-[26px] leading-[1.6] text-[#595959] text-center">
              <span className="font-serif">&ldquo;</span>perfect for&nbsp;&nbsp;<span className="font-dyslexic not-italic text-[18px] lg:text-[22px]">dyslexia</span><span className="font-serif">&rdquo;</span>
            </p>
          </div>
        </BlurFade>
      </div>
      </div>

      <WaveDivider fromColor="#F7F5ED" toColor="#F5FAF7" />

      {/* Video Demo Section */}
      <section className="bg-[#F5FAF7]">
        <div className="px-6 lg:px-24 pt-16 pb-16 lg:pt-24 lg:pb-20 max-w-[1440px] mx-auto">
          <VideoPlayer
            videoId="HD6OBpCypkI"
            thumbnailSrc="/video-thumbnail.jpg"
            title="Tutoria Demo - Structured Phonics in Action"
          />
        </div>
      </section>

      {/* Science Section - Research Credibility */}
      <section className="bg-[#F5FAF7]">
        <div className="px-6 lg:px-24 py-16 lg:py-20 max-w-[1440px] mx-auto">
        <BlurFade delay={0.4} inView>
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
        </BlurFade>
        </div>
      </section>

      <WaveDivider fromColor="#F5FAF7" toColor="#FFFFFF" />

      {/* Features Section - Bento Grid Layout */}
      <section className="notebook-white">
        <div className="px-6 lg:px-24 py-24 lg:py-32 max-w-[1440px] mx-auto">
        <BlurFade delay={0.2} inView>
          {/* Section Heading - Outside grid for better alignment */}
          <h2 className="font-sans font-bold text-[32px] md:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-0.01em] text-[#1A1A1A] mb-8 lg:mb-12">
            What We Offer:
          </h2>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
            {/* LEFT COLUMN: Bento Grid (3 Cards) */}
            <div className="order-2 lg:order-1">

              <div className="space-y-6">
                {/* Large Card - Credibility Anchor */}
                <div className="border-2 border-[#30A46C] bg-white p-12 rounded-xl shadow-sm">
                  <h3 className="font-sans font-bold text-[28px] lg:text-[32px] leading-[1.2] mb-6">
                    <Highlighter action="underline" color="#30A46C" strokeWidth={3} animationDuration={800} isView><span className="text-[#30A46C]">Complete Phonics Curriculum</span></Highlighter>
                  </h3>
                  <p className="font-sans text-[18px] lg:text-[20px] leading-[1.7] text-[#1A1A1A] mb-5">
                    Built on Orton-Gillingham principles. The method reading specialists use.
                  </p>
                  <p className="font-sans text-[18px] lg:text-[20px] leading-[1.7] text-[#1A1A1A]">
                    Teaches decoding skills and fluent reading. Now accessible to any parent.
                  </p>
                </div>

                {/* Small Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Small Card 1 - AI Intelligence */}
                  <div className="border-2 border-[#4A90E2] bg-white p-10 rounded-xl shadow-sm">
                    <h3 className="font-sans font-bold text-[20px] lg:text-[22px] leading-[1.2] mb-6">
                      <Highlighter action="underline" color="#4A90E2" strokeWidth={3} animationDuration={800} isView><span className="text-[#4A90E2]">Intelligent Support</span></Highlighter>
                    </h3>
                    <p className="font-sans text-[16px] lg:text-[18px] leading-[1.7] text-[#1A1A1A] mb-5">
                      Listens and knows when your child is stuck or made a simple mistake.
                    </p>
                    <p className="font-sans text-[16px] lg:text-[18px] leading-[1.7] text-[#1A1A1A]">
                      Steps in when they need help.
                    </p>
                  </div>

                  {/* Small Card 2 - Emotional Benefit */}
                  <div className="border-2 border-[#E8A838] bg-white p-10 rounded-xl shadow-sm">
                    <h3 className="font-sans font-bold text-[20px] lg:text-[22px] leading-[1.2] mb-6">
                      <Highlighter action="underline" color="#E8A838" strokeWidth={3} animationDuration={800} isView><span className="text-[#E8A838]">Builds Confidence</span></Highlighter>
                    </h3>
                    <p className="font-sans text-[16px] lg:text-[18px] leading-[1.7] text-[#1A1A1A]">
                      Practice at home. Safe space to make mistakes and learn at their own pace.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Flashcard Demo */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <FlashcardStack />
            </div>
          </div>
        </BlurFade>
        </div>
      </section>

      <WaveDivider fromColor="#FFFFFF" toColor="#F7F5ED" />

      {/* CTA Section - Centered Conversion Focus */}
      <section id="for-who" className="notebook-beige">
        <div className="px-6 lg:px-24 py-24 lg:py-32 max-w-[1440px] mx-auto">
        <BlurFade delay={0.3} inView>
          <div className="max-w-[800px] mx-auto text-center">
          {/* Section Header */}
          <h2 className="font-sans font-bold text-[32px] md:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-0.01em] text-[#1A1A1A] mb-8 lg:mb-12">
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

          {/* Primary CTA - Waitlist Form */}
          <div className="mb-8">
            <WaitlistForm />
            <p className="font-sans text-[16px] text-[#595959] mt-8">
              Get access very soon
            </p>
          </div>

          {/* Secondary CTA - Demo Request Button */}
          <div className="border-t border-[#DCDCDC] pt-8">
            <p className="font-sans text-[14px] text-[#595959] mb-4">
              For institutions:
            </p>
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="font-sans text-[16px] text-[#30A46C] hover:text-[#2A9461] underline underline-offset-4 transition-colors duration-150"
            >
              Request a demo for your institution
            </button>
          </div>
          </div>
        </BlurFade>
        </div>
      </section>

      <WaveDivider fromColor="#F7F5ED" toColor="#F5FAF7" />

      {/* Contact Section */}
      <section className="bg-[#F5FAF7]">
        <div className="px-6 lg:px-24 py-16 lg:py-20 max-w-[1440px] mx-auto">
          <BlurFade delay={0.5} inView>
            <div className="max-w-[600px] mx-auto text-center space-y-6">
              <h2 className="font-serif text-[32px] lg:text-[40px] leading-[1.3] tracking-[-0.01em] text-[#1A1A1A]">
                Questions? Reach out.
              </h2>

              <a
                href="mailto:frederik@tutoria.ac"
                className="inline-block font-sans text-[20px] lg:text-[22px] text-[#30A46C] hover:text-[#2A9461] underline underline-offset-4 decoration-2 transition-colors duration-200"
              >
                frederik@tutoria.ac
              </a>

              <p className="font-sans text-[16px] lg:text-[18px] leading-[1.6] text-[#595959]">
                We&rsquo;re here to help.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
      </main>

      {/* Demo Modal */}
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </>
  );
}
