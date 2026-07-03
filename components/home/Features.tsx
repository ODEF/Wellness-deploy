import type { HomeContent } from "../../lib/home/homeContent";
import styles from "./Features.module.css";

type FeaturesProps = {
  features: HomeContent["features"];
};

export default function Features({ features }: FeaturesProps) {
  return (
    <section className={styles.section} id="features">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>{features.eyebrow}</p>
          <h2 className={styles.title}>{features.title}</h2>
          <p className={styles.subtitle}>{features.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {features.items.map((item) => (
            <article className={styles.card} key={item.title}>
              <div className={styles.icon}>
                {item.imageUrl ? (
                    <img src={item.imageUrl} alt="" className={styles.iconImage} />
                ) : (
                    item.icon
                )}
            </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardText}>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}