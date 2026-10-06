import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import ApplyButton from "@/components/ApplyButton";

const iconProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const icons: Record<string, ReactNode> = {
  grid: (
    <svg {...iconProps} fill="currentColor" stroke="none">
      {[5, 12, 19].flatMap((x) => [5, 12, 19].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" />))}
    </svg>
  ),
  rings: (
    <svg {...iconProps}>
      <circle cx="9" cy="12" r="5" />
      <circle cx="15" cy="12" r="5" />
    </svg>
  ),
  wrench: (
    <svg {...iconProps}>
      <path d="M14.7 6.3a4 4 0 0 0-5 5L4 17l3 3 5.7-5.7a4 4 0 0 0 5-5l-2.4 2.4-2.3-.7-.7-2.3 2.4-2.4Z" />
    </svg>
  ),
  play: (
    <svg {...iconProps}>
      <path d="M6 5v14M10 5l9 7-9 7V5Z" />
    </svg>
  ),
};

type Step = { icon: keyof typeof icons; title: string; text: string };

const steps: Step[] = [
  { icon: "grid", title: "Apply and get accepted", text: "Tell us where you are — beginner or early-career. We build balanced virtual cohorts." },
  { icon: "rings", title: "Learn with your cohort", text: "Live classes, peer engagement, and mentorship keep you moving with the group." },
  { icon: "wrench", title: "Build real projects", text: "Hands-on projects and workshops simulate industry scenarios and grow soft skills too." },
  { icon: "play", title: "Grow your career", text: "Leave with a portfolio, real experience, and a community that continues after the program." },
];

function StepItem({ step, index, className = "" }: { step: Step; index: number; className?: string }) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <span className="mb-2 text-[11px] font-bold uppercase tracking-widest text-neutral-400">0{index}</span>
      <span className="text-neutral-950">{icons[step.icon]}</span>
      <h3 className="mt-4 text-lg font-bold uppercase leading-[1] tracking-tight text-neutral-950 sm:text-xl">{step.title}</h3>
      <p className="mt-3 max-w-[260px] text-sm leading-relaxed text-neutral-600">{step.text}</p>
    </div>
  );
}

export default function Process() {
  return (
    <section id="process" className="dot-panel-soft scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mx-auto max-w-xl text-center">
          <p className="text-xs font-bold uppercase tracking-tight text-brand">Process</p>
          <h2 className="mt-3 text-balance text-3xl font-bold uppercase leading-[0.95] tracking-tight text-neutral-950 sm:text-4xl md:text-5xl">
            From application to hired in four steps
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base text-neutral-700">
            No confusion. No wasted time. A clear path from day one to your first tech job.
          </p>
        </header>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-[1fr_1.1fr_1fr] lg:grid-rows-2 lg:items-center lg:gap-x-8 lg:gap-y-12">
          <StepItem step={steps[0]} index={1} className="lg:col-start-1 lg:row-start-1" />
          <StepItem step={steps[1]} index={2} className="lg:col-start-1 lg:row-start-2" />

          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl bg-neutral-200 sm:col-span-2 sm:max-w-md lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:max-w-none">
            <Image
              src="/images/process.jpg"
              alt="Students sharing a meal and talking after class"
              fill
              sizes="(min-width: 768px) 360px, 100vw"
              className="object-cover"
            />
          </div>

          <StepItem step={steps[2]} index={3} className="lg:col-start-3 lg:row-start-1" />
          <StepItem step={steps[3]} index={4} className="lg:col-start-3 lg:row-start-2" />
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <ApplyButton className="rounded-full bg-brand px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
            Apply now
          </ApplyButton>
          <Link href="#faq" className="group inline-flex items-center gap-1 rounded text-xs font-medium text-neutral-900">
            Read FAQs
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="transition-transform group-hover:translate-x-0.5">
              <path d="M4.5 3 7.5 6 4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
