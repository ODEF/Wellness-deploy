import Link from "next/link";
import styles from "./AdminShell.module.css";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", active: true },
  { label: "Appointments", href: "/admin" },
  { label: "Clients", href: "/admin" },
  { label: "Services", href: "/admin" },
  { label: "Bookings", href: "/admin" },
  { label: "Payments", href: "/admin" },
  { label: "Website Content", href: "/admin/content" },
  { label: "Settings", href: "/admin" },
];
const stats = [
  {
    label: "Today Appointments",
    value: "18",
    change: "+12%",
  },
  {
    label: "New Clients",
    value: "247",
    change: "+8%",
  },
  {
    label: "Revenue",
    value: "$14,850",
    change: "+18%",
  },
  {
    label: "Pending Requests",
    value: "16",
    change: "-4%",
  },
];

const appointments = [
  {
    time: "09:00",
    pet: "Mochi",
    owner: "Sarah Kim",
    service: "Full Groom",
    status: "Confirmed",
  },
  {
    time: "10:30",
    pet: "Luna",
    owner: "Emma Wilson",
    service: "Bath & Blow Dry",
    status: "In progress",
  },
  {
    time: "12:00",
    pet: "Charlie",
    owner: "Daniel Carter",
    service: "Vet Checkup",
    status: "Pending",
  },
  {
    time: "14:00",
    pet: "Coco",
    owner: "Sofia Bennett",
    service: "Premium Spa",
    status: "Confirmed",
  },
];

export default function AdminShell() {
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
              className={`${styles.navLink} ${link.active ? styles.active : ""}`}
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
            <p className={styles.breadcrumb}>Admin / Dashboard</p>
            <h1 className={styles.pageTitle}>Appointments Management</h1>
          </div>

          <div className={styles.topbarActions}>
            <button className={styles.secondaryButton}>Export</button>
            <button className={styles.primaryButton}>+ New Appointment</button>
            <div className={styles.avatar}>N</div>
          </div>
        </header>

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
                <h2>Today’s Schedule</h2>
                <p>Live appointment overview for the current day.</p>
              </div>

              <button className={styles.lightButton}>View All</button>
            </div>

            <div className={styles.table}>
              <div className={styles.tableHead}>
                <span>Time</span>
                <span>Pet</span>
                <span>Owner</span>
                <span>Service</span>
                <span>Status</span>
              </div>

              {appointments.map((appointment) => (
                <div className={styles.tableRow} key={`${appointment.time}-${appointment.pet}`}>
                  <span>{appointment.time}</span>
                  <strong>{appointment.pet}</strong>
                  <span>{appointment.owner}</span>
                  <span>{appointment.service}</span>
                  <span
                    className={`${styles.status} ${
                      appointment.status === "Confirmed"
                        ? styles.confirmed
                        : appointment.status === "In progress"
                          ? styles.progress
                          : styles.pending
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <aside className={styles.rightColumn}>
            <article className={styles.smallCard}>
              <div className={styles.cardHeaderCompact}>
                <h2>Quick Actions</h2>
              </div>

              <div className={styles.actionList}>
                <button>Book appointment</button>
                <button>Add client</button>
                <button>Edit services</button>
                <Link href="/admin/content" className={styles.actionLink}>
                     Update homepage
                </Link>
              </div>
            </article>

            <article className={styles.smallCard}>
              <div className={styles.cardHeaderCompact}>
                <h2>Upcoming</h2>
              </div>

              <div className={styles.timeline}>
                <div>
                  <span>15:30</span>
                  <p>Training session — Max</p>
                </div>
                <div>
                  <span>16:00</span>
                  <p>Dog hotel check-in — Bella</p>
                </div>
                <div>
                  <span>17:15</span>
                  <p>Nutrition consultation — Rocky</p>
                </div>
              </div>
            </article>
          </aside>
        </section>
      </main>
    </div>
  );
}