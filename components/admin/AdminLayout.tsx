"use client";

import Link from "next/link";
import styles from "./AdminShell.module.css";

type AdminPage =
  | "Dashboard"
  | "Appointments"
  | "Clients"
  | "Activity Logs"
  | "Services"
  | "Bookings"
  | "Payments"
  | "Website Content"
  | "Settings";

type AdminLayoutProps = {
  activePage: AdminPage;
  breadcrumb: string;
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

const sidebarLinks: { label: AdminPage; href: string }[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "Appointments", href: "/admin/appointments" },
  { label: "Clients", href: "/admin/clients" },
  { label: "Activity Logs", href: "/admin/activity" },
  { label: "Services", href: "/admin/services" },
  { label: "Bookings", href: "/admin/appointments" },
  { label: "Payments", href: "/admin" },
  { label: "Website Content", href: "/admin/content" },
  { label: "Settings", href: "/admin" },
];

export default function AdminLayout({
  activePage,
  breadcrumb,
  title,
  actions,
  children,
}: AdminLayoutProps) {
  return (
    <div className={styles.adminPage}>
      <aside className={styles.sidebar}>
        <Link href="/admin" className={styles.logo}>
          <span className={styles.logoMark}>♥</span>
          <span>PetDash</span>
        </Link>

        <nav className={styles.nav}>
          {sidebarLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`${styles.navLink} ${
                link.label === activePage ? styles.active : ""
              }`}
            >
              <span className={styles.navDot} />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <p>Dogs Wellness Co.</p>
          <span>Admin panel</span>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.topbar}>
          <div>
            <p className={styles.breadcrumb}>{breadcrumb}</p>
            <h1 className={styles.pageTitle}>{title}</h1>
          </div>

          <div className={styles.topbarActions}>
            {actions}
            <div className={styles.avatar}>N</div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}