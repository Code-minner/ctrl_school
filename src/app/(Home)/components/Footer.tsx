import Link from "next/link";
import Image from "next/image";

const links = [
  { label: "Programs", href: "#programs" },
  { label: "Mentorship", href: "#mentorship" },
  { label: "How it works", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const legal = [
  { label: "Privacy Policy", href: "#faq" },
  { label: "Terms of Service", href: "#faq" },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white px-4 pb-10 pt-14 sm:px-6 md:px-12">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/assets/ctrl_school_logo.png"
                alt="Ctrl School"
                width={140}
                height={40}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-600">
              A cohort-based school for people ready to build real skills and get hired in tech.
            </p>
            <nav aria-label="Footer" className="mt-6">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-xs font-bold text-neutral-950 hover:text-neutral-500">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="w-full max-w-xs">
            <p className="text-xs font-bold text-neutral-950">Subscribe</p>
            <p className="mt-1 text-xs text-neutral-600">Get cohort dates and career resources. No spam.</p>
            <form
              action="mailto:hello@ctrlschool.com"
              method="post"
              encType="text/plain"
              className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="Enter your email"
                className="min-w-0 flex-1 border-b border-neutral-300 bg-transparent py-2 text-sm text-neutral-950 placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-neutral-100 px-4 py-2 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-neutral-200 pt-6 md:flex-row md:items-center">
          <p className="text-[11px] text-neutral-600">© {new Date().getFullYear()} Ctrl School. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legal.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-[11px] text-neutral-700 underline-offset-2 hover:text-neutral-950 hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
