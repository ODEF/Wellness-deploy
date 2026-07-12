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

    const { error } = await supabase.from("pets").delete().eq("id", id);

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
      message: "Pet deleted",
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