"use client";

import { useState } from "react";
import type { FeaturesContent } from "../../lib/features/featuresContent";

type FeaturesEditorProps = {
  initialContent: FeaturesContent;
};

export default function FeaturesEditor({
  initialContent,
}: FeaturesEditorProps) {
  const [content, setContent] = useState<FeaturesContent>(initialContent);
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const hero = content.hero;

  function updateHeroField(
    key: keyof FeaturesContent["hero"],
    value: string | string[],
  ) {
    setContent((current) => ({
      ...current,
      hero: {
        ...current.hero,
        [key]: value,
      },
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSaving(true);
    setStatus("");

    const response = await fetch("/api/admin/features", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });

    setIsSaving(false);

    if (!response.ok) {
      setStatus("Could not save content.");
      return;
    }

    setStatus("Saved. Open /features to see the update.");
  }

  return (
    <section>
      <h1>Features Page Editor</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Trust badge
          <input
            value={hero.trustBadge}
            onChange={(event) =>
              updateHeroField("trustBadge", event.target.value)
            }
          />
        </label>

        <label>
          Main title
          <input
            value={hero.titleMain}
            onChange={(event) =>
              updateHeroField("titleMain", event.target.value)
            }
          />
        </label>

        <label>
          Highlighted title text
          <input
            value={hero.titleHighlight}
            onChange={(event) =>
              updateHeroField("titleHighlight", event.target.value)
            }
          />
        </label>

        <label>
          Subtitle
          <textarea
            value={hero.subtitle}
            onChange={(event) =>
              updateHeroField("subtitle", event.target.value)
            }
          />
        </label>

        <label>
          Primary button text
          <input
            value={hero.primaryButtonText}
            onChange={(event) =>
              updateHeroField("primaryButtonText", event.target.value)
            }
          />
        </label>

        <label>
          Primary button link
          <input
            value={hero.primaryButtonLink}
            onChange={(event) =>
              updateHeroField("primaryButtonLink", event.target.value)
            }
          />
        </label>

        <label>
          Secondary button text
          <input
            value={hero.secondaryButtonText}
            onChange={(event) =>
              updateHeroField("secondaryButtonText", event.target.value)
            }
          />
        </label>

        <label>
          Secondary button link
          <input
            value={hero.secondaryButtonLink}
            onChange={(event) =>
              updateHeroField("secondaryButtonLink", event.target.value)
            }
          />
        </label>

        <label>
          Hero image URL
          <input
            value={hero.heroImageUrl}
            onChange={(event) =>
              updateHeroField("heroImageUrl", event.target.value)
            }
          />
        </label>

        <label>
          Floating badge title
          <input
            value={hero.floatingBadgeTitle}
            onChange={(event) =>
              updateHeroField("floatingBadgeTitle", event.target.value)
            }
          />
        </label>

        <label>
          Floating badge subtitle
          <input
            value={hero.floatingBadgeSubtitle}
            onChange={(event) =>
              updateHeroField("floatingBadgeSubtitle", event.target.value)
            }
          />
        </label>

        <label>
          Stat value
          <input
            value={hero.statValue}
            onChange={(event) =>
              updateHeroField("statValue", event.target.value)
            }
          />
        </label>

        <label>
          Stat label
          <input
            value={hero.statLabel}
            onChange={(event) =>
              updateHeroField("statLabel", event.target.value)
            }
          />
        </label>

        <label>
          Rating value
          <input
            value={hero.ratingValue}
            onChange={(event) =>
              updateHeroField("ratingValue", event.target.value)
            }
          />
        </label>

        <label>
          Rating text
          <input
            value={hero.ratingText}
            onChange={(event) =>
              updateHeroField("ratingText", event.target.value)
            }
          />
        </label>

        <label>
          Appointment label
          <input
            value={hero.appointmentLabel}
            onChange={(event) =>
              updateHeroField("appointmentLabel", event.target.value)
            }
          />
        </label>

        <label>
          Appointment title
          <input
            value={hero.appointmentTitle}
            onChange={(event) =>
              updateHeroField("appointmentTitle", event.target.value)
            }
          />
        </label>

        <label>
          Appointment time
          <input
            value={hero.appointmentTime}
            onChange={(event) =>
              updateHeroField("appointmentTime", event.target.value)
            }
          />
        </label>

        <label>
          Review avatar URLs, one per line
          <textarea
            value={hero.reviewAvatars.join("\n")}
            onChange={(event) =>
              updateHeroField(
                "reviewAvatars",
                event.target.value
                  .split("\n")
                  .map((url) => url.trim())
                  .filter(Boolean),
              )
            }
          />
        </label>

        <button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Features Page"}
        </button>

        {status && <p>{status}</p>}
      </form>
    </section>
  );
}