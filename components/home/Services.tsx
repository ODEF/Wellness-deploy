"use client";

import { useState } from "react";
import type { HomeContent } from "../../lib/home/homeContent";
import styles from "./Services.module.css";

type ServicesProps = {
  services: HomeContent["services"];
};

export default function Services({ services }: ServicesProps) {
  const [selectedId, setSelectedId] = useState(services.items[0]?.id ?? "");

  const selectedService =
    services.items.find((service) => service.id === selectedId) ??
    services.items[0];

  return (
    <section className={styles.section} id="services">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>{services.eyebrow}</p>
          <h2 className={styles.title}>{services.title}</h2>
          <p className={styles.subtitle}>{services.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {services.items.map((service) => {
            const isActive = service.id === selectedId;

            return (
              <button
                key={service.id}
                type="button"
                className={`${styles.serviceButton} ${
                  isActive ? styles.active : ""
                }`}
                onClick={() => setSelectedId(service.id)}
              >
                <span
                  className={styles.icon}
                  style={{
                    backgroundColor: isActive ? "rgba(253, 248, 240, 0.14)" : service.background,
                    color: isActive ? "#fdf8f0" : service.color,
                  }}
                >
                  {service.icon}
                </span>

                <span className={styles.serviceText}>
                  <strong>{service.title}</strong>
                  <small>{service.tagline}</small>
                </span>
              </button>
            );
          })}
        </div>

        {selectedService && (
          <article className={styles.detailCard}>
            <div
              className={styles.detailIcon}
              style={{
                backgroundColor: selectedService.background,
                color: selectedService.color,
              }}
            >
              {selectedService.icon}
            </div>

            <div>
              <p className={styles.detailEyebrow}>Selected service</p>
              <h3 className={styles.detailTitle}>{selectedService.title}</h3>
              <p className={styles.detailText}>{selectedService.description}</p>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}