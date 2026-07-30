import { Footer } from "@hirakada/ui";
import { navigation, socialLinks } from "@hirakada/config";

export default function AppFooter() {
  return (
    <Footer
      brand="Hirakada"
      href="/"
      startYear={2026}
      navigation={navigation}
      socials={socialLinks}
    />
  );
}