import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import Requirements from "@/components/Requirements/Requirements";
import Land from "@/components/Land/Land";
import Projects from "@/components/Projects/Projects";
import About from "@/components/About/About";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
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
      </main>
      <Footer />
    </>
  );
}

