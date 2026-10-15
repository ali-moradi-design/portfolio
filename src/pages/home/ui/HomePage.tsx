import { Header } from "@/widgets/header";
import { Hero } from "@/widgets/hero";
import { SampleDashboard } from "@/widgets/sample-dashboard";
import styles from "./HomePage.module.css";

export function HomePage() {
  return (
    <>
      <a href="#main" className={styles.skip}>
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero showcase={<SampleDashboard />} />
      </main>
    </>
  );
}
