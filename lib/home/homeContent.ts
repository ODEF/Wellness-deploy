export type HomeHeroContent = {
  trustBadge: string;
  titleMain: string;
  titleHighlight: string;
  subtitle: string;

  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;

  heroImageUrl: string;

  floatingBadgeTitle: string;
  floatingBadgeSubtitle: string;

  statValue: string;
  statLabel: string;

  ratingValue: string;
  ratingText: string;
  reviewAvatars: string[];

  appointmentLabel: string;
  appointmentTitle: string;
  appointmentTime: string;
};

export type HomeFeatureItem = {
  title: string;
  description: string;
  icon: string;
};

export type HomeContent = {
  hero: HomeHeroContent;
  features: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: HomeFeatureItem[];
  };
};

export const homeContent: HomeContent = {
  hero: {
    trustBadge: "Trusted by 4,200+ families",
    titleMain: "Personalised wellness care",
    titleHighlight: "for your dog",
    subtitle:
      "Choose what your dog needs today and we will guide you to the right service — grooming, vet care, spa, hotel, training, and more.",

    primaryButtonText: "Start Now",
    primaryButtonLink: "/services",
    secondaryButtonText: "View Services",
    secondaryButtonLink: "#features",

    heroImageUrl:
      "https://images.unsplash.com/photo-1768676936784-22a5796db0fe?w=880&h=1100&fit=crop&auto=format",

    floatingBadgeTitle: "Fear-free certified",
    floatingBadgeSubtitle: "Gentle approach, always",

    statValue: "98%",
    statLabel: "satisfaction rate",

    ratingValue: "4.9 / 5",
    ratingText: "820+ reviews",
    reviewAvatars: [
      "https://images.unsplash.com/photo-1768676936784-22a5796db0fe?w=56&h=56&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1597595735781-6a57fb8e3e3d?w=56&h=56&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1546447147-3fc2b8181a74?w=56&h=56&fit=crop&auto=format",
    ],

    appointmentLabel: "Next appointment",
    appointmentTitle: "Full Groom — Mochi",
    appointmentTime: "Tuesday, 10:00 AM · Studio 2",
  },

  features: {
    eyebrow: "Why choose us",
    title: "Everything your dog needs in one place",
    subtitle:
      "A calm, premium wellness experience designed around comfort, safety, and personalised care.",
    items: [
      {
        icon: "✂",
        title: "Professional grooming",
        description:
          "Gentle grooming, bathing, coat care, and styling by trained specialists.",
      },
      {
        icon: "♡",
        title: "Wellness-first approach",
        description:
          "Every service is planned around your dog’s comfort, health, and temperament.",
      },
      {
        icon: "✓",
        title: "Easy online booking",
        description:
          "Book services quickly with clear appointment times and simple confirmation.",
      },
      {
        icon: "★",
        title: "Trusted specialists",
        description:
          "Experienced caregivers using safe, patient, and stress-aware methods.",
      },
    ],
  },
};