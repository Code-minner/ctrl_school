import BentoGrid, { type BentoTile } from "./Bentogrid";

const tiles: BentoTile[] = [
  {
    variant: "feature",
    eyebrow: "Front-end",
    title: "Front-end development from foundations to shipped UI",
    text: "Build interfaces that work in the real world. Learn the stack teams hire for and leave with portfolio projects.",
    color: "bg-orange-900",
    image: "/images/projects.jpg",
    imageAlt: "A laptop showing a product in development",
    href: "#apply",
  },
  {
    variant: "compact",
    title: "Data analytics for real decisions",
    text: "Clean, analyse, and visualise data with tools used in modern teams.",
    color: "bg-cyan-700",
    image: "/images/data.jpg",
    imageAlt: "Analytics dashboards on a laptop",
    href: "#apply",
  },
  {
    variant: "compact",
    title: "Product management that ships",
    text: "Own the roadmap from idea to launch with industry-style exercises.",
    color: "bg-yellow-700",
    image: "/images/product.jpg",
    imageAlt: "A product team planning around a glass wall of notes",
    href: "#apply",
  },
  {
    variant: "wide",
    title: "More in-demand tech disciplines",
    text: "Specialised training across software development and related paths — with curriculum kept current for Africa’s tech workforce.",
    color: "bg-brand",
    image: "/images/design.jpg",
    imageAlt: "Designer sketching wireframes beside a tablet",
    href: "#apply",
  },
];

export default function Programs() {
  return (
    <section id="programs" className="dot-panel scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mx-auto max-w-xl text-center">
          <p className="text-xs font-bold uppercase tracking-tight text-brand">Programs</p>
          <h2 className="mt-3 text-balance text-3xl font-bold uppercase leading-[0.95] tracking-tight text-neutral-950 sm:text-4xl md:text-5xl">
            Find your path in tech
          </h2>
          <p className="mt-5 text-base text-neutral-700">
            Specialised tracks in product management, data analytics, front-end development, and more.
          </p>
        </header>

        <div className="mt-12 md:mt-16">
          <BentoGrid tiles={tiles} />
        </div>
      </div>
    </section>
  );
}
