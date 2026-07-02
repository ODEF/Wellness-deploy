import type { HomeContent } from "../../lib/home/homeContent";
import styles from "./Packages.module.css";

type PackagesProps = {
  packages: HomeContent["packages"];
};

export default function Packages({ packages }: PackagesProps) {
  return (
    <section className={styles.section} id="packages">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>{packages.eyebrow}</p>
          <h2 className={styles.title}>{packages.title}</h2>
          <p className={styles.subtitle}>{packages.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {packages.items.map((item) => (
            <article
              key={item.name}
              className={`${styles.card} ${item.popular ? styles.popular : ""}`}
            >
              {item.popular && (
                <div className={styles.popularBadge}>Most popular</div>
              )}

              <div className={styles.cardHeader}>
                <h3 className={styles.packageName}>{item.name}</h3>
                <p className={styles.packageTagline}>{item.tagline}</p>
              </div>

              <div className={styles.priceRow}>
                <span className={styles.price}>{item.price}</span>
                <span className={styles.priceSuffix}>/ visit</span>
              </div>

              <ul className={styles.featureList}>
                {item.features.map((feature) => (
                  <li key={feature} className={styles.featureItem}>
                    <span className={styles.check}>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a href="#contact" className={styles.button}>
                Book {item.name}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}