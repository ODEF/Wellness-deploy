import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

function createSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function GET(request: Request) {
  try {
    const supabase = createSupabaseAdminClient();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let query = supabase
      .from("pets")
      .select(
        "id, client_id, name, breed, age, weight, notes, created_at, deleted_at, deleted_by",
      )
      .order("created_at", { ascending: true });

    if (status === "deleted") {
      query = query.not("deleted_at", "is", null);
    } else {
      query = query.is("deleted_at", null);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      pets: data ?? [],
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to load pets",
        details: String(error),
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createSupabaseAdminClient();
    const body = await request.json();

    if (!body.name) {
      return NextResponse.json(
        {
          error: "Pet name is required",
        },
        { status: 400 },
      );
    }

    const { data: client } = await supabase
      .from("clients")
      .select("id")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

      const { data, error } = await supabase
        .from("pets")
        .insert({
          client_id: client?.id ?? null,
          name: body.name,
          breed: body.breed ?? "",
          age: body.age ?? "",
          weight: body.weight ?? "",
          notes: body.notes ?? "",
          deleted_at: null,
          deleted_by: null,
        })
        .select()
        .single();

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
          details: error,
        },
        { status: 500 },
      );
    }

    revalidatePath("/client/pets");
    revalidatePath("/client/book");

    return NextResponse.json({
      success: true,
      pet: data,
      message: "Pet saved",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to save pet",
        details: String(error),
      },
      { status: 500 },
    );
  }
}