import Link from "next/link";
import { type ClientAppointment } from "../../lib/clients/appointments";
import { type AdminClient } from "../../lib/admin/clients";
import { type ActivityLog } from "../../lib/admin/activityLogs";
import AdminLayout from "./AdminLayout";
import styles from "./AdminShell.module.css";

type AdminShellProps = {
  appointments: ClientAppointment[];
  clients: AdminClient[];
  activityLogs: ActivityLog[];
};

function getTodayDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tbilisi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function getStatusClass(status: string) {
  if (status === "Confirmed") {
    return styles.confirmed;
  }

  if (status === "Pending") {
    return styles.pending;
  }

  return styles.progress;
}

function formatActivityDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tbilisi",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
}

export default function AdminShell({
  appointments,
  clients,
  activityLogs,
}: AdminShellProps) {
  const today = getTodayDate();

  const todayAppointments = appointments.filter(
    (appointment) => appointment.appointment_date === today,
  );

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "Pending",
  );

  const latestAppointments = appointments.slice(0, 5);
  const latestActivityLogs = activityLogs.slice(0, 4);

  const stats = [
    {
      label: "Today Appointments",
      value: todayAppointments.length,
      change: "Today",
    },
    {
      label: "Total Clients",
      value: clients.length,
      change: "Profiles",
    },
    {
      label: "Pending Requests",
      value: pendingAppointments.length,
      change: "Review",
    },
    {
      label: "Activity Logs",
      value: activityLogs.length,
      change: "Events",
    },
  ];

  return (
    <AdminLayout
      activePage="Dashboard"
      breadcrumb="Admin / Dashboard"
      title="Appointments Management"
      actions={
        <>
          <Link href="/admin/appointments" className={styles.secondaryButton}>
            View Appointments
          </Link>

          <Link href="/client/book" className={styles.primaryButton}>
            + New Appointment
          </Link>
        </>
      }
    >
      <section className={styles.statsGrid}>
        {stats.map((stat) => (
          <article className={styles.statCard} key={stat.label}>
            <p className={styles.statLabel}>{stat.label}</p>

            <div className={styles.statRow}>
              <h2>{stat.value}</h2>
              <span>{stat.change}</span>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.contentGrid}>
        <article className={styles.cardLarge}>
          <div className={styles.cardHeader}>
            <div>
              <h2>Latest Appointments</h2>
              <p>Live appointment overview from client bookings.</p>
            </div>

            <Link href="/admin/appointments" className={styles.lightButton}>
              View All
            </Link>
          </div>

          {latestAppointments.length === 0 ? (
            <div className={styles.emptyBox}>
              <h3>No appointments yet</h3>
              <p>Client bookings will appear here after they are created.</p>
            </div>
          ) : (
            <div className={styles.table}>
              <div className={styles.tableHead}>
                <span>Date</span>
                <span>Pet</span>
                <span>Owner</span>
                <span>Service</span>
                <span>Status</span>
              </div>

              {latestAppointments.map((appointment) => (
                <div className={styles.tableRow} key={appointment.id}>
                  <span>{appointment.appointment_date}</span>
                  <strong>{appointment.pet_name}</strong>
                  <span>{appointment.client_name}</span>
                  <span>{appointment.service_name}</span>

                  <span
                    className={`${styles.status} ${getStatusClass(
                      appointment.status,
                    )}`}
                  >
                    {appointment.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </article>

        <aside className={styles.rightColumn}>
          <article className={styles.smallCard}>
            <div className={styles.cardHeaderCompact}>
              <h2>Quick Actions</h2>
            </div>

            <div className={styles.actionList}>
              <Link href="/client/book" className={styles.actionLink}>
                Book appointment
              </Link>

              <Link href="/admin/clients" className={styles.actionLink}>
                View clients
              </Link>

              <Link href="/admin/activity" className={styles.actionLink}>
                View activity logs
              </Link>

              <Link href="/admin/content" className={styles.actionLink}>
                Update homepage
              </Link>
            </div>
          </article>

          <article className={styles.smallCard}>
            <div className={styles.cardHeaderCompact}>
              <h2>Recent Activity</h2>
            </div>

            {latestActivityLogs.length === 0 ? (
              <div className={styles.timeline}>
                <div>
                  <span>No logs</span>
                  <p>Activity will appear here after client actions.</p>
                </div>
              </div>
            ) : (
              <div className={styles.timeline}>
                {latestActivityLogs.map((log) => (
                  <div key={log.id}>
                    <span>{formatActivityDate(log.created_at)}</span>
                    <p>{log.title || `${log.entity_type} / ${log.action}`}</p>
                  </div>
                ))}
              </div>
            )}
          </article>
        </aside>
      </section>
    </AdminLayout>
  );
}