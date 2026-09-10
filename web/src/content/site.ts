/**
 * Site-wide copy and navigation. Kept out of the components so the marketing
 * text can be edited (or later swapped for a CMS query) without touching JSX.
 */

import type { IconName } from "@gridline";

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialItem {
  label: string;
  href: string;
  icon: IconName;
}

export const primaryNav: readonly NavItem[] = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "What You’ll Get", href: "#what-youll-get" },
  { label: "See It in Action", href: "#see-it-in-action" },
  { label: "Get Started", href: "#get-started" },
];

export const site = {
  name: "Talentnext",
  logoBlack: "/img/talentnext-logo-black.svg",
  logoWhite: "/img/talentnext-logo-white.svg",
  title: "Talentnext — Uncover the Talent You Already Have",
  description:
    "What you do next may start with what you're already good at. Through a 30-minute conversation with a Talent Agent, you'll uncover skills you may not recognize in yourself.",
  ctaLabel: "Get started",
  supportEmail: "support@talentnext.com",
} as const;

/**
 * Referenced both from the "Legal & Support" column below and from the
 * footer's closing legal bar, so the two never drift onto different hrefs.
 */
export const termsOfUse: NavItem = {
  label: "Terms of Use",
  href: "#get-started",
};

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
      { label: "Talent Agent Assessment", href: "#how-it-works" },
      { label: "Strengths & Skill Gaps", href: "#what-youll-get" },
      { label: "Personalized Roadmap", href: "#what-youll-get" },
    ],
  },
  {
    title: "Legal & Support",
    links: [
      { label: "Privacy Policy", href: "#get-started" },
      termsOfUse,
      { label: site.supportEmail, href: `mailto:${site.supportEmail}` },
    ],
  },
];

export const footerSocial: readonly SocialItem[] = [
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "X (Twitter)", href: "#", icon: "x" },
  { label: "Instagram", href: "#", icon: "instagram" },
];

export const footerCopy = {
  tagline:
    "Uncover the skills you already have and begin to see what they could mean for your future.",
  legal: `© ${new Date().getFullYear()} Talentnext, Inc. All rights reserved.`,
  credit: "Designed with Architectural Precision",
} as const;
