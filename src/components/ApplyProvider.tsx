"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  getPlan,
  monthlyPrice,
  plans,
  programs,
  yearlyTotal,
  type Billing,
  type PlanName,
  type ProgramName,
} from "@/lib/plans";

export type ApplyOptions = {
  plan?: PlanName;
  billing?: Billing;
  program?: ProgramName;
};

type ApplyContextValue = {
  openApply: (options?: ApplyOptions) => void;
};

const ApplyContext = createContext<ApplyContextValue | null>(null);

export function useApply() {
  const ctx = useContext(ApplyContext);
  if (!ctx) throw new Error("useApply must be used within ApplyProvider");
  return ctx;
}

export function ApplyProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [planName, setPlanName] = useState<PlanName>(getPlan().name);
  const [billing, setBilling] = useState<Billing>("monthly");
  const [program, setProgram] = useState<ProgramName | "">("");
  const [submitted, setSubmitted] = useState(false);
  const titleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setSubmitted(false);
    if (typeof window !== "undefined" && window.location.hash === "#apply") {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
  }, []);

  const openApply = useCallback((options?: ApplyOptions) => {
    setPlanName(getPlan(options?.plan).name);
    setBilling(options?.billing ?? "monthly");
    setProgram(options?.program ?? "");
    setSubmitted(false);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  useEffect(() => {
    const fromHash = () => {
      if (window.location.hash === "#apply") openApply();
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [openApply]);

  const plan = getPlan(planName);
  const price = monthlyPrice(plan, billing);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <ApplyContext.Provider value={{ openApply }}>
      {children}
      {open && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
          <button
            type="button"
            className="absolute inset-0 bg-neutral-950/50 backdrop-blur-sm"
            aria-label="Close apply form"
            onClick={close}
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
          >
            <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4 sm:px-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-sky-600">Ctrl School</p>
                <h2 id={titleId} className="text-lg font-bold tracking-tight text-neutral-950 sm:text-xl">
                  {submitted ? "Application received" : "Apply to a cohort"}
                </h2>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={close}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-800 hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M3 3l8 8M11 3 3 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              <aside className="bg-neutral-950 px-5 py-6 text-white sm:px-6">
                <p className="text-[11px] font-bold uppercase tracking-widest text-white/50">Your selection</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {plans.map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => setPlanName(p.name)}
                      className={`rounded-xl px-2 py-2 text-xs font-bold uppercase tracking-tight transition-colors ${
                        planName === p.name ? "bg-sky-400 text-neutral-950" : "bg-white/10 text-white hover:bg-white/15"
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>

                <div className="mt-4 inline-flex rounded-full bg-white/10 p-0.5" role="group" aria-label="Billing">
                  {(["monthly", "yearly"] as const).map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBilling(b)}
                      className={`rounded-full px-3 py-1 text-[11px] font-medium capitalize ${
                        billing === b ? "bg-white text-neutral-950" : "text-white/70 hover:text-white"
                      }`}
                    >
                      {b}
                      {b === "yearly" ? " · 20% off" : ""}
                    </button>
                  ))}
                </div>

                <p className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                  ${price}
                  <span className="text-lg font-semibold text-white/55">/mo</span>
                </p>
                <p className="mt-2 text-sm text-white/70">{plan.blurb}</p>
                {billing === "yearly" && (
                  <p className="mt-1 text-xs text-sky-300">Billed ${yearlyTotal(plan).toLocaleString()} today, then yearly.</p>
                )}

                <ul className="mt-6 flex flex-col gap-2.5 text-sm text-white/85">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="mt-0.5 shrink-0 text-sky-400">
                        <path d="m2.5 7.5 3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-white/45">No payment is taken in this form. We confirm your seat by email.</p>
              </aside>

              <div className="px-5 py-6 sm:px-6">
                {submitted ? (
                  <div className="flex min-h-[280px] flex-col justify-center">
                    <p className="text-2xl font-bold uppercase tracking-tight text-neutral-950">You’re in the queue</p>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                      Thanks for applying to the <span className="font-semibold text-neutral-950">{plan.name}</span> plan
                      {program ? (
                        <>
                          {" "}
                          for <span className="font-semibold text-neutral-950">{program}</span>
                        </>
                      ) : null}
                      . We’ll review your application and email you within one business day.
                    </p>
                    <button
                      type="button"
                      onClick={close}
                      className="mt-8 self-start rounded-full bg-sky-400 px-5 py-2.5 text-sm font-medium text-neutral-950 hover:bg-sky-300"
                    >
                      Back to the site
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <p className="text-sm text-neutral-600">Tell us who you are. We’ll match you to the next cohort.</p>

                    <label className="block text-xs font-bold uppercase tracking-tight text-neutral-950">
                      Full name
                      <input
                        required
                        name="name"
                        autoComplete="name"
                        className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm font-medium text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-200"
                        placeholder="Ada Okafor"
                      />
                    </label>

                    <label className="block text-xs font-bold uppercase tracking-tight text-neutral-950">
                      Email
                      <input
                        required
                        type="email"
                        name="email"
                        autoComplete="email"
                        className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm font-medium text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-200"
                        placeholder="you@email.com"
                      />
                    </label>

                    <fieldset>
                      <legend className="text-xs font-bold uppercase tracking-tight text-neutral-950">Program</legend>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {programs.map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setProgram(p)}
                            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                              program === p
                                ? "bg-neutral-950 text-white"
                                : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    <label className="block text-xs font-bold uppercase tracking-tight text-neutral-950">
                      What do you want from this program?
                      <textarea
                        name="goals"
                        rows={3}
                        className="mt-1.5 w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm font-medium text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-200"
                        placeholder="A job in frontend, a stronger portfolio, a career switch…"
                      />
                    </label>

                    <button
                      type="submit"
                      className="mt-1 rounded-full bg-sky-400 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                    >
                      Submit application · {plan.name} ${price}/mo
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </ApplyContext.Provider>
  );
}
