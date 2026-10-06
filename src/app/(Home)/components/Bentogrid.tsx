import Link from "next/link";
import Image from "next/image";

export type BentoTile = {
  variant: "feature" | "compact" | "wide";
  title: string;
  text: string;
  eyebrow?: string;
  color: string;
  image?: string;
  imageAlt?: string;
  href?: string;
};

const span = {
  feature: "md:col-span-2 md:row-span-2 min-h-[320px] sm:min-h-[380px]",
  compact: "md:col-span-1 min-h-[240px] sm:min-h-[280px]",
  wide: "md:col-span-2 min-h-[220px] sm:min-h-[240px]",
};

const titleSize = {
  feature: "text-2xl sm:text-3xl md:text-4xl",
  compact: "text-lg sm:text-xl",
  wide: "text-2xl sm:text-3xl md:text-4xl",
};

export default function BentoGrid({ tiles }: { tiles: BentoTile[] }) {
  return (
    <div className="grid gap-4 md:min-h-[560px] md:grid-cols-4 md:grid-rows-2">
      {tiles.map((t) => (
        <article
          key={t.title}
          className={`relative isolate flex flex-col overflow-hidden rounded-2xl p-5 text-white sm:p-6 ${t.color} ${span[t.variant]} md:min-h-0 ${
            t.variant === "feature" ? "justify-end" : t.variant === "wide" ? "justify-end sm:justify-center" : ""
          }`}
        >
          {t.image && (
            <>
              <Image
                src={t.image}
                alt={t.imageAlt ?? ""}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="-z-20 object-cover"
              />
              <div className={`absolute inset-0 -z-10 opacity-70 ${t.color}`} />
            </>
          )}
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          {t.eyebrow && <p className="mb-2 text-[11px] font-bold uppercase tracking-wide">{t.eyebrow}</p>}

          <h3 className={`font-bold uppercase leading-[0.95] tracking-tight ${titleSize[t.variant]}`}>{t.title}</h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/90">{t.text}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href={t.href ?? "#programs"}
              className="rounded-full bg-white/20 px-4 py-1.5 text-xs font-medium text-white backdrop-blur transition-colors hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Learn more
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
