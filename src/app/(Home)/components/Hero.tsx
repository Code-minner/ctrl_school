import Link from "next/link";
import Image from "next/image";
import ApplyButton from "@/components/ApplyButton";
import { school } from "@/lib/school";

export default function Hero() {
  return (
    <section className="dot-panel px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 md:px-12 md:pb-28 md:pt-24">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Ctrl School · Lagos</p>
        <h1 className="mt-4 max-w-3xl text-balance text-4xl font-bold uppercase leading-[0.95] tracking-tight text-neutral-950 sm:text-5xl md:text-6xl lg:text-7xl">
          Gain the skills to build your career
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-neutral-700 sm:mt-8 md:text-lg">
          {school.tagline}. Virtual, cohort-based programs for beginners and early-career professionals — with live
          classes, mentorship, and projects that mirror real industry work.
        </p>

        <div className="mt-8 flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:w-auto sm:flex-row sm:items-center sm:justify-center">
          <ApplyButton className="rounded-full bg-brand px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
            Apply now
          </ApplyButton>
          <Link
            href="#about"
            className="rounded-full bg-brand-lime px-5 py-2.5 text-center text-sm font-medium text-neutral-950 transition-colors hover:bg-brand-lime-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            About us
          </Link>
        </div>

        <div className="relative mt-12 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-100 sm:mt-16 sm:aspect-[16/9] md:mt-20">
          <Image
            src="/images/hero.jpg"
            alt="Students collaborating on laptops in a bright Ctrl School classroom"
            fill
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
