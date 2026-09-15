import { Header } from "@hirakada/ui";

import {
  CONTACT_MAILTO,
  DOMAIN,
  navigation,
} from "@hirakada/config";

export default function AppHeader() {
  return (
    <Header
      logo="/brand/logo.svg"
      logoAlt="Hirakada"
      logoHref={DOMAIN.web}
      contactHref={CONTACT_MAILTO}
      affiliateHref={DOMAIN.affiliate}
      items={navigation}
      internalUrls={[
        DOMAIN.web,
        DOMAIN.portfolio,
        DOMAIN.affiliate,
      ]}
    />
  );
}