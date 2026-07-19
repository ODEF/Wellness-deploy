import { createClient } from "@supabase/supabase-js";
import { homeContent, type HomeContent } from "./homeContent";

type PageContentRow = {
  content: Partial<HomeContent> | null;
};

type ServiceRow = {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price: string | null;
  duration: string | null;
  is_active: boolean;
};

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

export function mergeHomeContent(savedContent?: Partial<HomeContent> | null) {
  if (!savedContent) {
    return homeContent;
  }

  return {
    ...homeContent,
    ...savedContent,

    hero: {
      ...homeContent.hero,
      ...savedContent.hero,
    },

    features: {
      ...homeContent.features,
      ...savedContent.features,
      items: savedContent.features?.items ?? homeContent.features.items,
    },

    services: {
      ...homeContent.services,
      ...savedContent.services,
      items: savedContent.services?.items ?? homeContent.services.items,
    },

    grooming: {
      ...homeContent.grooming,
      ...savedContent.grooming,
      items: savedContent.grooming?.items ?? homeContent.grooming.items,
    },

    packages: {
      ...homeContent.packages,
      ...savedContent.packages,
      items: savedContent.packages?.items ?? homeContent.packages.items,
    },

    otherServices: {
      ...homeContent.otherServices,
      ...savedContent.otherServices,
      items:
        savedContent.otherServices?.items ?? homeContent.otherServices.items,
    },

    testimonials: {
      ...homeContent.testimonials,
      ...savedContent.testimonials,
      stats: savedContent.testimonials?.stats ?? homeContent.testimonials.stats,
      items:
        savedContent.testimonials?.items ?? homeContent.testimonials.items,
    },

    finalCta: {
      ...homeContent.finalCta,
      ...savedContent.finalCta,
      contactItems:
        savedContent.finalCta?.contactItems ??
        homeContent.finalCta.contactItems,
    },
  };
}

function mapServiceToHomeItem(service: ServiceRow) {
  return {
    id: service.id,
    title: service.name,
    tagline: `${service.category}${
      service.price ? ` • ${service.price}` : ""
    }${service.duration ? ` • ${service.duration}` : ""}`,
    icon: "🐾",
    color: "#5c3d2e",
    background: "#fffaf5",
    description: service.description || `${service.category} service`,
  };
}

export async function getHomeContent(): Promise<HomeContent> {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return homeContent;
  }

  const { data: pageData } = await supabase
    .from("page_content")
    .select("content")
    .eq("slug", "home")
    .maybeSingle<PageContentRow>();

  const mergedContent = mergeHomeContent(pageData?.content);

  const { data: activeServices, error: servicesError } = await supabase
    .from("services")
    .select("id, name, category, description, price, duration, is_active")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (servicesError || !activeServices || activeServices.length === 0) {
    return mergedContent;
  }

  return {
    ...mergedContent,
    services: {
      ...mergedContent.services,
      items: activeServices.map(mapServiceToHomeItem),
    },
  };
}