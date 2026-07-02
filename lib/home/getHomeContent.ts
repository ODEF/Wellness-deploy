import { createClient } from "@supabase/supabase-js";
import { homeContent, type HomeContent } from "./homeContent";

function mergeHomeContent(content?: Partial<HomeContent> | null): HomeContent {
  return {
    ...homeContent,
    ...content,

    hero: {
      ...homeContent.hero,
      ...(content?.hero ?? {}),
    },

    features: {
      ...homeContent.features,
      ...(content?.features ?? {}),
    },

    services: {
      ...homeContent.services,
      ...(content?.services ?? {}),
    },

    grooming: {
      ...homeContent.grooming,
      ...(content?.grooming ?? {}),
    },

    packages: {
      ...homeContent.packages,
      ...(content?.packages ?? {}),
    },

    otherServices: {
      ...homeContent.otherServices,
      ...(content?.otherServices ?? {}),
    },

    testimonials: {
      ...homeContent.testimonials,
      ...(content?.testimonials ?? {}),
    },

    finalCta: {
      ...homeContent.finalCta,
      ...(content?.finalCta ?? {}),
    },
  };
}

function createSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function getHomeContent(): Promise<HomeContent> {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return homeContent;
  }

  const { data, error } = await supabase
    .from("page_content")
    .select("content")
    .eq("slug", "home")
    .maybeSingle();

  if (error || !data?.content) {
    return homeContent;
  }

  return mergeHomeContent(data.content as Partial<HomeContent>);
}

export { mergeHomeContent };