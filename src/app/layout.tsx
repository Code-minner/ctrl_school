import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ctrl School — Gain the skills to build and grow the career you envision",
  description:
    "Virtual, cohort-based tech education in Lagos for beginners and early-career professionals. Product management, data analytics, front-end development, and more.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body className={`${spaceGrotesk.className} flex min-h-full flex-col text-neutral-950`}>
        {children}
      </body>
    </html>
  );
}
