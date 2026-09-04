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
   * Visual treatment for the navigation item.
   */
  variant?: "default" | "button";

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


import React from "react"; 

export interface HeaderProps {
  /**
   * Logo component or image node.
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
   * Contact action destination.
   */
  contactHref?: string;

  /**
   * Navigation items.
   */
  items?: ReadonlyArray<HeaderItem>;

  /**
   * Trusted internal URLs.
   *
   * Example:
   * [
   *   "https://hirakada.vercel.app",
   *   "https://potfoliohirakada.vercel.app"
   * ]
   */
  internalUrls?: ReadonlyArray<string>;

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



export interface HeaderMobileMenuProps {
  /**
   * Mobile menu visibility.
   */
  open: boolean;

  /**
   * Current pathname.
   */
  pathname: string;

  /**
   * Navigation items.
   */
  items: ReadonlyArray<HeaderItem>;

  /**
   * Trusted internal URLs.
   */
  internalUrls?: ReadonlyArray<string>;

  /**
   * Callback after navigation.
   */
  onNavigate: () => void;
}