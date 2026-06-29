import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "../../../../lib/supabase/admin";

export async function PUT(request: Request) {
  try {
    const content = await request.json();

    console.log("Received features content:", content);

    const { data, error } = await supabaseAdmin
      .from("page_content")
      .upsert(
        {
          slug: "features",
          content,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "slug",
        },
      )
      .select();

    if (error) {
      console.error("Supabase upsert error:", error);

      return NextResponse.json(
        {
          error: error.message,
          details: error,
        },
        { status: 500 },
      );
    }

    revalidatePath("/features");
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      data,
      message: "Features page updated",
    });
  } catch (error) {
    console.error("API route error:", error);

    return NextResponse.json(
      {
        error: "API route failed",
        details: String(error),
      },
      { status: 500 },
    );
  }
}