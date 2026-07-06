"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./ClientDashboardShell.module.css";

type ProfileForm = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
};

type SaveStatus = "Idle" | "Loading" | "Saving" | "Saved" | "Error";

const fallbackProfile: ProfileForm = {
  fullName: "Sarah Johnson",
  email: "sarah@example.com",
  phone: "+995 555 123 456",
  address: "Tbilisi, Georgia",
};

export default function ClientSettingsForm() {
  const [profile, setProfile] = useState<ProfileForm>(fallbackProfile);
  const [status, setStatus] = useState<SaveStatus>("Loading");

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch("/api/client/profile");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error ?? "Failed to load profile");
        }

        if (result.profile) {
          setProfile({
            fullName: result.profile.full_name ?? "",
            email: result.profile.email ?? "",
            phone: result.profile.phone ?? "",
            address: result.profile.address ?? "",
          });
        }

        setStatus("Idle");
      } catch (error) {
        console.error(error);
        setStatus("Error");
      }
    }

    loadProfile();
  }, []);

  function updateProfile(field: keyof ProfileForm, value: string) {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));

    if (status === "Saved") {
      setStatus("Idle");
    }
  }

  async function handleSave() {
    if (!profile.fullName.trim()) {
      setStatus("Error");
      return;
    }

    try {
      setStatus("Saving");

      const response = await fetch("/api/client/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Failed to save profile");
      }

      setStatus("Saved");
    } catch (error) {
      console.error(error);
      setStatus("Error");
    }
  }

  return (
    <section className={styles.settingsGrid}>
      <div className={styles.panel}>
        <div className={styles.formGrid}>
          <label className={styles.field}>
            <span>Full name</span>
            <input
              value={profile.fullName}
              onChange={(event) =>
                updateProfile("fullName", event.target.value)
              }
            />
          </label>

          <label className={styles.field}>
            <span>Email</span>
            <input
              value={profile.email}
              onChange={(event) => updateProfile("email", event.target.value)}
            />
          </label>

          <label className={styles.field}>
            <span>Phone</span>
            <input
              value={profile.phone}
              onChange={(event) => updateProfile("phone", event.target.value)}
            />
          </label>

          <label className={styles.field}>
            <span>Address</span>
            <input
              value={profile.address}
              onChange={(event) => updateProfile("address", event.target.value)}
            />
          </label>
        </div>

        <div className={styles.saveRow}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={handleSave}
            disabled={status === "Saving" || status === "Loading"}
          >
            {status === "Saving" ? "Saving..." : "Save Changes"}
          </button>

          {status === "Saved" && (
            <span className={styles.successText}>Profile saved</span>
          )}

          {status === "Error" && (
            <span className={styles.errorText}>
              Profile was not saved. Check API/table.
            </span>
          )}
        </div>
      </div>

      <div className={styles.planCard}>
        <p className={styles.eyebrow}>Current plan</p>
        <h2>Care Premium</h2>
        <p>
          Includes grooming reminders, appointment history, and priority
          booking.
        </p>

        <Link href="/client/orders">Manage plan</Link>
      </div>
    </section>
  );
}