"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { type AdminService } from "../../lib/admin/services";
import AdminLayout from "./AdminLayout";
import shellStyles from "./AdminShell.module.css";
import styles from "./AdminServices.module.css";

type AdminServicesProps = {
  services: AdminService[];
};

type ServiceForm = {
  name: string;
  category: string;
  description: string;
  price: string;
  duration: string;
};

const emptyForm: ServiceForm = {
  name: "",
  category: "Wellness",
  description: "",
  price: "",
  duration: "",
};

export default function AdminServices({ services }: AdminServicesProps) {
  const router = useRouter();
  const [form, setForm] = useState<ServiceForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const activeCount = services.filter((service) => service.is_active).length;
  const inactiveCount = services.length - activeCount;

  function updateForm(field: keyof ServiceForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function createService() {
    if (!form.name.trim()) {
      return;
    }

    setSaving(true);

    try {
      await fetch("/api/admin/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          is_active: true,
        }),
      });

      setForm(emptyForm);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  async function toggleService(service: AdminService) {
    setUpdatingId(service.id);

    try {
      await fetch(`/api/admin/services/${service.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: service.name,
          category: service.category,
          description: service.description ?? "",
          price: service.price ?? "",
          duration: service.duration ?? "",
          is_active: !service.is_active,
        }),
      });

      router.refresh();
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <AdminLayout
      activePage="Services"
      breadcrumb="Admin / Services"
      title="Services"
    >
      <section className={shellStyles.statsGrid}>
        <article className={shellStyles.statCard}>
          <p className={shellStyles.statLabel}>Total services</p>
          <div className={shellStyles.statRow}>
            <h2>{services.length}</h2>
            <span>All</span>
          </div>
        </article>

        <article className={shellStyles.statCard}>
          <p className={shellStyles.statLabel}>Active services</p>
          <div className={shellStyles.statRow}>
            <h2>{activeCount}</h2>
            <span>Visible</span>
          </div>
        </article>

        <article className={shellStyles.statCard}>
          <p className={shellStyles.statLabel}>Inactive services</p>
          <div className={shellStyles.statRow}>
            <h2>{inactiveCount}</h2>
            <span>Hidden</span>
          </div>
        </article>

        <article className={shellStyles.statCard}>
          <p className={shellStyles.statLabel}>Booking source</p>
          <div className={shellStyles.statRow}>
            <h2>Next</h2>
            <span>Client</span>
          </div>
        </article>
      </section>

      <section className={styles.grid}>
        <article className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.eyebrow}>Service catalog</p>
              <h2>Current Services</h2>
            </div>

            <span>{services.length} records</span>
          </div>

          {services.length === 0 ? (
            <div className={styles.emptyBox}>
              <h2>No services yet</h2>
              <p>Add the first service from the form on the right.</p>
            </div>
          ) : (
            <div className={styles.serviceList}>
              {services.map((service) => (
                <article className={styles.serviceCard} key={service.id}>
                  <div>
                    <div className={styles.serviceTop}>
                      <strong>{service.name}</strong>
                      <span
                        className={
                          service.is_active
                            ? styles.activeBadge
                            : styles.inactiveBadge
                        }
                      >
                        {service.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <p>{service.description || "No description"}</p>

                    <div className={styles.meta}>
                      <span>{service.category}</span>
                      <span>{service.price || "No price"}</span>
                      <span>{service.duration || "No duration"}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleService(service)}
                    disabled={updatingId === service.id}
                  >
                    {service.is_active ? "Deactivate" : "Activate"}
                  </button>
                </article>
              ))}
            </div>
          )}
        </article>

        <aside className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.eyebrow}>New service</p>
              <h2>Add Service</h2>
            </div>
          </div>

          <div className={styles.form}>
            <label>
              <span>Name</span>
              <input
                value={form.name}
                onChange={(event) => updateForm("name", event.target.value)}
                placeholder="Full Grooming"
              />
            </label>

            <label>
              <span>Category</span>
              <input
                value={form.category}
                onChange={(event) =>
                  updateForm("category", event.target.value)
                }
                placeholder="Grooming"
              />
            </label>

            <label>
              <span>Price</span>
              <input
                value={form.price}
                onChange={(event) => updateForm("price", event.target.value)}
                placeholder="From $45"
              />
            </label>

            <label>
              <span>Duration</span>
              <input
                value={form.duration}
                onChange={(event) =>
                  updateForm("duration", event.target.value)
                }
                placeholder="60 min"
              />
            </label>

            <label>
              <span>Description</span>
              <textarea
                value={form.description}
                onChange={(event) =>
                  updateForm("description", event.target.value)
                }
                placeholder="Short service description"
              />
            </label>

            <button
              type="button"
              className={shellStyles.primaryButton}
              onClick={createService}
              disabled={saving || !form.name.trim()}
            >
              {saving ? "Saving..." : "Add Service"}
            </button>
          </div>
        </aside>
      </section>
    </AdminLayout>
  );
}