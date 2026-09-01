"use client";

import { CardImage } from "@hirakada/ui";

export interface Contributor {
  id: string;
  name: string;
  profileImageUrl?: string | null;
}

export interface CardContributorProps {
  contributors: Contributor[];
  maxVisible?: number;
  size?: number;
}

export function CardContributor({
  contributors,
  maxVisible = 3,
  size = 28,
}: CardContributorProps) {
  if (!contributors.length) return null;

  return (
    <div className="flex items-center">
      {contributors.slice(0, maxVisible).map((contributor, index) => (
        <div
          key={contributor.id}
          title={contributor.name}
          className={`
            relative
            overflow-hidden
            rounded-full
            border-2
            border-(--color-surface)
            bg-(--color-surface)
            transition-transform
            duration-300
            hover:z-20
            hover:scale-110
            ${index !== 0 ? "-ml-3" : ""}
          `}
          style={{
            width: size,
            height: size,
            zIndex: maxVisible - index,
          }}
        >
          {contributor.profileImageUrl && (
            <CardImage
              src={contributor.profileImageUrl}
              alt={contributor.name}
              width={size}
              height={size}
              quality={70}
              sizes={`${size}px`}
              className="h-full w-full rounded-full object-cover"
            />
          )}
        </div>
      ))}

      {contributors.length > maxVisible && (
        <div
          className="
            ml-2
            flex
            items-center
            justify-center
            rounded-full
            bg-[rgba(var(--color-primary-rgb),0.08)]
            px-2
            text-xs
            font-semibold
            text-(--text-medium-emphasis)
          "
          style={{
            minWidth: size,
            height: size,
          }}
        >
          +{contributors.length - maxVisible}
        </div>
      )}
    </div>
  );
}

export default CardContributor;