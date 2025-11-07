import type { Metadata } from "next";
import { EB_Garamond, Lexend } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tutoria - Structured Phonics That Just Works",
  description: "Evidence-based phonics instruction backed by Harvard research. Help your child reach grade level with Orton-Gillingham methodology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ebGaramond.variable} ${lexend.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
