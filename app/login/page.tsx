import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import "./login.css";

async function login(formData: FormData) {
  "use server";

  const supabase = await createClient();

  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    redirect("/login");
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/login?error=1");
  }

  redirect("/admin");
}

export default async function LoginPage() {
  return (
    <main className="loginPage">
      <section className="loginCard">
        <p className="loginEyebrow">Admin Login</p>
        <h1>Sign in</h1>
        <p className="loginText">
          Use your admin account to access the website management panel.
        </p>

        <form action={login} className="loginForm">
          <label>
            Email
            <input name="email" type="email" required />
          </label>

          <label>
            Password
            <input name="password" type="password" required />
          </label>

          <button type="submit">Login</button>
        </form>
      </section>
    </main>
  );
}