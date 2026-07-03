import Link from "next/link";
import styles from "./AdminAppointments.module.css";

const appointments = [
  {
    id: "#APT-1008",
    client: "Sarah Johnson",
    pet: "Coco",
    service: "Full Groom",
    date: "Oct 12",
    time: "10:00 AM",
    status: "Pending",
  },
  {
    id: "#APT-1007",
    client: "Mariam K.",
    pet: "Milo",
    service: "Vet Checkup",
    date: "Oct 14",
    time: "12:30 PM",
    status: "Confirmed",
  },
  {
    id: "#APT-1006",
    client: "Nika B.",
    pet: "Luna",
    service: "Dog Spa",
    date: "Oct 16",
    time: "09:00 AM",
    status: "Pending",
  },
  {
    id: "#APT-1005",
    client: "Ana G.",
    pet: "Rocky",
    service: "Training Session",
    date: "Oct 18",
    time: "04:00 PM",
    status: "Completed",
  },
];

const stats = [
  {
    label: "Today",
    value: "6",
    detail: "scheduled visits",
  },
  {
    label: "Pending",
    value: "2",
    detail: "need review",
  },
  {
    label: "Confirmed",
    value: "12",
    detail: "this week",
  },
  {
    label: "Completed",
    value: "38",
    detail: "this month",
  },
];

export default function AdminAppointments() {
  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <Link href="/admin" className={styles.logo}>
          <span className={styles.logoMark}>A</span>
          <span>Admin Panel</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/content">Website Content</Link>
          <Link href="/admin/appointments" className={styles.active}>
            Appointments
          </Link>
          <Link href="/admin/clients">Clients</Link>
          <Link href="/admin/services">Services</Link>
          <Link href="/admin/settings">Settings</Link>
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
                  <span>{appointment.id}</span>
                  <span>{appointment.client}</span>
                  <span>{appointment.pet}</span>
                  <span>{appointment.service}</span>
                  <span>{appointment.date}</span>
                  <span>{appointment.time}</span>

                  <strong
                    className={`${styles.status} ${
                      appointment.status === "Pending"
                        ? styles.pending
                        : appointment.status === "Confirmed"
                          ? styles.confirmed
                          : styles.completed
                    }`}
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
          </div>

          <aside className={styles.sidePanel}>
            <div className={styles.card}>
              <p className={styles.eyebrow}>Next appointment</p>
              <h2>Full Groom</h2>
              <p>Coco with Sarah Johnson</p>

              <div className={styles.detailList}>
                <div>
                  <span>Date</span>
                  <strong>Oct 12</strong>
                </div>

                <div>
                  <span>Time</span>
                  <strong>10:00 AM</strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong>Pending</strong>
                </div>
              </div>
            </div>

            <div className={styles.noticeCard}>
              <h3>Next backend step</h3>
              <p>
                After this UI works, client bookings will be saved into
                Supabase and shown here automatically.
              </p>
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}