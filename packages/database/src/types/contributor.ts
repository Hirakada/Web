import type { Role } from "./role";

export interface Contributor {
  id: string;

  name: string;

  websiteUrl?: string;

  linkedinUrl?: string;

  profileImageUrl?: string;

  roles?: Role[];
}