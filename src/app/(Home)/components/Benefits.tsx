import Link from "next/link";
import ApplyButton from "@/components/ApplyButton";
import BentoGrid, { type BentoTile } from "./Bentogrid";
import CountUp from "./CountUp";

const tiles: BentoTile[] = [
  {
    variant: "feature",
    eyebrow: "Curriculum",
    title: "Industry-relevant paths for real tech roles",
    text: "Product, data, front-end, and more — updated to match current industry demand.",
    color: "bg-brand",
    image: "/images/workshop.jpg",
    imageAlt: "Students in a live workshop with an instructor at the whiteboard",
    href: "#programs",
  },
  {
    variant: "compact",
    title: "Live classes and expert workshops",
    text: "Interactive sessions that sharpen technical and soft skills.",
    color: "bg-stone-600",
    image: "/images/projects.jpg",
    imageAlt: "Close-up of a student building an interface on a laptop",
    href: "#process",
  },
  {
    variant: "compact",
    title: "Cohorts plus self-paced options",
    text: "Hybrid learning that fits beginners and early-career professionals.",
    color: "bg-teal-700",
    image: "/images/cohorts.jpg",
    imageAlt: "Two students working together at a table",
    href: "#faq",
  },
  {
    variant: "wide",
    title: "A community beyond the classroom",
    text: "Stay connected for continuous learning, mentorship, and career growth after you finish.",
    color: "bg-brand-dark",
    image: "/images/process.jpg",
    imageAlt: "Alumni sharing a meal after class",
    href: "#apply",
  },
];

const stats = [
  { label: "Founded", to: 2024, suffix: "", note: "Co-founded by software engineers in Lagos" },
  { label: "Focus", to: 1, suffix: " yr", note: "Built for beginners and early-career talent" },
  { label: "Learning", to: 100, suffix: "%", note: "Virtual cohorts with live, hands-on practice" },
  { label: "Mission", to: 10, suffix: "+", note: "Commitments to accessible tech literacy in Africa" },
];

export default function Benefits() {
  return (
    <>
      <section className="dot-panel px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28">
        <div className="mx-auto w-full max-w-5xl">
          <header className="mx-auto max-w-xl text-center">
            <p className="text-xs font-bold uppercase tracking-tight text-brand">Benefits</p>
            <h2 className="mt-3 text-balance text-3xl font-bold uppercase leading-[0.95] tracking-tight text-neutral-950 sm:text-4xl md:text-5xl">
              Everything you need to advance
            </h2>
            <p className="mt-5 text-base text-neutral-700">
              Inclusive, accessible tech education that bridges foundational knowledge and real-world application.
            </p>
          </header>

          <div className="mt-12 md:mt-16">
            <BentoGrid tiles={tiles} />
          </div>
        </div>
      </section>

      <section className="dot-panel-soft px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28">
        <div className="mx-auto grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-tight text-brand">At a glance</p>
            <h2 className="mt-3 text-balance text-3xl font-bold uppercase leading-[0.95] tracking-tight text-neutral-950 sm:text-4xl md:text-5xl">
              Built for workforce readiness
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-neutral-700">
              Since {2024}, Ctrl School has positioned itself as an innovative, inclusive platform for digital literacy
              and career transition into tech.
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
