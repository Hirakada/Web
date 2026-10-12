import AppHeader from "@/components/AppHeader";

import { GlobalBackground } from "@hirakada/ui";

import AppFooter from "@/components/AppFooter";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GlobalBackground />

      <AppHeader />

      <main className="relative z-10">
        {children}
      </main>

      <AppFooter />
    </>
  );
}