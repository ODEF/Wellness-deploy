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
  imageUrl?: string;
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

export type HomeOtherServiceItem = {
  icon: string;
  title: string;
  description: string;
};

export type HomeTrustStat = {
  value: string;
  label: string;
};

export type HomeTestimonialItem = {
  name: string;
  role: string;
  quote: string;
  rating: string;
  avatarUrl: string;
};

export type HomeContactItem = {
  label: string;
  value: string;
  href: string;
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
    otherServices: {
        eyebrow: string;
        title: string;
        subtitle: string;
        items: HomeOtherServiceItem[];
    };
    testimonials: {
        eyebrow: string;
        title: string;
        subtitle: string;
        stats: HomeTrustStat[];
        items: HomeTestimonialItem[];
    };
    finalCta: {
        eyebrow: string;
        title: string;
        subtitle: string;
        primaryButtonText: string;
        primaryButtonLink: string;
        secondaryButtonText: string;
        secondaryButtonLink: string;
        note: string;
        contactItems: HomeContactItem[];
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
            imageUrl:
            "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=120&h=120&fit=crop&auto=format",
            title: "Professional grooming",
            description:
            "Gentle grooming, bathing, coat care, and styling by trained specialists.",
        },
        {
            icon: "♡",
            imageUrl:
            "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=120&h=120&fit=crop&auto=format",
            title: "Wellness-first approach",
            description:
            "Every service is planned around your dog’s comfort, health, and temperament.",
        },
        {
            icon: "✓",
            imageUrl:
            "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=120&h=120&fit=crop&auto=format",
            title: "Easy online booking",
            description:
            "Book services quickly with clear appointment times and simple confirmation.",
        },
        {
            icon: "★",
            imageUrl:
            "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=120&h=120&fit=crop&auto=format",
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
  otherServices: {
    eyebrow: "Complete dog wellness",
    title: "More care options for every need",
    subtitle:
        "From health support to training and overnight stays, our care options help you build a full wellness routine for your dog.",
    items: [
        {
        icon: "⚕",
        title: "Vet Care",
        description:
            "Routine checkups, preventive care, and health guidance through trusted veterinary partners.",
        },
        {
        icon: "✦",
        title: "Dog Spa",
        description:
            "Relaxing spa treatments, coat masks, gentle massage, and calming comfort sessions.",
        },
        {
        icon: "▣",
        title: "Dog Hotel",
        description:
            "Safe short stays with supervision, clean rest areas, and daily care routines.",
        },
        {
        icon: "◆",
        title: "Training",
        description:
            "Positive reinforcement sessions for manners, confidence, obedience, and better routines.",
        },
        {
        icon: "◌",
        title: "Nutrition Plans",
        description:
            "Food and wellness guidance based on age, activity level, breed, and lifestyle.",
        },
        {
        icon: "♡",
        title: "Wellness Plans",
        description:
            "Ongoing care plans combining grooming, checkups, nutrition, and comfort-focused services.",
        },
    ],
    },
    testimonials: {
        eyebrow: "Trusted by dog families",
        title: "Care that owners feel confident about",
        subtitle:
            "Families choose us for calm handling, clear communication, and consistent care across every appointment.",
        stats: [
            {
            value: "4,200+",
            label: "families served",
            },
            {
            value: "98%",
            label: "satisfaction rate",
            },
            {
            value: "820+",
            label: "verified reviews",
            },
        ],
        items: [
            {
            name: "Emma Richardson",
            role: "Owner of Luna",
            rating: "★★★★★",
            quote:
                "Luna is usually nervous during grooming, but the team handled her slowly and calmly. She came home relaxed and looked perfect.",
            avatarUrl:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format",
            },
            {
            name: "Daniel Carter",
            role: "Owner of Milo",
            rating: "★★★★★",
            quote:
                "The appointment was simple to book, the service was on time, and the groomer explained everything clearly after the visit.",
            avatarUrl:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format",
            },
            {
            name: "Sofia Bennett",
            role: "Owner of Coco",
            rating: "★★★★★",
            quote:
                "We use the full groom package every month. The quality is consistent and Coco is always treated with patience.",
            avatarUrl:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format",
            },
        ],
  },
    finalCta: {
    eyebrow: "Ready to book?",
    title: "Start your dog’s wellness visit today",
    subtitle:
        "Tell us what your dog needs and we will help you choose the right service, package, and appointment time.",
    primaryButtonText: "Book Appointment",
    primaryButtonLink: "mailto:hello@dogswellness.co",
    secondaryButtonText: "View Services",
    secondaryButtonLink: "#services",
    note: "No pressure. We will help you choose the right care before confirming anything.",
    contactItems: [
        {
        label: "Email",
        value: "hello@dogswellness.co",
        href: "mailto:hello@dogswellness.co",
        },
        {
        label: "Phone",
        value: "+1 555 014 286",
        href: "tel:+1555014286",
        },
        {
        label: "Hours",
        value: "Mon–Sat, 09:00–18:00",
        href: "#contact",
        },
    ],
    },
};