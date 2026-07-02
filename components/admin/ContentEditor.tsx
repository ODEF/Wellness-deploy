"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { homeContent, type HomeHeroContent } from "../../lib/home/homeContent";
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

type HeroDraft = Pick<
  HomeHeroContent,
  | "trustBadge"
  | "titleMain"
  | "titleHighlight"
  | "subtitle"
  | "primaryButtonText"
  | "primaryButtonLink"
  | "heroImageUrl"
>;

const initialHeroDraft: HeroDraft = {
  trustBadge: homeContent.hero.trustBadge,
  titleMain: homeContent.hero.titleMain,
  titleHighlight: homeContent.hero.titleHighlight,
  subtitle: homeContent.hero.subtitle,
  primaryButtonText: homeContent.hero.primaryButtonText,
  primaryButtonLink: homeContent.hero.primaryButtonLink,
  heroImageUrl: homeContent.hero.heroImageUrl,
};

export default function ContentEditor() {
  const [selectedSection, setSelectedSection] = useState("Hero");
  const [heroDraft, setHeroDraft] = useState<HeroDraft>(initialHeroDraft);
  const [status, setStatus] = useState<"Loading" | "Draft" | "Saving" | "Saved" | "Error">(
    "Loading",
  );

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch("/api/admin/home", {
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error ?? "Failed to load content");
        }

        setHeroDraft({
          trustBadge: result.content.hero.trustBadge,
          titleMain: result.content.hero.titleMain,
          titleHighlight: result.content.hero.titleHighlight,
          subtitle: result.content.hero.subtitle,
          primaryButtonText: result.content.hero.primaryButtonText,
          primaryButtonLink: result.content.hero.primaryButtonLink,
          heroImageUrl: result.content.hero.heroImageUrl,
        });

        setStatus("Saved");
      } catch (error) {
        console.error(error);
        setStatus("Error");
      }
    }

    loadContent();
  }, []);

  function updateHeroField(field: keyof HeroDraft, value: string) {
    setHeroDraft((current) => ({
      ...current,
      [field]: value,
    }));

    setStatus("Draft");
  }

  async function handleSave() {
    try {
      setStatus("Saving");

      const response = await fetch("/api/admin/home", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hero: heroDraft,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Failed to save content");
      }

      setStatus("Saved");
    } catch (error) {
      console.error(error);
      setStatus("Error");
    }
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

            <button
              className={styles.primaryButton}
              onClick={handleSave}
              disabled={status === "Loading" || status === "Saving"}
            >
              {status === "Saving" ? "Saving..." : "Save Changes"}
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
                  status === "Saved"
                    ? styles.savedBadge
                    : status === "Error"
                      ? styles.errorBadge
                      : ""
                }`}
              >
                {status}
              </span>
            </div>

            {selectedSection === "Hero" ? (
              <>
                {status === "Loading" ? (
                  <div className={styles.loadingBox}>Loading content...</div>
                ) : (
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
                            updateHeroField(
                              "primaryButtonText",
                              event.target.value,
                            )
                          }
                        />
                      </label>

                      <label className={styles.field}>
                        <span>Primary button link</span>
                        <input
                          value={heroDraft.primaryButtonLink}
                          onChange={(event) =>
                            updateHeroField(
                              "primaryButtonLink",
                              event.target.value,
                            )
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
                      <button
                        className={styles.cancelButton}
                        onClick={handleReset}
                        disabled={status === "Saving"}
                      >
                        Reset
                      </button>

                      <button
                        className={styles.primaryButton}
                        onClick={handleSave}
                        disabled={status === "Saving"}
                      >
                        {status === "Saving" ? "Saving..." : "Save Hero"}
                      </button>
                    </div>
                  </>
                )}
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