import LoginForm from "@/components/auth/LoginForm";
import styles from "./page.module.css";

export default function LoginPage() {
  return (
    <main className={styles.loginPage}>
      <section className={styles.loginCard}>
        <div className={styles.loginIntro}>
          <p className={styles.eyebrow}>Wellness Platform</p>
          <h1>Login</h1>
          <p>
            Clients can access cart and account pages. Admins can access the
            content management panel.
          </p>
        </div>

        <LoginForm />
      </section>
    </main>
  );
}