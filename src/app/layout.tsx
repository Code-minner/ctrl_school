import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ctrl School — Learn to build. Get hired.",
  description:
    "Cohort-based programs in web development, data, design, and product. Learn with mentors, ship a portfolio, and launch a career in tech.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body className={`${spaceGrotesk.className} flex min-h-full flex-col bg-white text-neutral-950`}>
        {children}
      </body>
    </html>
  );
}
