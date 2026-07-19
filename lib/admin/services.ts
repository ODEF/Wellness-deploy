import { createClient } from "@supabase/supabase-js";

export type AdminService = {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price: string | null;
  duration: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
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

export async function getAdminServices(): Promise<AdminService[]> {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("services")
    .select(
      "id, name, category, description, price, duration, is_active, created_at, updated_at",
    )
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}