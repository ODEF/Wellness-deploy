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

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const supabase = createSupabaseAdminClient();

    const { data, error } = await supabase
      .from("services")
      .update({
        name: body.name,
        category: body.category,
        description: body.description,
        price: body.price,
        duration: body.duration,
        is_active: body.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message, details: error },
        { status: 500 },
      );
    }

    await supabase.from("activity_logs").insert({
      entity_type: "services",
      entity_id: data.id,
      client_id: null,
      action: "updated",
      actor_type: "admin",
      actor_name: "Nata",
      title: "Service updated",
      description: `${data.name} was updated.`,
      metadata: {
        name: data.name,
        category: data.category,
        price: data.price,
        duration: data.duration,
        is_active: data.is_active,
      },
    });

    revalidatePath("/");
    revalidatePath("/client/book");
    revalidatePath("/admin/services");
    revalidatePath("/admin/activity");
    return NextResponse.json({
      success: true,
      service: data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update service", details: String(error) },
      { status: 500 },
    );
  }
}