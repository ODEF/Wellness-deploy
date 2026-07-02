import type { HomeContent } from "../../lib/home/homeContent";
import styles from "./OtherServices.module.css";

type OtherServicesProps = {
  otherServices: HomeContent["otherServices"];
};

export default function OtherServices({ otherServices }: OtherServicesProps) {
  return (
    <section className={styles.section} id="other-services">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>{otherServices.eyebrow}</p>
          <h2 className={styles.title}>{otherServices.title}</h2>
          <p className={styles.subtitle}>{otherServices.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {otherServices.items.map((item) => (
            <article className={styles.card} key={item.title}>
              <div className={styles.icon}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardText}>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}