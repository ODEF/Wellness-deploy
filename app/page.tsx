import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import { homeContent } from "../lib/home/homeContent";

export default function Home() {
  return (
    <main>
      <Hero hero={homeContent.hero} />
      <Features features={homeContent.features} />
    </main>
  );
}