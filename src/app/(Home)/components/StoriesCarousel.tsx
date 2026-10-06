"use client";

import Carousel from "@/components/Carousel";

const stories = [
  {
    quote:
      "I went from waiting tables to a frontend developer job in seven months. The cohort kept me accountable when I wanted to quit.",
    name: "Maya Chen",
    role: "Frontend Developer, Shopify",
  },
  {
    quote: "The mentors did not just teach theory. They showed me exactly what hiring managers look for in a data portfolio.",
    name: "David Okafor",
    role: "Data Analyst, Stripe",
  },
  {
    quote: "I had tried learning design alone for a year. Ctrl School gave me structure, feedback, and a community that made it stick.",
    name: "Sofia Reyes",
    role: "Product Designer, Figma",
  },
  {
    quote: "The weekly deadlines were the difference. I finally finished projects instead of bookmarking another tutorial.",
    name: "Kwame Mensah",
    role: "Full-stack Developer, Andela",
  },
  {
    quote: "Career coaching on the Career plan was blunt and useful. I knew exactly how to talk about my work in interviews.",
    name: "Amira Hassan",
    role: "Product Manager, Paystack",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 text-neutral-950" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="m10 1.5 2.5 5.6 6 .6-4.5 4 1.3 5.9L10 14.6 4.7 17.6 6 11.7 1.5 7.7l6-.6L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

export default function StoriesCarousel() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mx-auto max-w-xl text-center">
          <h2 className="text-balance text-3xl font-bold uppercase leading-[0.95] tracking-tight text-neutral-950 sm:text-4xl md:text-5xl">
            Graduate stories
          </h2>
          <p className="mt-5 text-base text-neutral-700">Real people who made the switch into tech. Swipe to read more.</p>
        </header>

        <Carousel ariaLabel="Graduate stories" className="mt-12 md:mt-16">
          {stories.map((s) => (
            <article key={s.name} className="flex h-full min-h-[260px] flex-col rounded-2xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
              <Stars />
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-neutral-900">
                <p>“{s.quote}”</p>
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-bold text-neutral-700"
                  aria-hidden
                >
                  {s.name.charAt(0)}
                </span>
                <div>
                  <p className="text-xs font-bold text-neutral-950">{s.name}</p>
                  <p className="text-[11px] text-neutral-600">{s.role}</p>
                </div>
              </div>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
