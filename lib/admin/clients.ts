import { createClient } from "@supabase/supabase-js";

export type AdminClient = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  created_at: string;
  updated_at: string | null;
  pet_count: number;
  appointment_count: number;
  latest_activity_at: string | null;
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

  const { data: clients, error: clientsError } = await supabase
    .from("clients")
    .select("id, full_name, email, phone, address, created_at, updated_at")
    .order("created_at", { ascending: true });

  if (clientsError || !clients) {
    console.error(clientsError);
    return [];
  }

  const clientIds = clients.map((client) => client.id);
  const clientNames = clients.map((client) => client.full_name);

  const { data: pets } = await supabase
    .from("pets")
    .select("id, client_id")
    .in("client_id", clientIds)
    .is("deleted_at", null);

  const { data: appointments } = await supabase
    .from("appointments")
    .select("id, client_name")
    .in("client_name", clientNames);

  const { data: activityLogs } = await supabase
    .from("activity_logs")
    .select("id, client_id, created_at")
    .in("client_id", clientIds)
    .order("created_at", { ascending: false });

  return clients.map((client) => {
    const petCount =
      pets?.filter((pet) => pet.client_id === client.id).length ?? 0;

    const appointmentCount =
      appointments?.filter(
        (appointment) => appointment.client_name === client.full_name,
      ).length ?? 0;

    const latestActivity =
      activityLogs?.find((log) => log.client_id === client.id)?.created_at ??
      null;

    return {
      ...client,
      pet_count: petCount,
      appointment_count: appointmentCount,
      latest_activity_at: latestActivity,
    };
  });
}