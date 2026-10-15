import { Header } from "@/widgets/header";
import { Hero } from "@/widgets/hero";
import { SampleDashboard } from "@/widgets/sample-dashboard";

export function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="absolute -top-25 left-3 z-50 bg-accent px-3 py-2 text-on-accent no-underline focus:top-3"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero showcase={<SampleDashboard />} />
      </main>
    </>
  );
}
