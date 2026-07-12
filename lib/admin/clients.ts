import { createClient } from "@supabase/supabase-js";

export type AdminClient = {
  id: string;
  full_name: string;
  email: string | null;
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

export async function getAdminClients(): Promise<AdminClient[]> {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("clients")
    .select("id, full_name, email")
    .order("full_name", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}