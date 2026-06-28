import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import "./admin.css";

async function requireAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || profile?.role !== "admin") {
    redirect("/");
  }

  return supabase;
}

export default async function AdminPage() {
  await requireAdmin();

  return (
    <main className="adminPage">
      <section className="adminHero">
        <p className="adminEyebrow">Admin Panel</p>
        <h1>Website Management</h1>
        <p>Admin access is working.</p>
      </section>
    </main>
  );
}