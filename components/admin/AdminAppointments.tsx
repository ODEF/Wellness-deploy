import Link from "next/link";
import { type ClientAppointment } from "../../lib/clients/appointments";
import styles from "./AdminAppointments.module.css";

type AdminAppointmentsProps = {
  appointments: ClientAppointment[];
};

function getStatusClass(status: string) {
  if (status === "Pending") {
    return styles.pending;
  }

  if (status === "Confirmed") {
    return styles.confirmed;
  }

  return styles.completed;
}

export default function AdminAppointments({
  appointments,
}: AdminAppointmentsProps) {
  const pendingCount = appointments.filter(
    (appointment) => appointment.status === "Pending",
  ).length;

  const confirmedCount = appointments.filter(
    (appointment) => appointment.status === "Confirmed",
  ).length;

  const completedCount = appointments.filter(
    (appointment) => appointment.status === "Completed",
  ).length;

  const nextAppointment = appointments[0];

  const stats = [
    {
      label: "Total",
      value: String(appointments.length),
      detail: "saved bookings",
    },
    {
      label: "Pending",
      value: String(pendingCount),
      detail: "need review",
    },
    {
      label: "Confirmed",
      value: String(confirmedCount),
      detail: "approved visits",
    },
    {
      label: "Completed",
      value: String(completedCount),
      detail: "finished visits",
    },
  ];

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <Link href="/admin" className={styles.logo}>
          <span className={styles.logoMark}>A</span>
          <span>Admin Panel</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/admin">Dashboard</Link>

          <Link href="/admin/appointments" className={styles.active}>
            Appointments
          </Link>

          <Link href="/admin/activity">Activity Logs</Link>
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
            <p className={styles.breadcrumb}>Admin / Appointments</p>
            <h1>Appointments</h1>
            <p>
              Review client appointment requests, service details, dates, and
              current booking statuses.
            </p>
          </div>

          <button type="button" className={styles.primaryButton}>
            Add Appointment
          </button>
        </header>

        <section className={styles.statsGrid}>
          {stats.map((stat) => (
            <article className={styles.statCard} key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <p>{stat.detail}</p>
            </article>
          ))}
        </section>

        <section className={styles.contentGrid}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.eyebrow}>Booking queue</p>
                <h2>Appointment requests</h2>
              </div>

              <div className={styles.filterGroup}>
                <button type="button">All</button>
                <button type="button">Pending</button>
                <button type="button">Confirmed</button>
              </div>
            </div>

            {appointments.length === 0 ? (
              <div className={styles.emptyBox}>
                <h2>No appointments yet</h2>
                <p>Client bookings from /client/book will appear here.</p>
              </div>
            ) : (
              <div className={styles.table}>
                <div className={styles.tableHeader}>
                  <span>ID</span>
                  <span>Client</span>
                  <span>Pet</span>
                  <span>Service</span>
                  <span>Date</span>
                  <span>Time</span>
                  <span>Status</span>
                  <span>Actions</span>
                </div>

                {appointments.map((appointment) => (
                  <div className={styles.tableRow} key={appointment.id}>
                    <span>#{appointment.id.slice(0, 8)}</span>
                    <span>{appointment.client_name}</span>
                    <span>{appointment.pet_name}</span>
                    <span>{appointment.service_name}</span>
                    <span>{appointment.appointment_date}</span>
                    <span>{appointment.appointment_time}</span>

                    <strong
                      className={`${styles.status} ${getStatusClass(
                        appointment.status,
                      )}`}
                    >
                      {appointment.status}
                    </strong>

                    <div className={styles.actions}>
                      <button type="button">View</button>
                      <button type="button">Confirm</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className={styles.sidePanel}>
            <div className={styles.card}>
              <p className={styles.eyebrow}>Next appointment</p>

              {nextAppointment ? (
                <>
                  <h2>{nextAppointment.service_name}</h2>
                  <p>
                    {nextAppointment.pet_name} with{" "}
                    {nextAppointment.client_name}
                  </p>

                  <div className={styles.detailList}>
                    <div>
                      <span>Date</span>
                      <strong>{nextAppointment.appointment_date}</strong>
                    </div>

                    <div>
                      <span>Time</span>
                      <strong>{nextAppointment.appointment_time}</strong>
                    </div>

                    <div>
                      <span>Status</span>
                      <strong>{nextAppointment.status}</strong>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2>No bookings</h2>
                  <p>There are no saved appointments yet.</p>
                </>
              )}
            </div>

            <div className={styles.noticeCard}>
              <h3>Connected to Supabase</h3>
              <p>
                Client bookings saved from /client/book will now appear in this
                admin queue.
              </p>
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}