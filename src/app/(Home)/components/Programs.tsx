import BentoGrid, { type BentoTile } from "./Bentogrid";

const tiles: BentoTile[] = [
  {
    variant: "feature",
    eyebrow: "Web",
    title: "Web development from zero to deployed",
    text: "Master frontend and backend fundamentals. Build full-stack apps you can show in interviews.",
    color: "bg-orange-900",
    image: "/images/projects.jpg",
    imageAlt: "A laptop showing a product in development",
    href: "#apply",
  },
  {
    variant: "compact",
    title: "Data analytics for real business decisions",
    text: "Clean, analyze, and visualize data with SQL, Python, and modern dashboards.",
    color: "bg-cyan-700",
    image: "/images/data.jpg",
    imageAlt: "Analytics dashboards on a laptop",
    href: "#apply",
  },
  {
    variant: "compact",
    title: "UI/UX design that solves user problems",
    text: "Design intuitive interfaces, prototype in Figma, and test with real people.",
    color: "bg-yellow-700",
    image: "/images/design.jpg",
    imageAlt: "Designer sketching wireframes beside a tablet",
    href: "#apply",
  },
  {
    variant: "wide",
    title: "Product management",
    text: "Learn to ship products that matter. Own the roadmap from idea to launch.",
    color: "bg-amber-800",
    image: "/images/product.jpg",
    imageAlt: "A product team planning around a glass wall of notes",
    href: "#apply",
  },
];

export default function Programs() {
  return (
    <section id="programs" className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mx-auto max-w-xl text-center">
          <p className="text-xs font-bold uppercase tracking-tight text-neutral-950">Programs</p>
          <h2 className="mt-3 text-balance text-3xl font-bold uppercase leading-[0.95] tracking-tight text-neutral-950 sm:text-4xl md:text-5xl">
            Find your path in tech
          </h2>
          <p className="mt-5 text-base text-neutral-700">Four focused programs built for real industry demand.</p>
        </header>

        <div className="mt-12 md:mt-16">
          <BentoGrid tiles={tiles} />
        </div>
      </div>
    </section>
  );
}
