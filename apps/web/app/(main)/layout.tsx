import AppHeader from "@/components/AppHeader";

import {
  ScrollIndicator,
  GlobalBackground,
} from "@hirakada/ui";

import AppFooter from "@/components/AppFooter";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GlobalBackground />
      <ScrollIndicator />

      <AppHeader />

      <main className="relative z-10">
        {children}
      </main>

      <AppFooter />
    </>
  );
}