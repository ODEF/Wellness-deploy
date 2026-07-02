"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./ContentEditor.module.css";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", active: false },
  { label: "Appointments", href: "/admin", active: false },
  { label: "Clients", href: "/admin", active: false },
  { label: "Services", href: "/admin", active: false },
  { label: "Bookings", href: "/admin", active: false },
  { label: "Payments", href: "/admin", active: false },
  { label: "Website Content", href: "/admin/content", active: true },
  { label: "Settings", href: "/admin", active: false },
];

const sections = [
  "Hero",
  "Features",
  "Services",
  "Grooming",
  "Packages",
  "Other Services",
  "Testimonials",
  "Final CTA",
];

type HeroDraft = {
  trustBadge: string;
  titleMain: string;
  titleHighlight: string;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  heroImageUrl: string;
};

const initialHeroDraft: HeroDraft = {
  trustBadge: "Trusted by 4,200+ families",
  titleMain: "Personalised wellness care",
  titleHighlight: "for your dog",
  subtitle:
    "Choose what your dog needs today and we will guide you to the right service — grooming, vet care, spa, hotel, training, and more.",
  primaryButtonText: "Start Now",
  primaryButtonLink: "#services",
  heroImageUrl:
    "https://images.unsplash.com/photo-1768676936784-22a5796db0fe?w=880&h=1100&fit=crop&auto=format",
};

export default function ContentEditor() {
  const [selectedSection, setSelectedSection] = useState("Hero");
  const [heroDraft, setHeroDraft] = useState<HeroDraft>(initialHeroDraft);
  const [status, setStatus] = useState<"Draft" | "Saved">("Draft");

  function updateHeroField(field: keyof HeroDraft, value: string) {
    setHeroDraft((current) => ({
      ...current,
      [field]: value,
    }));

    setStatus("Draft");
  }

  function handleSave() {
    setStatus("Saved");
  }

  function handleReset() {
    setHeroDraft(initialHeroDraft);
    setStatus("Draft");
  }

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
            <p className={styles.breadcrumb}>Admin / Website Content</p>
            <h1 className={styles.pageTitle}>Homepage Content Editor</h1>
          </div>

          <div className={styles.topbarActions}>
            <Link href="/" className={styles.secondaryButton}>
              Preview Website
            </Link>

            <button className={styles.primaryButton} onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </header>

        <section className={styles.editorGrid}>
          <aside className={styles.sectionsPanel}>
            <h2>Page Sections</h2>

            <div className={styles.sectionList}>
              {sections.map((section, index) => (
                <button
                  key={section}
                  type="button"
                  className={
                    selectedSection === section ? styles.selectedSection : ""
                  }
                  onClick={() => setSelectedSection(section)}
                >
                  <span>{section}</span>
                  <small>{index + 1}</small>
                </button>
              ))}
            </div>
          </aside>

          <section className={styles.formPanel}>
            <div className={styles.formHeader}>
              <div>
                <p className={styles.formEyebrow}>Selected section</p>
                <h2>{selectedSection} Section</h2>
              </div>

              <span
                className={`${styles.statusBadge} ${
                  status === "Saved" ? styles.savedBadge : ""
                }`}
              >
                {status}
              </span>
            </div>

            {selectedSection === "Hero" ? (
              <>
                <div className={styles.formGrid}>
                  <label className={styles.field}>
                    <span>Trust badge</span>
                    <input
                      value={heroDraft.trustBadge}
                      onChange={(event) =>
                        updateHeroField("trustBadge", event.target.value)
                      }
                    />
                  </label>

                  <label className={styles.field}>
                    <span>Main title</span>
                    <input
                      value={heroDraft.titleMain}
                      onChange={(event) =>
                        updateHeroField("titleMain", event.target.value)
                      }
                    />
                  </label>

                  <label className={styles.field}>
                    <span>Highlighted title</span>
                    <input
                      value={heroDraft.titleHighlight}
                      onChange={(event) =>
                        updateHeroField("titleHighlight", event.target.value)
                      }
                    />
                  </label>

                  <label className={styles.field}>
                    <span>Primary button text</span>
                    <input
                      value={heroDraft.primaryButtonText}
                      onChange={(event) =>
                        updateHeroField("primaryButtonText", event.target.value)
                      }
                    />
                  </label>

                  <label className={styles.field}>
                    <span>Primary button link</span>
                    <input
                      value={heroDraft.primaryButtonLink}
                      onChange={(event) =>
                        updateHeroField("primaryButtonLink", event.target.value)
                      }
                    />
                  </label>

                  <label className={`${styles.field} ${styles.full}`}>
                    <span>Subtitle</span>
                    <textarea
                      value={heroDraft.subtitle}
                      onChange={(event) =>
                        updateHeroField("subtitle", event.target.value)
                      }
                    />
                  </label>

                  <label className={`${styles.field} ${styles.full}`}>
                    <span>Hero image URL</span>
                    <input
                      value={heroDraft.heroImageUrl}
                      onChange={(event) =>
                        updateHeroField("heroImageUrl", event.target.value)
                      }
                    />
                  </label>
                </div>

                <div className={styles.buttonRow}>
                  <button className={styles.cancelButton} onClick={handleReset}>
                    Reset
                  </button>

                  <button className={styles.primaryButton} onClick={handleSave}>
                    Save Hero
                  </button>
                </div>
              </>
            ) : (
              <div className={styles.emptyState}>
                <h3>{selectedSection} editor is not active yet</h3>
                <p>
                  We are starting with the Hero section first. After this works,
                  we will add editable fields for {selectedSection}.
                </p>
              </div>
            )}
          </section>

          <aside className={styles.previewPanel}>
            <h2>Live Preview</h2>

            <div className={styles.previewCard}>
              <div className={styles.previewBadge}>{heroDraft.trustBadge}</div>

              <h3>
                {heroDraft.titleMain} <em>{heroDraft.titleHighlight}</em>
              </h3>

              <p>{heroDraft.subtitle}</p>

              <div
                className={styles.previewImage}
                style={{
                  backgroundImage: `linear-gradient(rgba(44, 26, 14, 0.1), rgba(44, 26, 14, 0.1)), url("${heroDraft.heroImageUrl}")`,
                }}
              />

              <a href={heroDraft.primaryButtonLink}>
                {heroDraft.primaryButtonText}
              </a>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}