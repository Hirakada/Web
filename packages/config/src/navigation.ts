import { DOMAIN } from "./domain";

export const navigation = [
  {
    label: "Home",
    href: DOMAIN.web,
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