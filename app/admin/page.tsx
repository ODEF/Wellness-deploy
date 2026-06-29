import { getFeaturesContent } from "../../lib/features/getFeaturesContent";
import FeaturesEditor from "../../components/admin/FeaturesEditor";

export default async function AdminFeaturesPage() {
  const content = await getFeaturesContent();

  return (
    <main>
      <FeaturesEditor initialContent={content} />
    </main>
  );
}