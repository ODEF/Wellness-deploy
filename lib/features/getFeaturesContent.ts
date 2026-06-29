import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  defaultFeaturesContent,
  type FeaturesContent,
} from "./featuresContent";

export async function getFeaturesContent(): Promise<FeaturesContent> {
  const { data, error } = await supabaseAdmin
    .from("page_content")
    .select("content")
    .eq("slug", "features")
    .single();

  if (error || !data?.content) {
    return defaultFeaturesContent;
  }

  return data.content as FeaturesContent;
}