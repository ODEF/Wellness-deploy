import type { HomeContent } from "../../lib/home/homeContent";
import styles from "./Testimonials.module.css";

type TestimonialsProps = {
  testimonials: HomeContent["testimonials"];
};

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>{testimonials.eyebrow}</p>
          <h2 className={styles.title}>{testimonials.title}</h2>
          <p className={styles.subtitle}>{testimonials.subtitle}</p>
        </div>

        <div className={styles.statsGrid}>
          {testimonials.stats.map((stat) => (
            <div className={styles.statCard} key={stat.label}>
              <p className={styles.statValue}>{stat.value}</p>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>

        <div className={styles.testimonialGrid}>
          {testimonials.items.map((item) => (
            <article className={styles.card} key={item.name}>
              <div className={styles.rating}>{item.rating}</div>

              <p className={styles.quote}>“{item.quote}”</p>

              <div className={styles.author}>
                <img
                  src={item.avatarUrl}
                  alt={item.name}
                  className={styles.avatar}
                />

                <div>
                  <h3 className={styles.name}>{item.name}</h3>
                  <p className={styles.role}>{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}