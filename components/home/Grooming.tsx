import Link from "next/link";
import type { HomeContent } from "../../lib/home/homeContent";
import styles from "./Grooming.module.css";

type GroomingProps = {
  grooming: HomeContent["grooming"];
};

export default function Grooming({ grooming }: GroomingProps) {
  return (
    <section className={styles.section} id="grooming">
      <div className={styles.container}>
        <div className={styles.topGrid}>
          <div className={styles.copy}>
            <div className={styles.badge}>
              <span>{grooming.eyebrow}</span>
            </div>

            <h2 className={styles.title}>
              {grooming.titleMain}{" "}
              <em className={styles.highlight}>{grooming.titleHighlight}</em>
            </h2>

            <p className={styles.subtitle}>{grooming.subtitle}</p>

            <Link href={grooming.buttonLink} className={styles.button}>
              {grooming.buttonText}
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={styles.imageWrap}>
            <img
              src={grooming.imageUrl}
              alt="Professional dog grooming service"
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.cardsGrid}>
          {grooming.items.map((item) => (
            <article className={styles.card} key={item.title}>
              <div className={styles.icon}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardText}>{item.description}</p>
              <p className={styles.price}>{item.price}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}