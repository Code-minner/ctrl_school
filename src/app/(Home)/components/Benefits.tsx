import Link from "next/link";
import ApplyButton from "@/components/ApplyButton";
import BentoGrid, { type BentoTile } from "./Bentogrid";
import CountUp from "./CountUp";

const tiles: BentoTile[] = [
  {
    variant: "feature",
    eyebrow: "Curriculum",
    title: "Career-focused learning paths for real tech roles",
    text: "We teach the skills companies actually hire for. No filler, no outdated theory.",
    color: "bg-cyan-800",
    image: "/images/workshop.jpg",
    imageAlt: "Students in a live workshop with an instructor at the whiteboard",
    href: "#programs",
  },
  {
    variant: "compact",
    title: "Workshops that sharpen your practical skills",
    text: "Live sessions on tools and workflows used daily.",
    color: "bg-stone-600",
    image: "/images/projects.jpg",
    imageAlt: "Close-up of a student building an interface on a laptop",
    href: "#process",
  },
  {
    variant: "compact",
    title: "Flexible learning that still has structure",
    text: "Evenings and weekends, with milestones that keep you moving.",
    color: "bg-teal-700",
    image: "/images/cohorts.jpg",
    imageAlt: "Two students working together at a table",
    href: "#faq",
  },
  {
    variant: "wide",
    title: "A network that lasts",
    text: "Your community, resources, and mentors stay with you long after you finish the program.",
    color: "bg-amber-800",
    image: "/images/process.jpg",
    imageAlt: "Alumni sharing a meal after class",
    href: "#apply",
  },
];

const stats = [
  { label: "Graduates", to: 2400, suffix: "+", note: "Alumni now working in tech roles worldwide" },
  { label: "Job placement", to: 87, suffix: "%", note: "Hired within six months of finishing a program" },
  { label: "Salary increase", to: 42, suffix: "%", note: "Average pay bump after completing a cohort" },
  { label: "Community size", to: 12, suffix: "k", note: "Active members learning and building together" },
];

export default function Benefits() {
  return (
    <>
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28">
        <div className="mx-auto w-full max-w-5xl">
          <header className="mx-auto max-w-xl text-center">
            <p className="text-xs font-bold uppercase tracking-tight text-neutral-950">Benefits</p>
            <h2 className="mt-3 text-balance text-3xl font-bold uppercase leading-[0.95] tracking-tight text-neutral-950 sm:text-4xl md:text-5xl">
              Everything you need to advance
            </h2>
            <p className="mt-5 text-base text-neutral-700">A complete system built for your career in tech.</p>
          </header>

          <div className="mt-12 md:mt-16">
            <BentoGrid tiles={tiles} />
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28">
        <div className="mx-auto grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-tight text-neutral-950">Results</p>
            <h2 className="mt-3 text-balance text-3xl font-bold uppercase leading-[0.95] tracking-tight text-neutral-950 sm:text-4xl md:text-5xl">
              The numbers do not lie
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-neutral-700">
              We measure what matters. Your career moves forward or we have not done our job.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="#pricing"
                className="rounded-full bg-neutral-200 px-4 py-2 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
              >
                See pricing
              </Link>
              <ApplyButton className="group inline-flex items-center gap-1 rounded text-xs font-medium text-neutral-900">
                Apply
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  <path d="M4.5 3 7.5 6 4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </ApplyButton>
            </div>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
                <dt className="text-sm font-bold uppercase tracking-tight text-neutral-950">{s.label}</dt>
                <dd className="mt-6 text-right text-4xl font-bold tracking-tight tabular-nums text-neutral-950 sm:text-5xl md:text-6xl">
                  <CountUp to={s.to} suffix={s.suffix} />
                </dd>
                <div className="mt-5 border-t border-neutral-200 pt-3 text-right text-xs leading-relaxed text-neutral-600">
                  {s.note}
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
