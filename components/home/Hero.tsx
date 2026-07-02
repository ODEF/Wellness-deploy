import Link from "next/link";
import type { HomeHeroContent } from "../../lib/home/homeContent";
import styles from "./Hero.module.css";

type HeroProps = {
  hero: HomeHeroContent;
};

export default function Hero({ hero }: HeroProps) {
  return (
    <section className={styles.heroSection}>
      <div className={styles.backgroundBlobOne} />
      <div className={styles.backgroundBlobTwo} />

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            <span>{hero.trustBadge}</span>
          </div>

          <h1 className={styles.title}>
            {hero.titleMain}{" "}
            <em className={styles.highlight}>{hero.titleHighlight}</em>
          </h1>

          <p className={styles.subtitle}>{hero.subtitle}</p>

          <div className={styles.actions}>
            <Link href={hero.primaryButtonLink} className={styles.primaryButton}>
              {hero.primaryButtonText}
            </Link>

            <Link
              href={hero.secondaryButtonLink}
              className={styles.secondaryButton}
            >
              {hero.secondaryButtonText}
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={styles.reviewStrip}>
            <div className={styles.avatars}>
              {hero.reviewAvatars.map((avatarUrl, index) => (
                <img
                  key={avatarUrl}
                  src={avatarUrl}
                  alt=""
                  className={styles.avatar}
                  style={{ marginLeft: index === 0 ? 0 : -10 }}
                />
              ))}
            </div>

            <div>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.ratingText}>
                <strong>{hero.ratingValue}</strong> · {hero.ratingText}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.imageCard}>
            <img
              src={hero.heroImageUrl}
              alt="Dog wellness service"
              className={styles.heroImage}
            />

            <div className={styles.imageOverlay} />

            <div className={styles.appointmentCard}>
              <div>
                <p className={styles.appointmentLabel}>
                  {hero.appointmentLabel}
                </p>
                <p className={styles.appointmentTitle}>
                  {hero.appointmentTitle}
                </p>
                <p className={styles.appointmentTime}>
                  {hero.appointmentTime}
                </p>
              </div>

              <div className={styles.appointmentIcon}>✂</div>
            </div>
          </div>

          <div className={styles.floatingBadge}>
            <div className={styles.heartIcon}>♥</div>

            <div>
              <p className={styles.floatingBadgeTitle}>
                {hero.floatingBadgeTitle}
              </p>
              <p className={styles.floatingBadgeSubtitle}>
                {hero.floatingBadgeSubtitle}
              </p>
            </div>
          </div>

          <div className={styles.statCard}>
            <p className={styles.statValue}>{hero.statValue}</p>
            <p className={styles.statLabel}>{hero.statLabel}</p>
          </div>
        </div>
      </div>
    </section>
  );
}