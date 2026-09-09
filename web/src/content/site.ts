/**
 * Site-wide copy and navigation. Kept out of the components so the marketing
 * text can be edited (or later swapped for a CMS query) without touching JSX.
 */

export interface NavItem {
  label: string;
  href: string;
}

export const primaryNav: readonly NavItem[] = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "What You’ll Get", href: "#what-youll-get" },
  { label: "See It in Action", href: "#see-it-in-action" },
  { label: "Get Started", href: "#get-started" },
];

export const site = {
  name: "TALENTnext",
  logoBlack: "/img/talentnext-logo-black.svg",
  logoWhite: "/img/talentnext-logo-white.svg",
  title: "TALENTnext — Uncover the TALENT You Already Have",
  description:
    "What you do next may start with what you're already good at. Through a 30-minute conversation with a TALENT Agent, you'll uncover skills you may not recognize in yourself.",
  ctaLabel: "Get started",
  supportEmail: "support@talentnext.com",
} as const;

export const footerColumns: readonly {
  title: string;
  links: readonly NavItem[];
}[] = [
  {
    title: "Navigation",
    links: primaryNav,
  },
  {
    title: "The Process",
    links: [
      { label: "30-Minute Conversation", href: "#how-it-works" },
      { label: "TALENT Agent Assessment", href: "#how-it-works" },
      { label: "Strengths & Skill Gaps", href: "#what-youll-get" },
      { label: "Personalized Roadmap", href: "#what-youll-get" },
    ],
  },
  {
    title: "Legal & Support",
    links: [
      { label: "Privacy Policy", href: "#get-started" },
      { label: "Terms of Use", href: "#get-started" },
      { label: site.supportEmail, href: `mailto:${site.supportEmail}` },
    ],
  },
];

export const footerCopy = {
  tagline:
    "Uncover the skills you already have and begin to see what they could mean for your future.",
  legal: `© ${new Date().getFullYear()} TALENTnext, Inc. All rights reserved.`,
  credit: "Designed with Architectural Precision",
} as const;
