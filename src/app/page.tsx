import { About } from "@/components/about/About";
import { Contact } from "@/components/contact/Contact";
import { Experience } from "@/components/experience/Experience";
import { Footer } from "@/components/footer/Footer";
import { Hero } from "@/components/hero/Hero";
import { Nav } from "@/components/nav/Nav";
import { Skills } from "@/components/skills/Skills";
import { Work } from "@/components/work/Work";
import { GridOverlay } from "@/components/fx/GridOverlay";
import { Ruler } from "@/components/fx/Ruler";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <GridOverlay />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main id="main" className="relative z-10">
        <Hero />
        <Work />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
      <Ruler />
    </SmoothScroll>
  );
}
