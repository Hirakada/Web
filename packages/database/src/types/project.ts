import type { Attribute } from "./attribute";
import type { Contributor } from "./contributor";

export interface Project {
  id: string;
  title: string;

  description: string;
  longDescription?: string;

  category?: string;

  projectUrl?: string;
  githubUrl?: string;

  status: string;

  isFeatured: boolean;

  completionDate?: string;

  coverImage?: string;

  attributes: Attribute[];

  contributors: Contributor[];

  images: ProjectImage[];
}

export interface ProjectImage {
  id: string;
  imageUrl: string;
  altText?: string;
  caption?: string;
  order: number;
}