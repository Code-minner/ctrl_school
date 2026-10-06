import Link from "next/link";
import Image from "next/image";
import ApplyButton from "@/components/ApplyButton";

type Highlight = { title: string; text: string };

type Feature = {
  id: string;
  eyebrow: string;
  heading: string;
  description: string;
  highlights: [Highlight, Highlight];
  image: string;
  imageAlt: string;
  imageFirst?: boolean;
  largeHighlights?: boolean;
  tone: "white" | "soft";
};

const features: Feature[] = [
  {
    id: "cohorts",
    eyebrow: "Cohorts",
    heading: "Learn together, finish strong, get hired",
    description:
      "You do not learn to code alone. You learn with a small group of driven people moving at the same pace. The structure keeps you honest and the deadlines keep you moving.",
    highlights: [
      { title: "Structured", text: "A clear path with weekly milestones, live sessions, and real deadlines." },
      { title: "Collaborative", text: "Work alongside peers who push you further than you would go alone." },
    ],
    image: "/images/cohorts.jpg",
    imageAlt: "Two students collaborating on a laptop during a cohort session",
    tone: "soft",
  },
  {
    id: "projects",
    eyebrow: "Projects",
    heading: "Build real things from your first week",
    description:
      "You will not just watch videos and take notes. You will build projects that solve actual problems and prove you can do the work.",
    highlights: [
      { title: "Portfolio", text: "Finish with work you can show to any hiring manager." },
      { title: "Practical", text: "Learn the tools and workflows used on real tech teams." },
    ],
    image: "/images/projects.jpg",
    imageAlt: "Hands typing on a laptop while building a product interface",
    imageFirst: true,
    tone: "white",
  },
  {
    id: "mentorship",
    eyebrow: "Mentorship",
    heading: "Learn from people who do the work",
    description:
      "Your mentors are not career lecturers. They are engineers, designers, and product people working in the industry right now. They review your work, answer hard questions, and tell you what actually matters.",
    highlights: [
      { title: "Direct", text: "Get feedback on your work every single week." },
      { title: "Connected", text: "Join a community that stays with you after graduation." },
    ],
    image: "/images/mentorship.jpg",
    imageAlt: "A mentor reviewing a student's work on a laptop",
    largeHighlights: true,
    tone: "soft",
  },
];

export default function Features() {
  return (
    <>
      {features.map((f) => (
        <section
          key={f.id}
          id={f.id}
          className={`scroll-mt-24 ${f.tone === "soft" ? "bg-neutral-50" : "bg-white"} px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28`}
        >
          <div className="mx-auto grid w-full max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-16">
            <div className={f.imageFirst ? "md:order-2" : ""}>
              <p className="text-xs font-bold uppercase tracking-tight text-neutral-950">{f.eyebrow}</p>

              <h2 className="mt-3 text-balance text-3xl font-bold uppercase leading-[0.95] tracking-tight text-neutral-950 sm:text-4xl md:text-5xl">
                {f.heading}
              </h2>

              <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-neutral-700">{f.description}</p>

              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {f.highlights.map((h) => (
                  <div key={h.title}>
                    <h3
                      className={`font-bold uppercase leading-none tracking-tight text-neutral-950 ${
                        f.largeHighlights ? "text-xl sm:text-2xl md:text-3xl" : "text-base"
                      }`}
                    >
                      {h.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">{h.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="#programs"
                  className="rounded-full bg-neutral-100 px-4 py-2 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                >
                  Explore programs
                </Link>
                <ApplyButton className="group inline-flex items-center gap-1 rounded text-xs font-medium text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400">
                  Apply
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    <path d="M4.5 3 7.5 6 4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </ApplyButton>
              </div>
            </div>

            <div
              className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-100 ${
                f.imageFirst ? "md:order-1" : ""
              }`}
            >
              <Image src={f.image} alt={f.imageAlt} fill sizes="(min-width: 768px) 512px, 100vw" className="object-cover" />
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
