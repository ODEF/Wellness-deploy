"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  homeContent,
  type HomeContent,
  type HomeHeroContent,
} from "../../lib/home/homeContent";
import styles from "./ContentEditor.module.css";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", active: true },
  { label: "Appointments", href: "/admin/appointments" },
  { label: "Activity Logs", href: "/admin/activity" },
  { label: "Website Content", href: "/admin/content" },

  // Temporary links until these pages are fully built
  { label: "Clients", href: "/admin/clients" },
  { label: "Services", href: "/admin" },
  { label: "Bookings", href: "/admin/appointments" },
  { label: "Payments", href: "/admin" },
  { label: "Settings", href: "/admin" },
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

///after update in api
//we are updating here
//1
//adding services and grooming and packages and other services and testimonials and final cta

type FeaturesDraft = HomeContent["features"];
type ServicesDraft = HomeContent["services"];
type GroomingDraft = HomeContent["grooming"];
type PackagesDraft = HomeContent["packages"];
type OtherServicesDraft = HomeContent["otherServices"];
type TestimonialsDraft = HomeContent["testimonials"];
type FinalCtaDraft = HomeContent["finalCta"];
// 
// 

const initialHeroDraft: HeroDraft = {
  trustBadge: homeContent.hero.trustBadge,
  titleMain: homeContent.hero.titleMain,
  titleHighlight: homeContent.hero.titleHighlight,
  subtitle: homeContent.hero.subtitle,
  primaryButtonText: homeContent.hero.primaryButtonText,
  primaryButtonLink: homeContent.hero.primaryButtonLink,
  heroImageUrl: homeContent.hero.heroImageUrl,
};

/////after adding on top newly added services and grooming and packages and other services and testimonials and final cta
//we add another initial draft for each of them
//here
///==================================================================================
///===================================initial drafts===============================================
///==================================My Edit================================================

const initialFeaturesDraft: FeaturesDraft = homeContent.features;
const initialServicesDraft: ServicesDraft = homeContent.services;
const initialGroomingDraft: GroomingDraft = homeContent.grooming;
const initialPackagesDraft: PackagesDraft = homeContent.packages;
const initialOtherServicesDraft: OtherServicesDraft = homeContent.otherServices;
const initialTestimonialsDraft: TestimonialsDraft = homeContent.testimonials;
const initialFinalCtaDraft: FinalCtaDraft = homeContent.finalCta;
///==================================================================================
///==================================================================================
///==================================================================================
///
export default function ContentEditor() {
  const [selectedSection, setSelectedSection] = useState("Hero");
  const [heroDraft, setHeroDraft] = useState<HeroDraft>(initialHeroDraft);

//   gets old
// updates with new content from api
// updates STATE useState
  const [featuresDraft, setFeaturesDraft] =
    useState<FeaturesDraft>(initialFeaturesDraft);

  const [servicesDraft, setServicesDraft] =
    useState<ServicesDraft>(initialServicesDraft);

  const [groomingDraft, setGroomingDraft] = 
    useState<GroomingDraft>(initialGroomingDraft);  

  const [packagesDraft, setPackagesDraft] = 
    useState<PackagesDraft>(initialPackagesDraft);

  const [status, setStatus] = useState<
    "Loading" | "Draft" | "Saving" | "Saved" | "Error"
  >("Loading");

const [otherServicesDraft, setOtherServicesDraft] =
  useState<OtherServicesDraft>(initialOtherServicesDraft);

const [testimonialsDraft, setTestimonialsDraft] =
  useState<TestimonialsDraft>(initialTestimonialsDraft);

const [finalCtaDraft, setFinalCtaDraft] =
  useState<FinalCtaDraft>(initialFinalCtaDraft);

//   for the preview website mirroring
    const [previewVersion, setPreviewVersion] = useState(0);
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

        // Load Grooming from Supabase
        //set of updating elements
        setFeaturesDraft(result.content.features);
        setServicesDraft(result.content.services);
        setGroomingDraft(result.content.grooming);
        setPackagesDraft(result.content.packages);
        setOtherServicesDraft(result.content.otherServices);
        setTestimonialsDraft(result.content.testimonials);
        setFinalCtaDraft(result.content.finalCta);
        // =======================================
        // =======================================
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

    function updateFeaturesField(
        field: keyof Omit<FeaturesDraft, "items">,
        value: string,
    ) {
        setFeaturesDraft((current) => ({
        ...current,
        [field]: value,
        }));

        setStatus("Draft");
    }

    function updateFeatureItem(
        index: number,
        field: keyof FeaturesDraft["items"][number],
        value: string,
    ) {
        setFeaturesDraft((current) => ({
        ...current,
        items: current.items.map((item, itemIndex) =>
            itemIndex === index
            ? {
                ...item,
                [field]: value,
                }
            : item,
        ),
        }));

        setStatus("Draft");
    }
    function updateTestimonialsField(
    field: keyof Omit<TestimonialsDraft, "stats" | "items">,
    value: string,
    ) {
    setTestimonialsDraft((current) => ({
        ...current,
        [field]: value,
    }));

    setStatus("Draft");
    }

    function updateTestimonialStat(
    index: number,
    field: keyof TestimonialsDraft["stats"][number],
    value: string,
    ) {
    setTestimonialsDraft((current) => ({
        ...current,
        stats: current.stats.map((stat, statIndex) =>
        statIndex === index
            ? {
                ...stat,
                [field]: value,
            }
            : stat,
        ),
    }));

    setStatus("Draft");
    }

    function updateTestimonialItem(
        index: number,
        field: keyof TestimonialsDraft["items"][number],
        value: string,
    ) {
    setTestimonialsDraft((current) => ({
        ...current,
        items: current.items.map((item, itemIndex) =>
        itemIndex === index
            ? {
                ...item,
                [field]: value,
            }
            : item,
        ),
    }));

    setStatus("Draft");
    }

//   =============================================================================
// Add Services update functions
// 
// 
    function updateServicesField(
    field: keyof Omit<ServicesDraft, "items">,
    value: string,
    ) {
    setServicesDraft((current) => ({
        ...current,
        [field]: value,
    }));

    setStatus("Draft");
    }

    function updateServiceItem(
        index: number,
        field: keyof ServicesDraft["items"][number],
        value: string,
    ) {
        setServicesDraft((current) => ({
        ...current,
        items: current.items.map((item, itemIndex) =>
        itemIndex === index
            ? {
                ...item,
                [field]: value,
            }
            : item,
        ),
    }));
    
        setStatus("Draft");
    }
    // update grooming functions
    function updateGroomingField(
    field: keyof Omit<GroomingDraft, "items">,
    value: string,
    ) {
    setGroomingDraft((current) => ({
        ...current,
        [field]: value,
    }));

    setStatus("Draft");
    }
    function updateGroomingItem(
    index: number,
    field: keyof GroomingDraft["items"][number],
    value: string,
    ) {
    setGroomingDraft((current) => ({
        ...current,
        items: current.items.map((item, itemIndex) =>
        itemIndex === index
            ? {
                ...item,
                [field]: value,
            }
            : item,
        ),
    }));

    setStatus("Draft");
    }

    function updatePackagesField(
    field: keyof Omit<PackagesDraft, "items">,
    value: string,
    ) {
    setPackagesDraft((current) => ({
        ...current,
        [field]: value,
    }));

    setStatus("Draft");
    }

    function updatePackageItem<
    Field extends keyof Omit<PackagesDraft["items"][number], "features">,
    >(
    index: number,
    field: Field,
    value: PackagesDraft["items"][number][Field],
    ) {
    setPackagesDraft((current) => ({
        ...current,
        items: current.items.map((item, itemIndex) =>
        itemIndex === index
            ? {
                ...item,
                [field]: value,
            }
            : item,
        ),
    }));

    setStatus("Draft");
    }

    function updatePackageFeature(
    packageIndex: number,
    featureIndex: number,
    value: string,
    ) {
    setPackagesDraft((current) => ({
        ...current,
        items: current.items.map((item, itemIndex) =>
        itemIndex === packageIndex
            ? {
                ...item,
                features: item.features.map((feature, currentFeatureIndex) =>
                currentFeatureIndex === featureIndex ? value : feature,
                ),
            }
            : item,
        ),
    }));

    setStatus("Draft");
    }

    function updateOtherServicesField(
    field: keyof Omit<OtherServicesDraft, "items">,
    value: string,
    ) {
    setOtherServicesDraft((current) => ({
        ...current,
        [field]: value,
    }));

    setStatus("Draft");
    }

    function updateOtherServiceItem(
    index: number,
    field: keyof OtherServicesDraft["items"][number],
    value: string,
    ) {
    setOtherServicesDraft((current) => ({
        ...current,
        items: current.items.map((item, itemIndex) =>
        itemIndex === index
            ? {
                ...item,
                [field]: value,
            }
            : item,
        ),
    }));

    setStatus("Draft");
    }

    // Final CTA update functions
    function updateFinalCtaField(
    field: keyof Omit<FinalCtaDraft, "contactItems">,
    value: string,
    ) {
    setFinalCtaDraft((current) => ({
        ...current,
        [field]: value,
    }));

    setStatus("Draft");
    }

    function updateFinalCtaContactItem(
    index: number,
    field: keyof FinalCtaDraft["contactItems"][number],
    value: string,
    ) {
    setFinalCtaDraft((current) => ({
        ...current,
        contactItems: current.contactItems.map((item, itemIndex) =>
        itemIndex === index
            ? {
                ...item,
                [field]: value,
            }
            : item,
        ),
    }));

    setStatus("Draft");
    }

    // 

  async function handleSave() {
    try {
      setStatus("Saving");

      const response = await fetch("/api/admin/home", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // 7. Send  to API
        body: JSON.stringify({
            hero: heroDraft,
            features: featuresDraft,
            services: servicesDraft,
            grooming: groomingDraft,
            packages: packagesDraft,
            otherServices: otherServicesDraft,
            testimonials: testimonialsDraft,
            finalCta: finalCtaDraft,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Failed to save content");
      }

      setStatus("Saved");
      setPreviewVersion((current) => current + 1);
    } catch (error) {
      console.error(error);
      setStatus("Error");
    }
  }

  function handleReset() {
    if (selectedSection === "Hero") {
      setHeroDraft(initialHeroDraft);
    }

    if (selectedSection === "Features") {
      setFeaturesDraft(initialFeaturesDraft);
    }

    // reset services draft
    if (selectedSection === "Services") {
        setServicesDraft(initialServicesDraft);
        }
    if (selectedSection === "Grooming") {
        setGroomingDraft(initialGroomingDraft);
    }
    if (selectedSection === "Packages") {
        setPackagesDraft(initialPackagesDraft);
    }
    if (selectedSection === "Other Services") {
        setOtherServicesDraft(initialOtherServicesDraft);
    }
    if (selectedSection === "Testimonials") {
        setTestimonialsDraft(initialTestimonialsDraft);
    }
    if (selectedSection === "Final CTA") {
        setFinalCtaDraft(initialFinalCtaDraft);
    }
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

            {status === "Loading" ? (
              <div className={styles.loadingBox}>Loading content...</div>
            ) : selectedSection === "Hero" ? (
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
            )  : selectedSection === "Services" ? (
            <>
                <div className={styles.formGrid}>
                <label className={styles.field}>
                    <span>Eyebrow</span>
                    <input
                    value={servicesDraft.eyebrow}
                    onChange={(event) =>
                        updateServicesField("eyebrow", event.target.value)
                    }
                    />
                </label>

                <label className={styles.field}>
                    <span>Title</span>
                    <input
                    value={servicesDraft.title}
                    onChange={(event) =>
                        updateServicesField("title", event.target.value)
                    }
                    />
                </label>

                <label className={`${styles.field} ${styles.full}`}>
                    <span>Subtitle</span>
                    <textarea
                    value={servicesDraft.subtitle}
                    onChange={(event) =>
                        updateServicesField("subtitle", event.target.value)
                    }
                    />
                </label>

                {servicesDraft.items.map((item, index) => (
                    <div className={styles.itemEditor} key={item.id}>
                    <h3>Service {index + 1}</h3>

                    <div className={styles.lockedField}>
                        <span>System ID</span>
                        <strong>{item.id}</strong>
                    </div>

                    <label className={styles.field}>
                        <span>Title</span>
                        <input
                        value={item.title}
                        onChange={(event) =>
                            updateServiceItem(index, "title", event.target.value)
                        }
                        />
                    </label>

                    <label className={styles.field}>
                        <span>Tagline</span>
                        <input
                        value={item.tagline}
                        onChange={(event) =>
                            updateServiceItem(index, "tagline", event.target.value)
                        }
                        />
                    </label>

                    <label className={styles.field}>
                        <span>Icon</span>
                        <input
                        value={item.icon}
                        onChange={(event) =>
                            updateServiceItem(index, "icon", event.target.value)
                        }
                        />
                    </label>

                    <label className={styles.field}>
                        <span>Color</span>
                        <input
                        value={item.color}
                        onChange={(event) =>
                            updateServiceItem(index, "color", event.target.value)
                        }
                        />
                    </label>

                    <label className={styles.field}>
                        <span>Background</span>
                        <input
                        value={item.background}
                        onChange={(event) =>
                            updateServiceItem(index, "background", event.target.value)
                        }
                        />
                    </label>

                    <label className={`${styles.field} ${styles.full}`}>
                        <span>Description</span>
                        <textarea
                        value={item.description}
                        onChange={(event) =>
                            updateServiceItem(index, "description", event.target.value)
                        }
                        />
                    </label>
                    </div>
                ))}
                </div>

                <div className={styles.buttonRow}>
                <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={handleReset}
                    disabled={status === "Saving"}
                >
                    Reset
                </button>

                <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={handleSave}
                    disabled={status === "Saving"}
                >
                    {status === "Saving" ? "Saving..." : "Save Services"}
                </button>
                </div>
            </>
            ) :  selectedSection === "Features" ? (
              <>
                <div className={styles.formGrid}>
                  <label className={styles.field}>
                    <span>Eyebrow</span>
                    <input
                      value={featuresDraft.eyebrow}
                      onChange={(event) =>
                        updateFeaturesField("eyebrow", event.target.value)
                      }
                    />
                  </label>

                  <label className={styles.field}>
                    <span>Title</span>
                    <input
                      value={featuresDraft.title}
                      onChange={(event) =>
                        updateFeaturesField("title", event.target.value)
                      }
                    />
                  </label>

                  <label className={`${styles.field} ${styles.full}`}>
                    <span>Subtitle</span>
                    <textarea
                      value={featuresDraft.subtitle}
                      onChange={(event) =>
                        updateFeaturesField("subtitle", event.target.value)
                      }
                    />
                  </label>

                  {featuresDraft.items.map((item, index) => (
                    <div className={styles.itemEditor} key={index}>
                      <h3>Feature {index + 1}</h3>

                      <label className={styles.field}>
                            <span>Icon fallback</span>
                            <input
                                value={item.icon}
                                onChange={(event) =>
                                updateFeatureItem(index, "icon", event.target.value)
                                }
                            />
                     </label>

                    <label className={styles.field}>
                    <span>
                        {item.imageUrl ? (
                            <img src={item.imageUrl} alt="" className={styles.previewFeatureImage} />
                        ) : (
                            item.icon
                        )}
                    </span>
                    <input
                        value={item.imageUrl ?? ""}
                        placeholder="iF YOU WANT TO USE AN IMAGE INSTEAD OF AN ICON, ENTER THE IMAGE URL HERE"
                        onChange={(event) =>
                        updateFeatureItem(index, "imageUrl", event.target.value)
                        }
                    />
                    </label>

                      <label className={styles.field}>
                        <span>Title</span>
                        <input
                          value={item.title}
                          onChange={(event) =>
                            updateFeatureItem(index, "title", event.target.value)
                          }
                        />
                      </label>

                      <label className={styles.field}>
                        <span>Description</span>
                        <textarea
                          value={item.description}
                          onChange={(event) =>
                            updateFeatureItem(
                              index,
                              "description",
                              event.target.value,
                            )
                          }
                        />
                      </label>
                    </div>
                  ))}
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
                    {status === "Saving" ? "Saving..." : "Save Features"}
                  </button>
                </div>
              </>
            // add groooomingggggg
            // 
            // 
            // 
            ) : selectedSection === "Grooming" ? (
            <>
                        <label className={styles.field}>
                        <span>Eyebrow</span>
                        <input
                            value={groomingDraft.eyebrow}
                            onChange={(event) =>
                            updateGroomingField("eyebrow", event.target.value)
                            }
                        />
                        </label>

                        <label className={styles.field}>
                            <span>Main title</span>
                            <input
                            value={groomingDraft.titleMain}
                            onChange={(event) =>
                                updateGroomingField("titleMain", event.target.value)
                            }
                            />
                        </label>

                        <label className={styles.field}>
                            <span>Highlighted title</span>
                            <input
                            value={groomingDraft.titleHighlight}
                            onChange={(event) =>
                                updateGroomingField("titleHighlight", event.target.value)
                            }
                            />
                        </label>

                        <label className={styles.field}>
                            <span>Button text</span>
                            <input
                            value={groomingDraft.buttonText}
                            onChange={(event) =>
                                updateGroomingField("buttonText", event.target.value)
                            }
                            />
                        </label>

                        <label className={styles.field}>
                            <span>Button link</span>
                            <input
                            value={groomingDraft.buttonLink}
                            onChange={(event) =>
                                updateGroomingField("buttonLink", event.target.value)
                            }
                            />
                        </label>

                        <label className={`${styles.field} ${styles.full}`}>
                            <span>Subtitle</span>
                            <textarea
                            value={groomingDraft.subtitle}
                            onChange={(event) =>
                                updateGroomingField("subtitle", event.target.value)
                            }
                            />
                        </label>

                        <label className={`${styles.field} ${styles.full}`}>
                            <span>Grooming image URL</span>
                            <input
                            value={groomingDraft.imageUrl}
                            onChange={(event) =>
                                updateGroomingField("imageUrl", event.target.value)
                            }
                            />
                        </label>

                

                        <div className={styles.buttonRow}>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={handleReset}
                            disabled={status === "Saving"}
                        >
                            Reset
                        </button>

                        <button
                            type="button"
                            className={styles.primaryButton}
                            onClick={handleSave}
                            disabled={status === "Saving"}
                        >
                            {status === "Saving" ? "Saving..." : "Save Grooming"}
                        </button>
                        </div>
            </>) : selectedSection === "Packages" ? (
            <>
                <div className={styles.formGrid}>
                <label className={styles.field}>
                    <span>Eyebrow</span>
                    <input
                    value={packagesDraft.eyebrow}
                    onChange={(event) =>
                        updatePackagesField("eyebrow", event.target.value)
                    }
                    />
                </label>

                <label className={styles.field}>
                    <span>Title</span>
                    <input
                    value={packagesDraft.title}
                    onChange={(event) =>
                        updatePackagesField("title", event.target.value)
                    }
                    />
                </label>

                <label className={`${styles.field} ${styles.full}`}>
                    <span>Subtitle</span>
                    <textarea
                    value={packagesDraft.subtitle}
                    onChange={(event) =>
                        updatePackagesField("subtitle", event.target.value)
                    }
                    />
                </label>

                {packagesDraft.items.map((item, packageIndex) => (
                    <div className={styles.itemEditor} key={packageIndex}>
                    <h3>Package {packageIndex + 1}</h3>

                    <label className={styles.field}>
                        <span>Name</span>
                        <input
                        value={item.name}
                        onChange={(event) =>
                            updatePackageItem(packageIndex, "name", event.target.value)
                        }
                        />
                    </label>

                    <label className={styles.field}>
                        <span>Tagline</span>
                        <input
                        value={item.tagline}
                        onChange={(event) =>
                            updatePackageItem(packageIndex, "tagline", event.target.value)
                        }
                        />
                    </label>

                    <label className={styles.field}>
                        <span>Price</span>
                        <input
                        value={item.price}
                        onChange={(event) =>
                            updatePackageItem(packageIndex, "price", event.target.value)
                        }
                        />
                    </label>

                    <label className={styles.checkboxField}>
                        <input
                        type="checkbox"
                        checked={item.popular}
                        onChange={(event) =>
                            updatePackageItem(packageIndex, "popular", event.target.checked)
                        }
                        />
                        <span>Mark as popular</span>
                    </label>

                    <div className={styles.packageFeatures}>
                        <h4>Included features</h4>

                        {item.features.map((feature, featureIndex) => (
                        <label className={styles.field} key={featureIndex}>
                            <span>Feature {featureIndex + 1}</span>
                            <input
                            value={feature}
                            onChange={(event) =>
                                updatePackageFeature(
                                packageIndex,
                                featureIndex,
                                event.target.value,
                                )
                            }
                            />
                        </label>
                        ))}
                    </div>
                    </div>
                ))}
                </div>

                <div className={styles.buttonRow}>
                <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={handleReset}
                    disabled={status === "Saving"}
                >
                    Reset
                </button>

                <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={handleSave}
                    disabled={status === "Saving"}
                >
                    {status === "Saving" ? "Saving..." : "Save Packages"}
                </button>
                </div>
            </>) : selectedSection === "Other Services" ? (
            <>
                <div className={styles.formGrid}>
                <label className={styles.field}>
                    <span>Eyebrow</span>
                    <input
                    value={otherServicesDraft.eyebrow}
                    onChange={(event) =>
                        updateOtherServicesField("eyebrow", event.target.value)
                    }
                    />
                </label>

                <label className={styles.field}>
                    <span>Title</span>
                    <input
                    value={otherServicesDraft.title}
                    onChange={(event) =>
                        updateOtherServicesField("title", event.target.value)
                    }
                    />
                </label>

                <label className={`${styles.field} ${styles.full}`}>
                    <span>Subtitle</span>
                    <textarea
                    value={otherServicesDraft.subtitle}
                    onChange={(event) =>
                        updateOtherServicesField("subtitle", event.target.value)
                    }
                    />
                </label>

                {otherServicesDraft.items.map((item, index) => (
                    <div className={styles.itemEditor} key={index}>
                    <h3>Other Service {index + 1}</h3>

                    <label className={styles.field}>
                        <span>Icon</span>
                        <input
                        value={item.icon}
                        onChange={(event) =>
                            updateOtherServiceItem(index, "icon", event.target.value)
                        }
                        />
                    </label>

                    <label className={styles.field}>
                        <span>Title</span>
                        <input
                        value={item.title}
                        onChange={(event) =>
                            updateOtherServiceItem(index, "title", event.target.value)
                        }
                        />
                    </label>

                    <label className={`${styles.field} ${styles.full}`}>
                        <span>Description</span>
                        <textarea
                        value={item.description}
                        onChange={(event) =>
                            updateOtherServiceItem(
                            index,
                            "description",
                            event.target.value,
                            )
                        }
                        />
                    </label>
                    </div>
                ))}
                </div>

                <div className={styles.buttonRow}>
                <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={handleReset}
                    disabled={status === "Saving"}
                >
                    Reset
                </button>

                <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={handleSave}
                    disabled={status === "Saving"}
                >
                    {status === "Saving" ? "Saving..." : "Save Other Services"}
                </button>
                </div>
            </>) : selectedSection === "Testimonials" ? (
  <>
                <div className={styles.formGrid}>
                <label className={styles.field}>
                    <span>Eyebrow</span>
                    <input
                    value={testimonialsDraft.eyebrow}
                    onChange={(event) =>
                        updateTestimonialsField("eyebrow", event.target.value)
                    }
                    />
                </label>

                <label className={styles.field}>
                    <span>Title</span>
                    <input
                    value={testimonialsDraft.title}
                    onChange={(event) =>
                        updateTestimonialsField("title", event.target.value)
                    }
                    />
                </label>

                <label className={`${styles.field} ${styles.full}`}>
                    <span>Subtitle</span>
                    <textarea
                    value={testimonialsDraft.subtitle}
                    onChange={(event) =>
                        updateTestimonialsField("subtitle", event.target.value)
                    }
                    />
                </label>

                <div className={styles.itemEditor}>
                    <h3>Trust Stats</h3>

                    {testimonialsDraft.stats.map((stat, index) => (
                    <div className={styles.nestedGrid} key={index}>
                        <label className={styles.field}>
                        <span>Stat {index + 1} value</span>
                        <input
                            value={stat.value}
                            onChange={(event) =>
                            updateTestimonialStat(index, "value", event.target.value)
                            }
                        />
                        </label>

                        <label className={styles.field}>
                        <span>Stat {index + 1} label</span>
                        <input
                            value={stat.label}
                            onChange={(event) =>
                            updateTestimonialStat(index, "label", event.target.value)
                            }
                        />
                        </label>
                    </div>
                    ))}
                </div>

                {testimonialsDraft.items.map((item, index) => (
                    <div className={styles.itemEditor} key={index}>
                    <h3>Testimonial {index + 1}</h3>

                    <label className={styles.field}>
                        <span>Name</span>
                        <input
                        value={item.name}
                        onChange={(event) =>
                            updateTestimonialItem(index, "name", event.target.value)
                        }
                        />
                    </label>

                    <label className={styles.field}>
                        <span>Role</span>
                        <input
                        value={item.role}
                        onChange={(event) =>
                            updateTestimonialItem(index, "role", event.target.value)
                        }
                        />
                    </label>

                    <label className={styles.field}>
                        <span>Rating</span>
                        <input
                        value={item.rating}
                        onChange={(event) =>
                            updateTestimonialItem(index, "rating", event.target.value)
                        }
                        />
                    </label>

                    <label className={`${styles.field} ${styles.full}`}>
                        <span>Avatar image URL</span>
                        <input
                        value={item.avatarUrl}
                        onChange={(event) =>
                            updateTestimonialItem(index, "avatarUrl", event.target.value)
                        }
                        />
                    </label>

                    <label className={`${styles.field} ${styles.full}`}>
                        <span>Quote</span>
                        <textarea
                        value={item.quote}
                        onChange={(event) =>
                            updateTestimonialItem(index, "quote", event.target.value)
                        }
                        />
                    </label>
                    </div>
                ))}
                </div>

        <div className={styles.buttonRow}>
        <button
            type="button"
            className={styles.cancelButton}
            onClick={handleReset}
            disabled={status === "Saving"}
        >
            Reset
        </button>

        <button
            type="button"
            className={styles.primaryButton}
            onClick={handleSave}
            disabled={status === "Saving"}
        >
            {status === "Saving" ? "Saving..." : "Save Testimonials"}
        </button>
        </div>
            </>) : selectedSection === "Final CTA" ? (
  <>
    <div className={styles.formGrid}>
      <label className={styles.field}>
        <span>Eyebrow</span>
        <input
          value={finalCtaDraft.eyebrow}
          onChange={(event) =>
            updateFinalCtaField("eyebrow", event.target.value)
          }
        />
      </label>

      <label className={styles.field}>
        <span>Title</span>
        <input
          value={finalCtaDraft.title}
          onChange={(event) =>
            updateFinalCtaField("title", event.target.value)
          }
        />
      </label>

      <label className={`${styles.field} ${styles.full}`}>
        <span>Subtitle</span>
        <textarea
          value={finalCtaDraft.subtitle}
          onChange={(event) =>
            updateFinalCtaField("subtitle", event.target.value)
          }
        />
      </label>

      <label className={styles.field}>
        <span>Primary button text</span>
        <input
          value={finalCtaDraft.primaryButtonText}
          onChange={(event) =>
            updateFinalCtaField("primaryButtonText", event.target.value)
          }
        />
      </label>

      <label className={styles.field}>
        <span>Primary button link</span>
        <input
          value={finalCtaDraft.primaryButtonLink}
          onChange={(event) =>
            updateFinalCtaField("primaryButtonLink", event.target.value)
          }
        />
      </label>

      <label className={styles.field}>
        <span>Secondary button text</span>
        <input
          value={finalCtaDraft.secondaryButtonText}
          onChange={(event) =>
            updateFinalCtaField("secondaryButtonText", event.target.value)
          }
        />
      </label>

      <label className={styles.field}>
        <span>Secondary button link</span>
        <input
          value={finalCtaDraft.secondaryButtonLink}
          onChange={(event) =>
            updateFinalCtaField("secondaryButtonLink", event.target.value)
          }
        />
      </label>

      <label className={`${styles.field} ${styles.full}`}>
        <span>Note</span>
        <input
          value={finalCtaDraft.note}
          onChange={(event) =>
            updateFinalCtaField("note", event.target.value)
          }
        />
      </label>

      {finalCtaDraft.contactItems.map((item, index) => (
        <div className={styles.itemEditor} key={index}>
          <h3>Contact Item {index + 1}</h3>

          <label className={styles.field}>
            <span>Label</span>
            <input
              value={item.label}
              onChange={(event) =>
                updateFinalCtaContactItem(index, "label", event.target.value)
              }
            />
          </label>

          <label className={styles.field}>
            <span>Value</span>
            <input
              value={item.value}
              onChange={(event) =>
                updateFinalCtaContactItem(index, "value", event.target.value)
              }
            />
          </label>

          <label className={`${styles.field} ${styles.full}`}>
            <span>Link / href</span>
            <input
              value={item.href}
              onChange={(event) =>
                updateFinalCtaContactItem(index, "href", event.target.value)
              }
            />
          </label>
        </div>
      ))}
    </div>

    <div className={styles.buttonRow}>
      <button
        type="button"
        className={styles.cancelButton}
        onClick={handleReset}
        disabled={status === "Saving"}
      >
        Reset
      </button>

      <button
        type="button"
        className={styles.primaryButton}
        onClick={handleSave}
        disabled={status === "Saving"}
      >
        {status === "Saving" ? "Saving..." : "Save Final CTA"}
      </button>
    </div>
            </>) : (
                        <div className={styles.emptyState}>
                            <h3>{selectedSection} editor is not active yet</h3>
                            <p>
                            Hero and Features are active now. We will add editable fields
                            for {selectedSection} next.
                            </p>
                        </div>
                        )
            }
          </section>

          {/* here was aside which was preview panels */}


          {/* now we change it  */}

            <aside className={styles.previewPanel}>
                <div className={styles.previewHeader}>
                    <div>
                    <h2>Phone Preview</h2>
                    <p>Real public website preview</p>
                    </div>

                    <span>390 × 844</span>
                </div>

                <div className={styles.phoneFrame}>
                    <div className={styles.phoneTopBar} />

                    <iframe
                    key={previewVersion}
                    src={`/?preview=${previewVersion}`}
                    className={styles.phoneIframe}
                    title="Homepage phone preview"
                    />
                </div>

                <p className={styles.previewNote}>
                    The preview reloads after saving, so it shows the real saved homepage.
                </p>
            </aside>
        </section>
      </main>
    </div>
  );
}