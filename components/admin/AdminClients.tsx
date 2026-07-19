import Link from "next/link";
import { type AdminClient } from "../../lib/admin/clients";
import AdminLayout from "./AdminLayout";
import shellStyles from "./AdminShell.module.css";
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
  const clientsWithActivity = clients.filter(
    (client) => client.latest_activity_at,
  ).length;

  return (
    <AdminLayout
      activePage="Clients"
      breadcrumb="Admin / Clients"
      title="Clients"
    >
      <section className={shellStyles.statsGrid}>
        <article className={shellStyles.statCard}>
          <p className={shellStyles.statLabel}>Total clients</p>
          <div className={shellStyles.statRow}>
            <h2>{clients.length}</h2>
            <span>Profiles</span>
          </div>
        </article>

        <article className={shellStyles.statCard}>
          <p className={shellStyles.statLabel}>Total pets</p>
          <div className={shellStyles.statRow}>
            <h2>{totalPets}</h2>
            <span>Active</span>
          </div>
        </article>

        <article className={shellStyles.statCard}>
          <p className={shellStyles.statLabel}>Appointments</p>
          <div className={shellStyles.statRow}>
            <h2>{totalAppointments}</h2>
            <span>Booked</span>
          </div>
        </article>

        <article className={shellStyles.statCard}>
            <p className={shellStyles.statLabel}>Clients with activity</p>
            <div className={shellStyles.statRow}>
                <h2>{clientsWithActivity}</h2>
                <span>Logs</span>
            </div>
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
    </AdminLayout>
  );
}