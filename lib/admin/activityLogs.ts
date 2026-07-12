import { createClient } from "@supabase/supabase-js";

export type ActivityLog = {
  id: string;
  entity_type: string;
  entity_id: string | null;
  client_id: string | null;
  action: string;
  actor_type: string;
  actor_name: string | null;
  title: string | null;
  description: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
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

export async function getActivityLogs(): Promise<ActivityLog[]> {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("activity_logs")
    .select(
      "id, entity_type, entity_id, client_id, action, actor_type, actor_name, title, description, metadata, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}