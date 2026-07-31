"use client";

import CardImage from "./CardImage";

export interface CardAttributeItem {
  id: string;
  name: string;
  iconUrl?: string | null;
}

export interface CardAttributeProps {
  attributes: CardAttributeItem[];
  max?: number;
  iconSize?: number;
}

export default function CardAttribute({
  attributes,
  max = 3,
  iconSize = 18,
}: CardAttributeProps) {
  const visibleAttributes = attributes.filter(
    (attribute) => attribute.iconUrl
  );

  if (visibleAttributes.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {visibleAttributes
        .slice(0, max)
        .map((attribute) => (
          <div
            key={attribute.id}
            title={attribute.name}
            className="
              flex
              items-center
              justify-center
            "
          >
            <CardImage
              src={attribute.iconUrl!}
              alt={attribute.name}
              width={iconSize}
              height={iconSize}
              className="object-contain"
              style={{
                width: iconSize,
                height: iconSize,
              }}
            />
          </div>
        ))}

      {visibleAttributes.length > max && (
        <span
          className="
            text-sm
            font-semibold
            text-(--text-medium-emphasis)
          "
        >
          +{visibleAttributes.length - max}
        </span>
      )}
    </div>
  );
}