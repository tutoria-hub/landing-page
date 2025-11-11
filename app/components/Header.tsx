import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-4 lg:top-6 left-4 lg:left-12 right-4 lg:right-12 z-50 bg-[#F7F5ED] border-2 border-[#DDD9CE] rounded-2xl">
      <div className="px-6 lg:px-12 py-4 lg:py-5 flex justify-between items-center">
        {/* Logo + Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#30A46C] focus-visible:outline-offset-4 rounded"
          aria-label="Tutoria homepage"
        >
          <Image
            src="/assets/tutoria-logo.svg"
            alt="Tutoria"
            width={38}
            height={38}
            className="h-[33.6px] lg:h-[38.4px] w-auto"
            priority
          />
          <span className="font-serif text-[26.4px] lg:text-[31.2px] leading-none tracking-[-0.01em] text-[#1A1A1A] hover:text-[#30A46C] hover:font-semibold transition-colors duration-150 -translate-y-1 -translate-x-1" style={{fontWeight: 500}}>
            tutoria
          </span>
        </Link>

        {/* CTA Button */}
        <a
          href="mailto:waitlist@tutoria.com?subject=Join%20Waitlist&body=I%27d%20like%20to%20join%20the%20Tutoria%20waitlist"
          className="bg-[#30A46C] hover:bg-[#2A9461] text-white font-sans font-semibold text-[14px] lg:text-[15px] px-5 lg:px-6 py-2 lg:py-2.5 rounded-full transition-all duration-150 hover:scale-[1.02] focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#30A46C] focus-visible:outline-offset-4 text-center"
        >
          Join Waitlist
        </a>
      </div>
    </header>
  );
}
