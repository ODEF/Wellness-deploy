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
      .from("appointments")
      .select(
        "id, client_name, pet_name, service_name, appointment_date, appointment_time, notes, status, created_at",
      )
      .order("appointment_date", { ascending: true })
      .order("appointment_time", { ascending: true });

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      appointments: data ?? [],
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to load appointments",
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

    if (
      !body.petName ||
      !body.serviceName ||
      !body.appointmentDate ||
      !body.appointmentTime
    ) {
      return NextResponse.json(
        { error: "Missing required booking fields" },
        { status: 400 },
      );
    }

    const { data: profile } = await supabase
      .from("clients")
      .select("id, full_name")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    const clientName = profile?.full_name || "Sarah Johnson";

    const { data, error } = await supabase
      .from("appointments")
      .insert({
        client_name: clientName,
        pet_name: body.petName,
        service_name: body.serviceName,
        appointment_date: body.appointmentDate,
        appointment_time: body.appointmentTime,
        notes: body.notes ?? null,
        status: "Pending",
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
      entity_type: "appointments",
      entity_id: data.id,
      client_id: profile?.id ?? null,
      action: "created",
      actor_type: "client",
      actor_name: clientName,
      title: "Appointment booked",
      description: `${body.serviceName} was booked for ${body.petName}.`,
      metadata: {
        pet_name: body.petName,
        service_name: body.serviceName,
        appointment_date: body.appointmentDate,
        appointment_time: body.appointmentTime,
      },
    });

    revalidatePath("/client/appointments");
    revalidatePath("/admin/appointments");

    return NextResponse.json({
      success: true,
      appointment: data,
      message: "Appointment created",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to create appointment",
        details: String(error),
      },
      { status: 500 },
    );
  }
}