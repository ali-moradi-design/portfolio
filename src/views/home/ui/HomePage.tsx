import { Approach } from "@/widgets/approach";
import { Contact } from "@/widgets/contact";
import { Experience } from "@/widgets/experience";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { Hero } from "@/widgets/hero";
import { SampleDashboard } from "@/widgets/sample-dashboard";
import { SelectedWork } from "@/widgets/selected-work";
import { Skills } from "@/widgets/skills";

export function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero showcase={<SampleDashboard />} />
        <SelectedWork />
        <Experience />
        <Skills />
        <Approach />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
