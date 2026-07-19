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

export async function GET() {
  try {
    const supabase = createSupabaseAdminClient();

    const { data, error } = await supabase
      .from("services")
      .select(
        "id, name, category, description, price, duration, is_active, created_at, updated_at",
      )
      .order("created_at", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ services: data ?? [] });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load services", details: String(error) },
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
        { error: "Service name is required" },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("services")
      .insert({
        name: body.name,
        category: body.category ?? "Wellness",
        description: body.description ?? "",
        price: body.price ?? "",
        duration: body.duration ?? "",
        is_active: body.is_active ?? true,
        updated_at: new Date().toISOString(),
      })
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
      action: "created",
      actor_type: "admin",
      actor_name: "Nata",
      title: "Service created",
      description: `${data.name} was added to services.`,
      metadata: {
        name: data.name,
        category: data.category,
        price: data.price,
        duration: data.duration,
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
      { error: "Failed to create service", details: String(error) },
      { status: 500 },
    );
  }
}