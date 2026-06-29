import type { FeaturesContent } from "../../lib/features/featuresContent";

type FeaturesHeroProps = {
  content: FeaturesContent;
};

export default function FeaturesHero({ content }: FeaturesHeroProps) {
  const { hero } = content;

  return (
    <section>
      <p>{hero.trustBadge}</p>

      <h1>
        {hero.titleMain} <span>{hero.titleHighlight}</span>
      </h1>

      <p>{hero.subtitle}</p>

      <a href={hero.primaryButtonLink}>{hero.primaryButtonText}</a>
      <a href={hero.secondaryButtonLink}>{hero.secondaryButtonText}</a>

      <img src={hero.heroImageUrl} alt={hero.titleMain} />

      <div>
        <strong>{hero.floatingBadgeTitle}</strong>
        <p>{hero.floatingBadgeSubtitle}</p>
      </div>

      <div>
        <strong>{hero.statValue}</strong>
        <span>{hero.statLabel}</span>
      </div>

      <div>
        <strong>{hero.appointmentLabel}</strong>
        <p>{hero.appointmentTitle}</p>
        <p>{hero.appointmentTime}</p>
      </div>
    </section>
  );
}