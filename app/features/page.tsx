import Features from "../../components/home/Features";
import { homeContent } from "../../lib/home/homeContent";

export default function FeaturesPage() {
  return (
    <main>
      <Features features={homeContent.features} />
    </main>
  );
}