import type { ComponentType, SVGProps } from "react";

export interface HeaderItem {
  /**
   * Navigation label.
   */
  label: string;

  /**
   * Route or URL.
   */
  href: string;

  /**
   * Force external behaviour.
   */
  external?: boolean;

  /**
   * Link target.
   */
  target?: "_self" | "_blank";

  /**
   * Optional icon.
   */
  icon?: ComponentType<SVGProps<SVGSVGElement>>;

  /**
   * Hide on mobile.
   */
  mobileOnly?: boolean;

  /**
   * Hide on desktop.
   */
  desktopOnly?: boolean;

  /**
   * Disable interaction.
   */
  disabled?: boolean;
}

export interface HeaderProps {
  /**
   * Logo image.
   */
  logo: string;

  /**
   * Logo alt text.
   */
  logoAlt?: string;

  /**
   * Logo destination.
   */
  logoHref?: string;

  /**
   * Navigation items.
   */
  items?: ReadonlyArray<HeaderItem>;

  /**
   * Additional classes.
   */
  className?: string;

  /**
   * Sticky header.
   */
  sticky?: boolean;

  /**
   * Bottom border.
   */
  bordered?: boolean;
}