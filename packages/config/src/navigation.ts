import { CONTACT_MAILTO } from "./contact";
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
    href: CONTACT_MAILTO,
    variant: "button",
  },
] as const;