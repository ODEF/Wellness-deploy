import { createClient } from "@supabase/supabase-js";

export type ClientAppointment = {
  id: string;
  client_name: string;
  pet_name: string;
  service_name: string;
  appointment_date: string;
  appointment_time: string;
  notes: string | null;
  status: string;
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

export async function getClientAppointments(): Promise<ClientAppointment[]> {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("appointments")
    .select(
      "id, client_name, pet_name, service_name, appointment_date, appointment_time, notes, status, created_at",
    )
    .order("appointment_date", { ascending: true })
    .order("appointment_time", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}