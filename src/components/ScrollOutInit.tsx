"use client";

import { useEffect } from "react";

export default function ScrollOutInit() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("main section, main article, [data-scroll], [data-slide]"),
    );

    if (reduced) {
      nodes.forEach((el) => el.setAttribute("data-scroll", "in"));
      return;
    }

    nodes.forEach((el) => {
      if (!el.hasAttribute("data-scroll")) el.setAttribute("data-scroll", "out");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.setAttribute("data-scroll", entry.isIntersecting ? "in" : "out");
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
