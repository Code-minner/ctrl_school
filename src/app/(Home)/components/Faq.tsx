import Link from "next/link";
import { school } from "@/lib/school";

const faqs = [
  {
    q: "Who is Ctrl School for?",
    a: "Beginners and early-career professionals with up to one year of experience. We focus on students and interns at the start of their tech journeys.",
  },
  {
    q: "Are programs virtual?",
    a: "Yes. We offer virtual, cohort-based programs plus self-paced courses — structured, interactive, and designed for real application.",
  },
  {
    q: "What will I learn?",
    a: "Specialised training in product management, data analytics, front-end development, and other in-demand tech disciplines, with live classes, workshops, and practical projects.",
  },
  {
    q: "Do I need prior experience?",
    a: "No. We bridge foundational knowledge and real-world application. Curiosity and consistency matter more than a long résumé.",
  },
  {
    q: "How do I contact you?",
    a: `Email ${school.email}, call ${school.phone}, or visit us at ${school.address}. Follow ${school.handle} on Instagram and X.`,
  },
];

export default function Faq() {
  return (
    <section id="faq" className="dot-panel scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mx-auto max-w-md text-center">
          <h2 className="text-3xl font-bold uppercase leading-[0.95] tracking-tight text-neutral-950 sm:text-4xl md:text-5xl">
            FAQs
          </h2>
          <p className="mt-5 text-pretty text-base text-neutral-700">
            Straight answers for people starting out in tech with Ctrl School.
          </p>
        </header>

        <dl className="mx-auto mt-12 flex max-w-2xl flex-col gap-8 md:mt-16">
          {faqs.map((f) => (
            <div key={f.q} className="border-b border-neutral-200 pb-8 last:border-0 last:pb-0">
              <dt className="text-base font-bold tracking-tight text-neutral-950">{f.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-neutral-700">{f.a}</dd>
            </div>
          ))}
        </dl>

        <div id="contact" className="mx-auto mt-16 max-w-md scroll-mt-24 text-center md:mt-20">
          <h3 className="text-2xl font-bold uppercase leading-none tracking-tight text-neutral-950 sm:text-3xl md:text-4xl">
            Still have questions?
          </h3>
          <p className="mt-3 text-base text-neutral-700">Talk to the Ctrl School team in Lagos.</p>
          <div className="mt-6 flex flex-col items-center gap-2">
            <Link
              href={school.mailto}
              className="inline-block rounded-full bg-neutral-100 px-5 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
            >
              {school.email}
            </Link>
            <Link href={school.phoneHref} className="text-sm font-medium text-brand hover:text-brand-dark">
              {school.phone}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
