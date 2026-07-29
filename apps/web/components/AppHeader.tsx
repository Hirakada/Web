"use client";

import { Header } from "@hirakada/ui";
import { webNavigation } from "@hirakada/config";

export default function AppHeader() {
  return (
    <Header
      logo="/logo.svg"
      logoAlt="Hirakada"
      logoHref="/"
      items={webNavigation}
    />
  );
}