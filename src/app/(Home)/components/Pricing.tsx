"use client";

import { plans, monthlyPrice, YEARLY_DISCOUNT, type Billing } from "@/lib/plans";
import ApplyButton from "@/components/ApplyButton";
import { useState } from "react";

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="mt-0.5 shrink-0">
      <path d="m2.5 7.5 3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section id="pricing" className="scroll-mt-24 bg-neutral-50 px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mx-auto max-w-xl text-center">
          <p className="text-xs font-bold uppercase tracking-tight text-neutral-950">Pricing</p>
          <h2 className="mt-3 text-3xl font-bold uppercase leading-[0.95] tracking-tight text-neutral-950 sm:text-4xl md:text-5xl">
            Simple plans
          </h2>
          <p className="mt-5 text-base text-neutral-700">Choose a path and start building. Cancel anytime on monthly billing.</p>
        </header>

        <div className="mt-8 flex justify-center">
          <div role="group" aria-label="Billing period" className="inline-flex rounded-lg border border-neutral-200 bg-white p-0.5">
            {(["monthly", "yearly"] as const).map((b) => (
              <button
                key={b}
                type="button"
                aria-pressed={billing === b}
                onClick={() => setBilling(b)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  billing === b ? "bg-neutral-950 text-white" : "text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                {b}
                {b === "yearly" ? " · 20% off" : ""}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {plans.map((p) => {
            const price = monthlyPrice(p, billing);
            return (
              <article
                key={p.name}
                className={`flex flex-col rounded-2xl border bg-white p-6 ${
                  p.featured ? "border-sky-400 shadow-sm ring-1 ring-sky-400" : "border-neutral-200"
                }`}
              >
                {p.featured && (
                  <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-wide text-sky-600">Most popular</p>
                )}
                <h3 className="text-center text-lg font-bold uppercase tracking-tight text-neutral-950">{p.name}</h3>
                <p className="mt-1 text-center text-sm text-neutral-600">{p.blurb}</p>
                <p className="mt-4 text-center text-4xl font-bold leading-none tracking-tight text-neutral-950 sm:text-5xl md:text-6xl">
                  ${price}
                  <span className="text-lg font-bold text-neutral-500 sm:text-2xl md:text-3xl">/mo</span>
                </p>
                {billing === "yearly" && (
                  <p className="mt-2 text-center text-xs text-neutral-500">
                    {Math.round(YEARLY_DISCOUNT * 100)}% off vs monthly
                  </p>
                )}

                <ul className="mt-8 flex flex-1 flex-col gap-3 text-sm text-neutral-800">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>

                <ApplyButton
                  plan={p.name}
                  billing={billing}
                  className={`mt-10 block w-full rounded-full py-2.5 text-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ${
                    p.featured
                      ? "bg-sky-400 text-neutral-950 hover:bg-sky-300"
                      : "bg-neutral-100 text-neutral-950 hover:bg-neutral-200"
                  }`}
                >
                  Get started
                </ApplyButton>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
