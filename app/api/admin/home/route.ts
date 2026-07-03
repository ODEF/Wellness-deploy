import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { homeContent, type HomeContent } from "../../../../lib/home/homeContent";
import { mergeHomeContent } from "../../../../lib/home/getHomeContent";

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
      .from("page_content")
      .select("content")
      .eq("slug", "home")
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 },
      );
    }

    const content = mergeHomeContent(data?.content as Partial<HomeContent>);

    return NextResponse.json({
      content,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to load homepage content",
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

    const { data: existingRow } = await supabase
      .from("page_content")
      .select("content")
      .eq("slug", "home")
      .maybeSingle();

    const existingContent = mergeHomeContent(
      existingRow?.content as Partial<HomeContent>,
    );

    // ccc
    // here is add which sections can be updated for the homepage content
    //first is 1. hero section
    //second is 2. features section
    //third is 3. services section
    // ------------------------------------------------------ feature update for the homepage content

    const updatedContent = mergeHomeContent({
        ...existingContent,

            hero: {
                ...existingContent.hero,
                ...(body.hero ?? {}),
            },

            features: {
                ...existingContent.features,
                ...(body.features ?? {}),
            },

            services: {
                ...existingContent.services,
                ...(body.services ?? {}),
            },
        }
    );

    //add services editor state
    //components/admin/ContentEditor.tsx

    //============================================================



    // cc

    const { data, error } = await supabase
      .from("page_content")
      .upsert(
         {
            slug: "home",
            page_slug: "home",
            content: updatedContent,
            updated_at: new Date().toISOString(),
        },
        {
            onConflict: "slug",
        },
        )
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

    revalidatePath("/");
    revalidatePath("/admin/content");

    return NextResponse.json({
      success: true,
      data,
      content: updatedContent,
      message: "Homepage content updated",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to save homepage content",
        details: String(error),
      },
      { status: 500 },
    );
  }
}