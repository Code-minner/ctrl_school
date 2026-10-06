import Link from "next/link";
import Image from "next/image";
import ApplyButton from "@/components/ApplyButton";
import { school } from "@/lib/school";

export default function Cta() {
  return (
    <section id="apply" className="dot-panel-soft scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <h2 className="max-w-lg text-balance text-3xl font-bold uppercase leading-[0.95] tracking-tight text-neutral-950 sm:text-4xl md:text-5xl">
          {school.tagline}
        </h2>
        <p className="mt-6 max-w-md text-pretty text-base text-neutral-700 md:text-lg">
          Apply to the next virtual cohort or reach the team in Ikeja, Lagos.
        </p>

        <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:w-auto sm:flex-row sm:items-center sm:justify-center">
          <ApplyButton className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
            Apply
          </ApplyButton>
          <Link
            href={`${school.mailto}?subject=Book%20a%20call`}
            className="rounded-full bg-brand-lime px-5 py-2.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-brand-lime-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Book a call
          </Link>
        </div>

        <div className="relative mt-12 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-200 sm:mt-14 sm:aspect-[16/9] md:mt-16">
          <Image
            src="/images/cta.jpg"
            alt="Students gathered around a laptop after finishing a project"
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
