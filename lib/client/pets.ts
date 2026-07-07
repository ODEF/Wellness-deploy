import { createClient } from "@supabase/supabase-js";

export type ClientPet = {
  id: string;
  client_id: string | null;
  name: string;
  breed: string | null;
  age: string | null;
  weight: string | null;
  notes: string | null;
  created_at: string;
};

export const fallbackClientPets: ClientPet[] = [
  {
    id: "fallback-coco",
    client_id: "fallback",
    name: "Coco",
    breed: "Toy Poodle",
    age: "4 years",
    weight: "6.5 kg",
    notes: "Sensitive skin",
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

export async function getClientPets(): Promise<ClientPet[]> {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return fallbackClientPets;
  }

  const { data, error } = await supabase
    .from("pets")
    .select("id, client_id, name, breed, age, weight, notes, created_at")
    .order("created_at", { ascending: true });

  if (error || !data) {
    console.error(error);
    return fallbackClientPets;
  }

  return data;
}