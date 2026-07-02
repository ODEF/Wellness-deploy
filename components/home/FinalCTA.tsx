import type { HomeContent } from "../../lib/home/homeContent";
import styles from "./FinalCTA.module.css";

type FinalCtaProps = {
  finalCta: HomeContent["finalCta"];
};

export default function FinalCta({ finalCta }: FinalCtaProps) {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.content}>
            <p className={styles.eyebrow}>{finalCta.eyebrow}</p>

            <h2 className={styles.title}>{finalCta.title}</h2>

            <p className={styles.subtitle}>{finalCta.subtitle}</p>

            <div className={styles.actions}>
              <a href={finalCta.primaryButtonLink} className={styles.primaryButton}>
                {finalCta.primaryButtonText}
              </a>

              <a
                href={finalCta.secondaryButtonLink}
                className={styles.secondaryButton}
              >
                {finalCta.secondaryButtonText}
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <p className={styles.note}>{finalCta.note}</p>
          </div>

          <div className={styles.contactBox}>
            {finalCta.contactItems.map((item) => (
              <a href={item.href} className={styles.contactItem} key={item.label}>
                <span className={styles.contactLabel}>{item.label}</span>
                <span className={styles.contactValue}>{item.value}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}