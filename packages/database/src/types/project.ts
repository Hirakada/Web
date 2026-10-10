import type { Attribute } from "./attribute";
import type { Category } from "./category";
import type { Contributor } from "./contributor";
import type {
  ProjectStatus,
  ProjectType,
} from "./enums";

export interface ProjectCard {
  id: string;

  title: string;

  description: string;

  status: ProjectStatus;

  isFeatured: boolean;

  coverImage?: string;

  categories: Category[];

  attributes: Pick<
    Attribute,
    "id" | "name" | "iconUrl"
  >[];

  contributors: Pick<
    Contributor,
    "id" | "name" | "profileImageUrl"
  >[];
}

export interface Project {
  id: string;

  title: string;

  description: string;

  longDescription?: string;

  status: ProjectStatus;

  type: ProjectType;

  isFeatured: boolean;

  completionDate?: string;

  projectUrl?: string;

  githubUrl?: string;

  coverImage?: string;

  categories: Category[];

  attributes: Attribute[];

  contributors: Contributor[];

  images: ProjectImage[];

  media: ProjectMedia[];
}

export interface ProjectMedia {
  id: string;

  mediaType: "image" | "video";

  mediaUrl: string;

  altText?: string;

  caption?: string;

  order: number;
}

export interface ProjectImage {
  id: string;

  imageUrl: string;

  altText?: string;

  caption?: string;

  order: number;

  isBanner: boolean | null;
}