import { Header } from "@hirakada/ui";

import { DOMAIN } from "@hirakada/config";

export default function AppHeader() {
  return (
    <Header
      logo="/brand/logo.svg"
      logoAlt="Hirakada"
      logoHref={DOMAIN.web}
      logoLabel="Affiliate"
      items={[
        {
          label: "Home",
          href: "/",
        },
      ]}
      internalUrls={[
        "/",
        DOMAIN.web,
        DOMAIN.portfolio,
        DOMAIN.affiliate,
      ]}
    />
  );
}