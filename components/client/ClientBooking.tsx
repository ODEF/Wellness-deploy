"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./ClientBooking.module.css";

const pets = ["Coco", "Milo"];
const services = [
  "Full Groom",
  "Bath & Blow Dry",
  "Vet Checkup",
  "Dog Spa",
  "Training Session",
  "Nutrition Consultation",
];

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:30 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM",
];

export default function ClientBooking() {
  const [selectedPet, setSelectedPet] = useState(pets[0]);
  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(timeSlots[1]);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<
    "Draft" | "Saving" | "Confirmed" | "Error"
    >("Draft");

async function handleConfirm() {
  if (!selectedDate) {
    setStatus("Error");
    return;
  }

  try {
    setStatus("Saving");

    const response = await fetch("/api/client/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        petName: selectedPet,
        serviceName: selectedService,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        notes,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error ?? "Failed to create appointment");
    }

    setStatus("Confirmed");
  } catch (error) {
    console.error(error);
    setStatus("Error");
  }
}

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <Link href="/client" className={styles.logo}>
          <span className={styles.logoMark}>♥</span>
          <span>PawCare</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/client">Dashboard</Link>
          <Link href="/client/pets">My Pets</Link>
          <Link href="/client/appointments">Appointments</Link>
          <Link href="/client/records">Health Records</Link>
          <Link href="/client/orders">Purchases & Orders</Link>
          <Link href="/client/settings">Profile & Settings</Link>
        </nav>

        <div className={styles.userBox}>
          <div className={styles.avatar}>S</div>
          <div>
            <strong>Sarah J.</strong>
            <span>Client account</span>
          </div>
        </div>
      </aside>

      <section className={styles.main}>
        <header className={styles.topbar}>
          <div>
            <p className={styles.breadcrumb}>Client / Book Appointment</p>
            <h1>Book an appointment</h1>
            <p>
              Choose your pet, service, date, and time. Confirmation will later
              be saved into Supabase.
            </p>
          </div>

          <Link href="/client/book" className={styles.primaryButton}>
            Book Appointment
          </Link>
        </header>

        <section className={styles.bookingGrid}>
          <div className={styles.formPanel}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Step 1</p>
              <h2>Booking details</h2>
            </div>

            <div className={styles.formGrid}>
              <label className={styles.field}>
                <span>Pet</span>
                <select
                  value={selectedPet}
                  onChange={(event) => setSelectedPet(event.target.value)}
                >
                  {pets.map((pet) => (
                    <option key={pet}>{pet}</option>
                  ))}
                </select>
              </label>

              <label className={styles.field}>
                <span>Service</span>
                <select
                  value={selectedService}
                  onChange={(event) => setSelectedService(event.target.value)}
                >
                  {services.map((service) => (
                    <option key={service}>{service}</option>
                  ))}
                </select>
              </label>

              <label className={styles.field}>
                <span>Date</span>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                />
              </label>

              <label className={styles.field}>
                <span>Preferred time</span>
                <select
                  value={selectedTime}
                  onChange={(event) => setSelectedTime(event.target.value)}
                >
                  {timeSlots.map((time) => (
                    <option key={time}>{time}</option>
                  ))}
                </select>
              </label>

              <label className={`${styles.field} ${styles.full}`}>
                <span>Notes for the team</span>
                <textarea
                  value={notes}
                  placeholder="Example: Coco is nervous around dryers."
                  onChange={(event) => setNotes(event.target.value)}
                />
              </label>
            </div>

            <div className={styles.buttonRow}>
              <Link href="/client" className={styles.cancelButton}>
                Cancel
              </Link>

              <button
                type="button"
                className={styles.primaryButton}
                onClick={handleConfirm}
                disabled={status === "Saving"}
                >
                {status === "Saving" ? "Saving..." : "Confirm Booking"}
            </button>
            </div>
          </div>

          <aside className={styles.summaryPanel}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Step 2</p>
              <h2>Booking summary</h2>
            </div>

            <div className={styles.summaryCard}>
              <div>
                <span>Pet</span>
                <strong>{selectedPet}</strong>
              </div>

              <div>
                <span>Service</span>
                <strong>{selectedService}</strong>
              </div>

              <div>
                <span>Date</span>
                <strong>{selectedDate || "Select date"}</strong>
              </div>

              <div>
                <span>Time</span>
                <strong>{selectedTime}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>{status}</strong>
              </div>
            </div>

            {status === "Confirmed" && (
              <div className={styles.successBox}>
                <h3>Booking prepared</h3>
                <p>
                  This is currently frontend-only. Next we will save this
                  booking into Supabase and show it inside Appointments.
                </p>
              </div>
            )}
            {status === "Error" && (
                <div className={styles.errorBox}>
                    <h3>Booking was not saved</h3>
                    <p>Please select a date and try again.</p>
                </div>
            )}
          </aside>
        </section>
      </section>
    </main>
  );
}