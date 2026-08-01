import type { AttributeType } from "./enums";

export interface Attribute {
  id: string;

  name: string;

  type?: AttributeType;

  iconUrl?: string;

  description?: string;
}