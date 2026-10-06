"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useApply } from "./ApplyProvider";

const links = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "How it works", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openApply } = useApply();

  function onApply() {
    setMenuOpen(false);
    openApply();
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLink =
    "text-[13px] font-medium text-neutral-900 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded";

  return (
    <header className="sticky top-0 z-50 border-b border-brand/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-6 md:px-12">
        <Link href="/" className="shrink-0" onClick={() => setMenuOpen(false)}>
          <Image
            src="/assets/ctrl_school_logo.png"
            alt="Ctrl School"
            width={140}
            height={40}
            className="h-8 w-auto sm:h-9"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex lg:gap-6" aria-label="Main">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className={navLink}>
              {l.label}
            </Link>
          ))}

          <div className="flex items-center gap-2 pl-1">
            <Link
              href="#contact"
              className="rounded-full bg-brand-lime px-4 py-1.5 text-[13px] font-medium text-neutral-950 transition-colors hover:bg-brand-lime-deep"
            >
              Book a call
            </Link>
            <button
              type="button"
              onClick={onApply}
              className="rounded-full bg-brand px-4 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-brand-dark"
            >
              Apply
            </button>
          </div>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            {menuOpen ? (
              <path d="M4 4l10 10M14 4 4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-neutral-100 bg-white px-4 pb-6 pt-4 sm:px-6 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="block rounded-lg px-2 py-3 text-base font-medium text-neutral-900"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Link
              href="#contact"
              className="rounded-full bg-brand-lime px-5 py-2.5 text-center text-sm font-medium text-neutral-950"
              onClick={() => setMenuOpen(false)}
            >
              Book a call
            </Link>
            <button
              type="button"
              className="rounded-full bg-brand px-5 py-2.5 text-center text-sm font-medium text-white"
              onClick={onApply}
            >
              Apply
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
