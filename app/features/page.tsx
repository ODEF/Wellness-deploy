import { getFeaturesContent } from "../../lib/features/getFeaturesContent";
import FeaturesHero from "../../components/features/FeaturesHero";

export const revalidate = 0;

export default async function FeaturesPage() {
  const content = await getFeaturesContent();

  return (
    <main>
      <FeaturesHero content={content} />
    </main>
  );
}

// 
// Next.js Server Components can fetch from a database before rendering the page.
// 