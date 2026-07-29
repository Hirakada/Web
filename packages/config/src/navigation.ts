import { DOMAIN } from "./domain";

export const webNavigation = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Projects",
    href: DOMAIN.portfolio,
  },
  {
    label: "Documentation",
    href: "/documentation",
  },
  {
    label: "Journey",
    href: "/journey",
  },
] as const;

export const portfolioNavigation = [
  {
    label: "Home",
    href: DOMAIN.web,
  },
  {
    label: "Projects",
    href: "/",
  },
] as const;