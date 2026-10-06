import Link from "next/link";

const faqs = [
  {
    q: "How long are programs?",
    a: "Most cohorts run between three and six months. The pace is intense but manageable. You will finish with a portfolio and a clear next step.",
  },
  {
    q: "Do I need experience?",
    a: "No. Our programs are built for beginners and early-career professionals. We start with fundamentals and build up fast. You need curiosity and a willingness to work.",
  },
  {
    q: "What is the time commitment?",
    a: "Expect to spend ten to fifteen hours per week. That includes live sessions, project work, and feedback reviews. The structure keeps you moving without burning out.",
  },
  {
    q: "Are there financing options?",
    a: "Yes. We offer monthly payment plans and a yearly discount. Talk to our team about what fits your situation.",
  },
  {
    q: "What career support exists?",
    a: "You get resume reviews, interview prep, and access to our hiring network. Mentors help you position your projects. We stay with you until you land the job.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mx-auto max-w-md text-center">
          <h2 className="text-3xl font-bold uppercase leading-[0.95] tracking-tight text-neutral-950 sm:text-4xl md:text-5xl">
            FAQs
          </h2>
          <p className="mt-5 text-pretty text-base text-neutral-700">
            Straight answers to the questions we hear most from people starting out.
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
          <p className="mt-3 text-base text-neutral-700">Talk to our team and get a straight answer.</p>
          <Link
            href="mailto:hello@ctrlschool.com"
            className="mt-6 inline-block rounded-full bg-neutral-100 px-5 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
          >
            Email hello@ctrlschool.com
          </Link>
        </div>
      </div>
    </section>
  );
}
