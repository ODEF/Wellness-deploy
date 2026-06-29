export type FeaturesContent = {
  hero: {
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
    appointmentLabel: string;
    appointmentTitle: string;
    appointmentTime: string;
    reviewAvatars: string[];
  };
};

export const defaultFeaturesContent: FeaturesContent = {
  hero: {
    trustBadge: "Trusted by 4,200+ dog families",
    titleMain: "Personalised wellness care",
    titleHighlight: "for your dog",
    subtitle:
      "Choose what your dog needs today and we will guide you to the right service — grooming, vet care, spa, hotel, training, and more.",
    primaryButtonText: "Start Now",
    primaryButtonLink: "#",
    secondaryButtonText: "View Services",
    secondaryButtonLink: "#",
    heroImageUrl:
      "https://images.unsplash.com/photo-1768676936784-22a5796db0fe?w=900&h=1100&fit=crop&auto=format",
    floatingBadgeTitle: "Fear-free certified",
    floatingBadgeSubtitle: "Gentle approach, always",
    statValue: "98%",
    statLabel: "satisfaction rate",
    ratingValue: "4.9 / 5",
    ratingText: "820+ reviews",
    appointmentLabel: "Next Appointment",
    appointmentTitle: "Full Groom — Mochi",
    appointmentTime: "Tuesday, 10:00 AM · Studio 2",
    reviewAvatars: [],
  },
};