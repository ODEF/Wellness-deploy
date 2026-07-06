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
      .from("clients")
      .select("id, full_name, email, phone, address, created_at, updated_at")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      profile: data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to load profile",
        details: String(error),
      },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = createSupabaseAdminClient();
    const body = await request.json();

    if (!body.fullName) {
      return NextResponse.json(
        {
          error: "Full name is required",
        },
        { status: 400 },
      );
    }

    const { data: existingProfile, error: loadError } = await supabase
      .from("clients")
      .select("id")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (loadError) {
      return NextResponse.json(
        {
          error: loadError.message,
        },
        { status: 500 },
      );
    }

    const profileData = {
      full_name: body.fullName,
      email: body.email ?? "",
      phone: body.phone ?? "",
      address: body.address ?? "",
      updated_at: new Date().toISOString(),
    };

    const query = existingProfile
      ? supabase
          .from("clients")
          .update(profileData)
          .eq("id", existingProfile.id)
          .select()
          .single()
      : supabase.from("clients").insert(profileData).select().single();

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
          details: error,
        },
        { status: 500 },
      );
    }

    revalidatePath("/client/settings");
    revalidatePath("/client");

    return NextResponse.json({
      success: true,
      profile: data,
      message: "Profile updated",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to save profile",
        details: String(error),
      },
      { status: 500 },
    );
  }
}