import Link from "next/link";
import Image from "next/image";
import { school } from "@/lib/school";

const links = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "How it works", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.924L1.254 2.25H8.08l4.253 5.622L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white/90 px-4 pb-10 pt-14 sm:px-6 md:px-12">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-10 flex h-1.5 w-full overflow-hidden rounded-full" aria-hidden>
          <span className="w-2/3 bg-brand" />
          <span className="w-1/3 bg-brand-lime" />
        </div>

        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 md:items-start">
          <div className="min-w-0">
            <Link href="/" className="inline-block">
              <Image
                src="/assets/ctrl_school_logo.png"
                alt="Ctrl School"
                width={140}
                height={40}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-700">{school.tagline}</p>
            <nav aria-label="Footer" className="mt-6">
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-xs font-bold text-neutral-950 hover:text-brand">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="min-w-0 space-y-3 text-sm text-neutral-700 md:text-right">
            <div className="flex flex-wrap items-center gap-3 md:justify-end">
              <a
                href={school.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-brand hover:bg-brand hover:text-white"
                aria-label="Ctrl School on Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={school.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-lime text-neutral-950 hover:bg-brand-lime-deep"
                aria-label="Ctrl School on X"
              >
                <XIcon />
              </a>
              <a
                href={school.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-brand hover:text-brand-dark"
              >
                {school.handle}
              </a>
            </div>
            <p className="break-words">{school.address}</p>
            <p className="break-all">
              <a href={school.mailto} className="hover:text-brand">
                {school.email}
              </a>
            </p>
            <p>
              <a href={school.phoneHref} className="font-medium text-brand hover:text-brand-dark">
                {school.phone}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-brand/25 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-neutral-600">
            © {new Date().getFullYear()} Ctrl School. All rights reserved. Founded {school.founded}.
          </p>
          <p className="text-[11px] text-neutral-600">
            Co-founded by {school.founders[0]} &amp; {school.founders[1]}
          </p>
        </div>
      </div>
    </footer>
  );
}
