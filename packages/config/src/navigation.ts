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
    label: "Journey",
    href: `${DOMAIN.web}/journey`,
  },
  {
    label: "Contact",
    href: "mailto:hirakada.id@gmail.com",
    variant: "button",
  },
] as const;