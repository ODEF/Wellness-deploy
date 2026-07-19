import { createClient } from "@supabase/supabase-js";

export type ClientBookingService = {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price: string | null;
  duration: string | null;
  is_active: boolean;
  created_at: string;
};

export const fallbackBookingServices: ClientBookingService[] = [
  {
    id: "fallback-full-grooming",
    name: "Full Grooming",
    category: "Grooming",
    description: "Complete grooming session with bath, trim, and coat care.",
    price: "From $45",
    duration: "60 min",
    is_active: true,
    created_at: "",
  },
  {
    id: "fallback-wellness-check",
    name: "Wellness Check",
    category: "Health",
    description: "Basic wellness review for coat, skin, weight, and condition.",
    price: "From $35",
    duration: "30 min",
    is_active: true,
    created_at: "",
  },
];

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

export async function getActiveBookingServices(): Promise<
  ClientBookingService[]
> {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return fallbackBookingServices;
  }

  const { data, error } = await supabase
    .from("services")
    .select(
      "id, name, category, description, price, duration, is_active, created_at",
    )
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error || !data) {
    console.error(error);
    return fallbackBookingServices;
  }

  return data.length > 0 ? data : fallbackBookingServices;
}