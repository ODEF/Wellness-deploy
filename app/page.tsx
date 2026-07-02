import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Services from "../components/home/Services";
import Grooming from "../components/home/Grooming";
import Packages from "../components/home/Packages";
import OtherServices from "../components/home/OtherServices";
import Testimonials from "../components/home/Testimonials";
import FinalCta from "../components/home/FinalCTA";
import { getHomeContent } from "../lib/home/getHomeContent";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getHomeContent();

  return (
    <main>
      <Hero hero={content.hero} />
      <Features features={content.features} />
      <Services services={content.services} />
      <Grooming grooming={content.grooming} />
      <Packages packages={content.packages} />
      <OtherServices otherServices={content.otherServices} />
      <Testimonials testimonials={content.testimonials} />
      <FinalCta finalCta={content.finalCta} />
    </main>
  );
}