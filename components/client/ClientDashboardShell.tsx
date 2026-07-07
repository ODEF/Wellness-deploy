import Link from "next/link";
import styles from "./ClientDashboardShell.module.css";
import { type ClientAppointment } from "../../lib/client/appointments";
import ClientSettingsForm from "./ClientSettingsForm";
import {
  type ClientProfile,
  fallbackClientProfile,
} from "../../lib/client/profile";

type ClientPage =
  | "Dashboard"
  | "My Pets"
  | "Appointments"
  | "Health Records"
  | "Orders"
  | "Settings";

type ClientDashboardShellProps = {
  activePage: ClientPage;
  appointments?: ClientAppointment[];
  profile?: ClientProfile;
};

const navItems = [
  {
    label: "Dashboard",
    href: "/client",
  },
  {
    label: "My Pets",
    href: "/client/pets",
  },
  {
    label: "Appointments",
    href: "/client/appointments",
  },
  {
    label: "Health Records",
    href: "/client/records",
  },
  {
    label: "Purchases & Orders",
    href: "/client/orders",
  },
  {
    label: "Profile & Settings",
    href: "/client/settings",
  },
];

const summaryCards = [
  {
    label: "Next visit",
    value: "Oct 12",
    detail: "Full Groom",
  },
  {
    label: "Pet status",
    value: "Good",
    detail: "All records updated",
  },
  {
    label: "Total spent",
    value: "$128.00",
    detail: "This month",
  },
  {
    label: "Reward points",
    value: "340 pts",
    detail: "Available balance",
  },
];

const recentActivity = [
  {
    title: "Full Groom booked",
    description: "Mochi is scheduled for Oct 12 at 10:00 AM.",
    status: "Confirmed",
  },
  {
    title: "Health record updated",
    description: "Vaccination details were added for Coco.",
    status: "Updated",
  },
  {
    title: "Order completed",
    description: "Care Premium package payment was received.",
    status: "Paid",
  },
];

const pets = [
  {
    name: "Coco",
    breed: "Golden Retriever",
    age: "3 years",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&h=420&fit=crop&auto=format",
  },
  {
    name: "Milo",
    breed: "French Bulldog",
    age: "2 years",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&h=420&fit=crop&auto=format",
  },
];

const appointments = [
  {
    service: "Full Groom",
    pet: "Coco",
    date: "Oct 12",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    service: "Vet Checkup",
    pet: "Milo",
    date: "Oct 18",
    time: "12:30 PM",
    status: "Pending",
  },
  {
    service: "Dog Spa",
    pet: "Coco",
    date: "Oct 24",
    time: "09:00 AM",
    status: "Confirmed",
  },
];

const records = [
  {
    title: "Vaccination",
    pet: "Coco",
    date: "Sep 22",
    status: "Complete",
  },
  {
    title: "Dental Check",
    pet: "Milo",
    date: "Aug 14",
    status: "Complete",
  },
  {
    title: "Nutrition Review",
    pet: "Coco",
    date: "Jul 30",
    status: "Recommended",
  },
];

const orders = [
  {
    id: "#ORD-1004",
    item: "Care Premium",
    date: "Oct 01",
    total: "$128.00",
    status: "Paid",
  },
  {
    id: "#ORD-1003",
    item: "Full Groom",
    date: "Sep 18",
    total: "$95.00",
    status: "Paid",
  },
  {
    id: "#ORD-1002",
    item: "Dog Spa",
    date: "Sep 02",
    total: "$75.00",
    status: "Paid",
  },
];

export default function ClientDashboardShell({
  activePage,
  appointments = [],
  profile = fallbackClientProfile,
}: ClientDashboardShellProps) {
  const displayName = profile.full_name || fallbackClientProfile.full_name;
  const firstName = displayName.split(" ")[0];
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <Link href="/client" className={styles.logo}>
          <span className={styles.logoMark}>♥</span>
          <span>PawCare</span>
        </Link>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive =
              activePage === item.label ||
              (activePage === "Orders" && item.label === "Purchases & Orders") ||
              (activePage === "Settings" &&
                item.label === "Profile & Settings");

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`${styles.navLink} ${
                  isActive ? styles.activeNavLink : ""
                }`}
              >
                <span className={styles.navDot} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.userBox}>
          <div className={styles.avatar}>{initial}</div>
            <div>
              <strong>{displayName}</strong>
              <span>Client account</span>
            </div>
        </div>
      </aside>

      <main className={styles.main}>
        {activePage === "Dashboard" && <DashboardContent firstName={firstName} />}

        {activePage === "My Pets" && <PetsContent />}

        {activePage === "Appointments" && (
          <AppointmentsContent appointments={appointments} />
        )}

        {activePage === "Health Records" && <RecordsContent />}

        {activePage === "Orders" && <OrdersContent />}

        {activePage === "Settings" && <SettingsContent />}
      </main>
    </div>
  );
}

function DashboardContent({ firstName }: { firstName: string }) {
  return (
    <>
      <header className={styles.topbar}>
        <div>
          <p className={styles.breadcrumb}>Client / Dashboard</p>
          <h1>Welcome back, Sarah!</h1>
          <p>Review your pets, appointments, records, and recent activity.</p>
        </div>

        <Link href="/client/book" className={styles.primaryButton}>
          Book Appointment
        </Link>
      </header>

      <section className={styles.summaryGrid}>
        {summaryCards.map((card) => (
          <article className={styles.summaryCard} key={card.label}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <p>{card.detail}</p>
          </article>
        ))}
      </section>

      <section className={styles.contentGrid}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.eyebrow}>Recent activity</p>
              <h2>Latest updates</h2>
            </div>
          </div>

          <div className={styles.activityList}>
            {recentActivity.map((activity) => (
              <article className={styles.activityCard} key={activity.title}>
                <div>
                  <h3>{activity.title}</h3>
                  <p>{activity.description}</p>
                </div>

                <span>{activity.status}</span>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.eyebrow}>Quick actions</p>
              <h2>Manage care</h2>
            </div>
          </div>

          <div className={styles.quickList}>
            <Link href="/client/pets">Manage pets</Link>
            <Link href="/client/appointments">View appointments</Link>
            <Link href="/client/records">Open health records</Link>
            <Link href="/client/orders">Check orders</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function PetsContent() {
  return (
    <>
      <PageHeader
        breadcrumb="Client / My Pets"
        title="My Pets"
        description="Manage pet profiles, photos, care preferences, and basic information."
        actionLabel="Add New Pet"
      />

      <section className={styles.petGrid}>
        {pets.map((pet) => (
          <article className={styles.petCard} key={pet.name}>
            <img src={pet.image} alt={pet.name} />

            <div className={styles.petCardBody}>
              <div>
                <h2>{pet.name}</h2>
                <p>
                  {pet.breed} · {pet.age}
                </p>
              </div>

              <span>{pet.status}</span>
            </div>

            <Link href="/client/pets" className={styles.secondaryButton}>
              View profile
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}

function AppointmentsContent({
  appointments,
}: {
  appointments: ClientAppointment[];
}) {
  return (
    <>
      <PageHeader
        breadcrumb="Client / Appointments"
        title="Appointments"
        description="View upcoming visits and booking history."
        actionLabel="Book Appointment"
      />

      <section className={styles.panel}>
        {appointments.length === 0 ? (
          <div className={styles.emptyBox}>
            <h2>No appointments yet</h2>
            <p>Your saved bookings will appear here after you create them.</p>
          </div>
        ) : (
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <span>Service</span>
              <span>Pet</span>
              <span>Date</span>
              <span>Time</span>
              <span>Status</span>
            </div>

            {appointments.map((appointment) => (
              <div className={styles.tableRow} key={appointment.id}>
                <span>{appointment.service_name}</span>
                <span>{appointment.pet_name}</span>
                <span>{appointment.appointment_date}</span>
                <span>{appointment.appointment_time}</span>
                <strong>{appointment.status}</strong>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function RecordsContent() {
  return (
    <>
      <PageHeader
        breadcrumb="Client / Health Records"
        title="Health Records"
        description="Track medical records, grooming notes, vaccines, and care recommendations."
        actionLabel="Upload Record"
      />

      <section className={styles.panel}>
        <div className={styles.recordList}>
          {records.map((record) => (
            <article className={styles.recordCard} key={record.title}>
              <div>
                <h2>{record.title}</h2>
                <p>
                  {record.pet} · {record.date}
                </p>
              </div>

              <span>{record.status}</span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function OrdersContent() {
  return (
    <>
      <PageHeader
        breadcrumb="Client / Purchases & Orders"
        title="Purchases & Orders"
        description="Review payments, packages, and previous purchases."
        actionLabel="View Packages"
      />

      <section className={styles.panel}>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span>Order</span>
            <span>Item</span>
            <span>Date</span>
            <span>Total</span>
            <span>Status</span>
          </div>

          {orders.map((order) => (
            <div className={styles.tableRow} key={order.id}>
              <span>{order.id}</span>
              <span>{order.item}</span>
              <span>{order.date}</span>
              <span>{order.total}</span>
              <strong>{order.status}</strong>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function SettingsContent() {
  return (
    <>
      <PageHeader
        breadcrumb="Client / Profile & Settings"
        title="Profile & Settings"
        description="Manage personal information, notification preferences, and account settings."
      />

      <ClientSettingsForm />
    </>
  );
}

type PageHeaderProps = {
  breadcrumb: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};


function PageHeader({
  breadcrumb,
  title,
  description,
  actionLabel,
  actionHref,
}: PageHeaderProps) {
  return (
    <header className={styles.topbar}>
      <div>
        <p className={styles.breadcrumb}>{breadcrumb}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      {actionLabel && actionHref && (
        <Link href={actionHref} className={styles.primaryButton}>
          {actionLabel}
        </Link>
      )}

      {actionLabel && !actionHref && (
        <button type="button" className={styles.primaryButton}>
          {actionLabel}
        </button>
      )}
    </header>
  );
}