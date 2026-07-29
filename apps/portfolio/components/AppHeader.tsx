"use client";

import { navigation } from "@hirakada/config";
import { Header } from "@hirakada/ui";

export default function AppHeader() {
  return (
    <Header
      logo="/logo.svg"
      logoAlt="Hirakada"
      logoHref="/"
      items={navigation}
    />
  );
}