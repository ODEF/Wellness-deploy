import { createClient } from "@supabase/supabase-js";

export type ClientProfile = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
};

export const fallbackClientProfile: ClientProfile = {
  id: "fallback",
  full_name: "Sarah Johnson",
  email: "sarah@example.com",
  phone: "+995 555 123 456",
  address: "Tbilisi, Georgia",
  created_at: "",
  updated_at: "",
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

export async function getClientProfile(): Promise<ClientProfile> {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return fallbackClientProfile;
  }

  const { data, error } = await supabase
    .from("clients")
    .select("id, full_name, email, phone, address, created_at, updated_at")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    return fallbackClientProfile;
  }

  return data;
}