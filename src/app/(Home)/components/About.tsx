import Link from "next/link";
import { missionPoints, school } from "@/lib/school";

export default function About() {
  return (
    <section id="about" className="dot-panel scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-tight text-neutral-950">About Ctrl School</p>
          <h2 className="mt-3 text-balance text-3xl font-bold uppercase leading-[0.95] tracking-tight text-neutral-950 sm:text-4xl md:text-5xl">
            Tech literacy for Africa&apos;s next builders
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-700">
            A technology literacy institution co-founded in {school.founded} by{" "}
            <span className="font-semibold text-neutral-950">{school.founders[0]}</span> and{" "}
            <span className="font-semibold text-neutral-950">{school.founders[1]}</span> — software engineers and
            advocates for accessible tech education and digital empowerment.
          </p>
        </header>

        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-2 md:gap-12">
          <div className="space-y-4 text-sm leading-relaxed text-neutral-700">
            <p>
              Ctrl School equips beginners and early-career professionals (up to one year of experience) with the
              skills to thrive in the modern tech industry. We offer virtual, cohort-based programs and self-paced
              courses that are structured, interactive, and built for real application — not just theory.
            </p>
            <p>
              Our collaborative model centres peer engagement, mentorship, and hands-on work. Each cohort moves through
              live classes, expert-led workshops, and practical projects that simulate industry scenarios, building
              technical proficiency alongside problem-solving, communication, and teamwork.
            </p>
            <p>
              By focusing on students and interns at the start of their tech journeys, we give learners the support to
              grow skills and contribute meaningfully to the tech ecosystem across Africa and beyond.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-tight text-neutral-950">Our mission</p>
            <ul className="mt-4 flex flex-col gap-3">
              {missionPoints.slice(0, 6).map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-neutral-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href="#programs"
              className="mt-6 inline-flex text-xs font-bold uppercase tracking-tight text-brand hover:text-brand-dark"
            >
              See our programs →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
