"use client";

import { plans, monthlyPrice, YEARLY_DISCOUNT, formatNaira, type Billing } from "@/lib/plans";
import ApplyButton from "@/components/ApplyButton";
import { useState } from "react";

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="mt-0.5 shrink-0 text-brand">
      <path d="m2.5 7.5 3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section id="pricing" className="dot-panel-soft scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mx-auto max-w-xl text-center">
          <p className="text-xs font-bold uppercase tracking-tight text-brand">Pricing</p>
          <h2 className="mt-3 text-3xl font-bold uppercase leading-[0.95] tracking-tight text-neutral-950 sm:text-4xl md:text-5xl">
            Simple plans
          </h2>
          <p className="mt-5 text-base text-neutral-700">
            Priced in Nigerian Naira. Cancel anytime on monthly billing.
          </p>
        </header>

        <div className="mt-8 flex justify-center">
          <div role="group" aria-label="Billing period" className="inline-flex rounded-lg border border-brand/20 bg-white p-0.5">
            {(["monthly", "yearly"] as const).map((b) => (
              <button
                key={b}
                type="button"
                aria-pressed={billing === b}
                onClick={() => setBilling(b)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                  billing === b ? "bg-brand text-white" : "text-neutral-700 hover:bg-brand-lime/60"
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
                className={`flex flex-col rounded-2xl border bg-white/95 p-6 ${
                  p.featured ? "border-brand shadow-sm ring-2 ring-brand" : "border-neutral-200"
                }`}
              >
                {p.featured && (
                  <p className="brand-chip mb-3 self-center rounded-full px-3 py-1 text-center text-[11px] font-bold uppercase tracking-wide">
                    Most popular
                  </p>
                )}
                <h3 className="text-center text-lg font-bold uppercase tracking-tight text-neutral-950">{p.name}</h3>
                <p className="mt-1 text-center text-sm text-neutral-600">{p.blurb}</p>
                <p className="mt-4 text-center text-3xl font-bold leading-none tracking-tight text-neutral-950 sm:text-4xl md:text-5xl">
                  {formatNaira(price)}
                  <span className="text-base font-bold text-neutral-500 sm:text-lg md:text-xl">/mo</span>
                </p>
                {billing === "yearly" && (
                  <p className="mt-2 text-center text-xs text-neutral-500">
                    {Math.round(YEARLY_DISCOUNT * 100)}% off vs monthly · billed annually
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
                  className={`mt-10 block w-full rounded-full py-2.5 text-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                    p.featured
                      ? "bg-brand text-white hover:bg-brand-dark"
                      : "bg-brand-lime text-neutral-950 hover:bg-brand-lime-deep"
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
