"use client";

import { Header } from "@hirakada/ui";

import {
  DOMAIN,
  navigation,
} from "@hirakada/config";


export default function AppHeader() {
  return (
    <Header
      logo="/public/brand/logo-white.svg"
      logoAlt="Hirakada"
      logoHref={DOMAIN.web}
      items={navigation}
      internalUrls={[
        DOMAIN.web,
        DOMAIN.portfolio,
      ]}
    />
  );
}