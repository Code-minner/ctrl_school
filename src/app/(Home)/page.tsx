import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/FeatureSection";
import Benefits from "./components/Benefits";
import Programs from "./components/Programs";
import Process from "./components/Process";
import StoriesCarousel from "./components/StoriesCarousel";
import Header from "@/components/Header";
import { ApplyProvider } from "@/components/ApplyProvider";
import ScrollOutInit from "@/components/ScrollOutInit";
import Faq from "./components/Faq";
import Cta from "./components/Cta";
import Footer from "./components/Footer";
import Pricing from "./components/Pricing";

export default function Home() {
  return (
    <ApplyProvider>
      <ScrollOutInit />
      <div className="site-shell min-h-screen text-neutral-950">
        <Header />
        <main>
          <Hero />
          <About />
          <Features />
          <Benefits />
          <Programs />
          <Process />
          <StoriesCarousel />
          <Pricing />
          <Faq />
          <Cta />
        </main>
        <Footer />
      </div>
    </ApplyProvider>
  );
}
