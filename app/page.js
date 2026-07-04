import PageShell from "@/components/PageShell/PageShell";
import Hero from "@/components/Hero/Hero";
import HowHavenWorks from "@/components/HowHavenWorks/HowHavenWorks";
import Requirements from "@/components/Requirements/Requirements";
import Land from "@/components/Land/Land";
import Projects from "@/components/Projects/Projects";
import About from "@/components/About/About";
import Contact from "@/components/Contact/Contact";

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <HowHavenWorks />
      <div className="gold-divider" />
      <Requirements />
      <div className="gold-divider" />
      <Land />
      <div className="gold-divider" />
      <Projects />
      <div className="gold-divider" />
      <About />
      <div className="gold-divider" />
      <Contact />
    </PageShell>
  );
}
