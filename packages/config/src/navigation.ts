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
    href: `${DOMAIN.web}/documentation`,
  },
  {
    label: "Journey",
    href: `${DOMAIN.web}/journey`,
  },
] as const;