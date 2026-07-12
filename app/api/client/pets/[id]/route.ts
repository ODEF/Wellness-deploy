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

export async function DELETE(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    const { id } = await context.params;
    const supabase = createSupabaseAdminClient();

    const { data, error } = await supabase
      .from("pets")
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: "client",
      })
      .eq("id", id)
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
    const { data: client } = await supabase
    .from("clients")
    .select("full_name")
    .eq("id", data.client_id)
    .maybeSingle();

    await supabase.from("activity_logs").insert({
    entity_type: "pets",
    entity_id: data.id,
    client_id: data.client_id,
    action: "deleted",
    actor_type: "client",
    actor_name: client?.full_name ?? "Client",
    title: "Pet deleted",
    description: `${data.name} was moved to deleted pets.`,
    metadata: {
        name: data.name,
        deleted_at: data.deleted_at,
        deleted_by: data.deleted_by,
    },
    });
    revalidatePath("/client/pets");
    revalidatePath("/client/book");

    return NextResponse.json({
      success: true,
      pet: data,
      message: "Pet moved to deleted pets",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to delete pet",
        details: String(error),
      },
      { status: 500 },
    );
  }
  
}

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    const { id } = await context.params;
    const supabase = createSupabaseAdminClient();

    const { data, error } = await supabase
      .from("pets")
      .update({
        deleted_at: null,
        deleted_by: null,
      })
      .eq("id", id)
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
      message: "Pet restored",
    });
    const { data: client } = await supabase
        .from("clients")
        .select("full_name")
        .eq("id", data.client_id)
        .maybeSingle();

        await supabase.from("activity_logs").insert({
        entity_type: "pets",
        entity_id: data.id,
        client_id: data.client_id,
        action: "restored",
        actor_type: "client",
        actor_name: client?.full_name ?? "Client",
        title: "Pet restored",
        description: `${data.name} was restored to active pets.`,
        metadata: {
            name: data.name,
            restored_at: new Date().toISOString(),
        },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to restore pet",
        details: String(error),
      },
      { status: 500 },
    );
  }
}
