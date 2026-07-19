"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type ClientAppointment } from "../../lib/clients/appointments";
import AdminLayout from "./AdminLayout";
import shellStyles from "./AdminShell.module.css";
import styles from "./AdminAppointments.module.css";

type AdminAppointmentsProps = {
  appointments: ClientAppointment[];
};

export default function AdminAppointments({
  appointments,
}: AdminAppointmentsProps) {
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const pendingCount = appointments.filter(
    (appointment) => appointment.status === "Pending",
  ).length;

  const confirmedCount = appointments.filter(
    (appointment) => appointment.status === "Confirmed",
  ).length;

  const completedCount = appointments.filter(
    (appointment) => appointment.status === "Completed",
  ).length;

  async function updateStatus(id: string, status: string) {
    setUpdatingId(id);

    try {
      await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      router.refresh();
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <AdminLayout
      activePage="Appointments"
      breadcrumb="Admin / Appointments"
      title="Appointments"
      actions={
        <Link href="/client/book" className={shellStyles.primaryButton}>
          + New Appointment
        </Link>
      }
    >
      <section className={shellStyles.statsGrid}>
        <article className={shellStyles.statCard}>
          <p className={shellStyles.statLabel}>Total appointments</p>
          <div className={shellStyles.statRow}>
            <h2>{appointments.length}</h2>
            <span>All</span>
          </div>
        </article>

        <article className={shellStyles.statCard}>
          <p className={shellStyles.statLabel}>Pending</p>
          <div className={shellStyles.statRow}>
            <h2>{pendingCount}</h2>
            <span>Review</span>
          </div>
        </article>

        <article className={shellStyles.statCard}>
          <p className={shellStyles.statLabel}>Confirmed</p>
          <div className={shellStyles.statRow}>
            <h2>{confirmedCount}</h2>
            <span>Approved</span>
          </div>
        </article>

        <article className={shellStyles.statCard}>
          <p className={shellStyles.statLabel}>Completed</p>
          <div className={shellStyles.statRow}>
            <h2>{completedCount}</h2>
            <span>Done</span>
          </div>
        </article>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.eyebrow}>Booking records</p>
            <h2>Client Appointments</h2>
          </div>

          <span>{appointments.length} records</span>
        </div>

        {appointments.length === 0 ? (
          <div className={styles.emptyBox}>
            <h2>No appointments yet</h2>
            <p>Client bookings will appear here after they are created.</p>
          </div>
        ) : (
          <div className={styles.table}>
            <div className={styles.tableHeader}>
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
                <strong>{appointment.client_name}</strong>
                <span>{appointment.pet_name}</span>
                <span>{appointment.service_name}</span>
                <span>{appointment.appointment_date}</span>
                <span>{appointment.appointment_time}</span>

                <span className={styles.status}>{appointment.status}</span>

                <div className={styles.actions}>
                  {appointment.status !== "Confirmed" ? (
                    <button
                      type="button"
                      disabled={updatingId === appointment.id}
                      onClick={() => updateStatus(appointment.id, "Confirmed")}
                    >
                      Confirm
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={updatingId === appointment.id}
                      onClick={() => updateStatus(appointment.id, "Pending")}
                    >
                      Undo
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </AdminLayout>
  );
}