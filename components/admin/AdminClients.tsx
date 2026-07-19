import Link from "next/link";
import { type AdminClient } from "../../lib/admin/clients";
import styles from "./AdminClients.module.css";

type AdminClientsProps = {
  clients: AdminClient[];
};

function formatDate(value: string | null) {
  if (!value) {
    return "No activity yet";
  }

  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tbilisi",
    weekday: "short",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
}

export default function AdminClients({ clients }: AdminClientsProps) {
  const totalPets = clients.reduce((sum, client) => sum + client.pet_count, 0);

  const totalAppointments = clients.reduce(
    (sum, client) => sum + client.appointment_count,
    0,
  );

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <Link href="/admin" className={styles.logo}>
          <span className={styles.logoMark}>A</span>
          <span>Admin Panel</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/appointments">Appointments</Link>
          <Link href="/admin/activity">Activity Logs</Link>
          <Link href="/admin/content">Website Content</Link>

          <Link href="/admin/client" className={styles.active}>
            Clients
          </Link>

          <Link href="/admin">Services</Link>
          <Link href="/admin/appointments">Bookings</Link>
          <Link href="/admin">Payments</Link>
          <Link href="/admin">Settings</Link>
        </nav>

        <div className={styles.adminBox}>
          <div className={styles.avatar}>N</div>
          <div>
            <strong>Nata</strong>
            <span>Administrator</span>
          </div>
        </div>
      </aside>

      <section className={styles.main}>
        <header className={styles.topbar}>
          <div>
            <p className={styles.breadcrumb}>Admin / Clients</p>
            <h1>Clients</h1>
            <p>
              View client profiles, saved pets, appointment count, and activity
              history.
            </p>
          </div>
        </header>

        <section className={styles.statsGrid}>
          <article className={styles.statCard}>
            <span>Total clients</span>
            <strong>{clients.length}</strong>
            <p>registered profiles</p>
          </article>

          <article className={styles.statCard}>
            <span>Total pets</span>
            <strong>{totalPets}</strong>
            <p>active saved pets</p>
          </article>

          <article className={styles.statCard}>
            <span>Appointments</span>
            <strong>{totalAppointments}</strong>
            <p>booked by clients</p>
          </article>
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.eyebrow}>Client records</p>
              <h2>Registered Clients</h2>
            </div>

            <span>{clients.length} clients</span>
          </div>

          {clients.length === 0 ? (
            <div className={styles.emptyBox}>
              <h2>No clients yet</h2>
              <p>Client profiles will appear here after they are created.</p>
            </div>
          ) : (
            <div className={styles.table}>
              <div className={styles.tableHeader}>
                <span>Name</span>
                <span>Contact</span>
                <span>Pets</span>
                <span>Appointments</span>
                <span>Latest activity</span>
                <span>Actions</span>
              </div>

              {clients.map((client) => (
                <div className={styles.tableRow} key={client.id}>
                  <div>
                    <strong>{client.full_name}</strong>
                    <p>{client.address || "No address"}</p>
                  </div>

                  <div>
                    <span>{client.email || "No email"}</span>
                    <p>{client.phone || "No phone"}</p>
                  </div>

                  <span>{client.pet_count}</span>
                  <span>{client.appointment_count}</span>
                  <span>{formatDate(client.latest_activity_at)}</span>

                  <div className={styles.actions}>
                    <Link href={`/admin/activity?clientId=${client.id}`}>
                      View logs
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}