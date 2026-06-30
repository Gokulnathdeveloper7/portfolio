import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-carbon">
      <Hero />
      <Projects />
      <Skills />
      <Certifications />
      <Experience />
      <Education />
      <Contact />
    </main>
  );
}
