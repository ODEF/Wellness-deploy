import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import "../login/login.css";

async function signup(formData: FormData) {
  "use server";

  const supabase = await createClient();

  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    redirect("/signup");
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    redirect("/signup?error=1");
  }

  redirect("/login");
}

export default function SignupPage() {
  return (
    <main className="loginPage">
      <section className="loginCard">
        <p className="loginEyebrow">Admin Setup</p>
        <h1>Create Admin Account</h1>
        <p className="loginText">
          Create the first login account. After that, mark this user as admin in
          Supabase SQL.
        </p>

        <form action={signup} className="loginForm">
          <label>
            Email
            <input name="email" type="email" required />
          </label>

          <label>
            Password
            <input name="password" type="password" required minLength={6} />
          </label>

          <button type="submit">Create Account</button>
        </form>
      </section>
    </main>
  );
}