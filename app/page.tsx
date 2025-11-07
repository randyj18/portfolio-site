import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import SystemsThinking from "@/components/SystemsThinking";
import Capabilities from "@/components/Capabilities";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Philosophy />
      <SystemsThinking />
      <Capabilities />
      <Contact />
      <Footer />
    </main>
  );
}
