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

export type HomeServiceItem = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  background: string;
};

export type HomeGroomingItem = {
  icon: string;
  title: string;
  description: string;
  price: string;
};
export type HomePackageItem = {
  name: string;
  tagline: string;
  price: string;
  popular: boolean;
  features: string[];
};

export type HomeContent = {
  hero: HomeHeroContent;

  features: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: HomeFeatureItem[];
  };

  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: HomeServiceItem[];
  };

    grooming: {
        eyebrow: string;
        titleMain: string;
        titleHighlight: string;
        subtitle: string;
        buttonText: string;
        buttonLink: string;
        imageUrl: string;
        items: HomeGroomingItem[];
    };

    packages: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: HomePackageItem[];
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
    primaryButtonLink: "#services",
    secondaryButtonText: "View Services",
    secondaryButtonLink: "#services",

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

  services: {
    eyebrow: "Personalise your visit",
    title: "What does your dog need today?",
    subtitle:
      "Select a service and we will surface the most relevant options for your dog.",
    items: [
      {
        id: "grooming",
        title: "Grooming",
        tagline: "Cuts, baths & styling",
        description:
          "Professional coat care, washing, brushing, nail trimming, and breed-aware styling.",
        icon: "✂",
        color: "#A0714F",
        background: "#F5E9DF",
      },
      {
        id: "vet",
        title: "Vet Care",
        tagline: "Checkups & treatment",
        description:
          "Routine health checks, preventive care, and support from trusted veterinary partners.",
        icon: "⚕",
        color: "#4E8B6F",
        background: "#E3F0EA",
      },
      {
        id: "spa",
        title: "Dog Spa",
        tagline: "Relax & rejuvenate",
        description:
          "Calming spa treatments, gentle massage, coat masks, and comfort-focused sessions.",
        icon: "✦",
        color: "#9470A8",
        background: "#F0E8F5",
      },
      {
        id: "hotel",
        title: "Dog Hotel",
        tagline: "Safe overnight stays",
        description:
          "Comfortable short stays with supervision, rest areas, and daily care routines.",
        icon: "▣",
        color: "#4A7BA8",
        background: "#E3EDF5",
      },
      {
        id: "training",
        title: "Training",
        tagline: "Obedience & skills",
        description:
          "Positive reinforcement training for manners, confidence, and better routines.",
        icon: "◆",
        color: "#7A8A4E",
        background: "#ECF0E3",
      },
      {
        id: "nutrition",
        title: "Nutrition",
        tagline: "Diet & wellness plans",
        description:
          "Personalised food guidance and wellness planning based on age, activity, and needs.",
        icon: "◌",
        color: "#6B8A4E",
        background: "#E8F0E3",
      },
    ],
  },
  grooming: {
    eyebrow: "Currently selected: Grooming",
    titleMain: "Grooming made comfortable",
    titleHighlight: "and stress-free",
    subtitle:
      "Our certified groomers use gentle, fear-free methods. Every session starts with a calm introduction so your dog arrives relaxed and leaves looking and feeling their best.",
    buttonText: "Book Grooming",
    buttonLink: "#contact",
    imageUrl:
      "https://images.unsplash.com/photo-1528846104175-4fd300ee59da?w=800&h=600&fit=crop&auto=format",
    items: [
      {
        icon: "🛁",
        title: "Bath & Blow Dry",
        description:
          "Soothing shampoo, deep conditioning, and a professional blow-dry for a clean, healthy coat.",
        price: "From $45",
      },
      {
        icon: "✂",
        title: "Haircut & Styling",
        description:
          "Breed-aware cuts and styling by groomers who understand different coat types.",
        price: "From $65",
      },
      {
        icon: "◦",
        title: "Nail Trimming",
        description:
          "Gentle nail trim and smooth file to keep paws comfortable and healthy.",
        price: "From $18",
      },
      {
        icon: "⌕",
        title: "Ear Cleaning",
        description:
          "Careful ear inspection and gentle cleaning to help prevent buildup and irritation.",
        price: "From $15",
      },
    ],
  },

  packages: {
    eyebrow: "Grooming packages",
    title: "Choose your level of care",
    subtitle:
      "Every package includes a pre-service consultation and post-groom care note.",
    items: [
      {
        name: "Essential Groom",
        tagline: "Clean & refreshed",
        price: "$55",
        popular: false,
        features: [
          "Bath & blow dry",
          "Brush out",
          "Nail trim",
          "Ear wipe",
          "Bandana finish",
        ],
      },
      {
        name: "Full Groom",
        tagline: "Complete care — most loved",
        price: "$95",
        popular: true,
        features: [
          "Bath & blow dry",
          "Full haircut & style",
          "Nail trim & file",
          "Ear cleaning",
          "Teeth brushing",
          "Bow or bandana",
        ],
      },
      {
        name: "Premium Spa Groom",
        tagline: "The luxury experience",
        price: "$145",
        popular: false,
        features: [
          "Aromatherapy bath",
          "Deep conditioning mask",
          "Full cut & style",
          "Paw balm massage",
          "Blueberry facial",
          "Post-groom photo",
        ],
      },
    ],
  },
};