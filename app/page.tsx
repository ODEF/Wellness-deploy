import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Services from "../components/home/Services";
import Grooming from "../components/home/Grooming";
import Packages from "../components/home/Packages";
import OtherServices from "../components/home/OtherServices";
import Testimonials from "../components/home/Testimonials";
import { homeContent } from "../lib/home/homeContent";

export default function Home() {
  return (
    <main>
      <Hero hero={homeContent.hero} />
      <Features features={homeContent.features} />
      <Services services={homeContent.services} />
      <Grooming grooming={homeContent.grooming} />
      <Packages packages={homeContent.packages} />
      <OtherServices otherServices={homeContent.otherServices} />
      <Testimonials testimonials={homeContent.testimonials} />
    </main>
  );
}