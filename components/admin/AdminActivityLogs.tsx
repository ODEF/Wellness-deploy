import Link from "next/link";
import {
  type ActivityLog,
  type ActivityLogFilters,
} from "../../lib/admin/activityLogs";
import { type AdminClient } from "../../lib/admin/clients";
import styles from "./AdminActivityLogs.module.css";

type AdminActivityLogsProps = {
  logs: ActivityLog[];
  clients: AdminClient[];
  filters: ActivityLogFilters;
};

function formatDate(value: string) {
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

function getActionLabel(log: ActivityLog) {
  return `${log.entity_type} / ${log.action}`;
}

export default function AdminActivityLogs({
  logs,
  clients,
  filters,
}: AdminActivityLogsProps) {
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

          <Link href="/admin/activity" className={styles.active}>
            Activity Logs
          </Link>

          <Link href="/admin/content">Website Content</Link>

          <Link href="/admin/activity">Clients</Link>
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
            <p className={styles.breadcrumb}>Admin / Activity Logs</p>
            <h1>Activity Logs</h1>
            <p>
              Review client and system actions across pets, appointments,
              services, payments, and orders.
            </p>
          </div>
        </header>
        <form className={styles.filters} method="get">
      <label className={styles.filterField}>
        <span>Client</span>
        <select name="clientId" defaultValue={filters.clientId ?? ""}>
          <option value="">All clients</option>

          {clients.map((client) => (
            <option value={client.id} key={client.id}>
              {client.full_name}
            </option>
          ))}
        </select>
        </label>

        <label className={styles.filterField}>
          <span>From date</span>
          <input
            type="date"
            name="fromDate"
            defaultValue={filters.fromDate ?? ""}
          />
        </label>

        <label className={styles.filterField}>
          <span>To date</span>
          <input
            type="date"
            name="toDate"
            defaultValue={filters.toDate ?? ""}
          />
        </label>

        <label className={styles.filterField}>
          <span>From time</span>
          <input
            type="time"
            name="fromTime"
            defaultValue={filters.fromTime ?? "13:00"}
          />
        </label>

        <label className={styles.filterField}>
          <span>To time</span>
          <input
            type="time"
            name="toTime"
            defaultValue={filters.toTime ?? "07:00"}
          />
        </label>

        <div className={styles.filterActions}>
          <button type="submit">Apply</button>
          <Link href="/admin/activity">Clear</Link>
        </div>
      </form>

        <p className={styles.filterSummary}>
          Dates are selected from the calendar. Logs are displayed as DD/MM/YY using
          Tbilisi time. For 13:00 → 07:00, the time filter works overnight.
        </p>

        <p className={styles.filterSummary}>
        Time filter uses Tbilisi time. For 13:00 → 07:00, logs are matched overnight.
        </p>
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.eyebrow}>Latest events</p>
              <h2>System activity history</h2>
            </div>

            <span>{logs.length} records</span>
          </div>

          {logs.length === 0 ? (
            <div className={styles.emptyBox}>
              <h2>No activity yet</h2>
              <p>
                New appointments, pet changes, payments, and service changes
                will appear here.
              </p>
            </div>
          ) : (
            <div className={styles.timeline}>
              {logs.map((log) => (
                <article className={styles.logCard} key={log.id}>
                  <div className={styles.logMarker} />

                  <div className={styles.logBody}>
                    <div className={styles.logTop}>
                      <div>
                        <span className={styles.tag}>
                          {getActionLabel(log)}
                        </span>

                        <h3>{log.title || "Activity recorded"}</h3>
                      </div>

                      <time>{formatDate(log.created_at)}</time>
                    </div>

                    <p>{log.description || "No description provided."}</p>

                    <div className={styles.logMeta}>
                      <span>Actor: {log.actor_name || "Unknown"}</span>
                      <span>Type: {log.actor_type}</span>
                      <span>Entity: {log.entity_type}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}