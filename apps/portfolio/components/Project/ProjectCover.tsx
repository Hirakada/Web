import { CardImage } from "@hirakada/ui";

interface ProjectCoverProps {
  imageUrl: string | undefined;
  title: string;
  sizes?: string;
}

export default function ProjectCover({
  imageUrl,
  title,
  sizes,
}: ProjectCoverProps) {
  if (!imageUrl) {
    return (
      <div
        role="img"
        aria-label={`${title} preview unavailable`}
        className="
          flex
          h-50
          w-full
          items-center
          justify-center
          bg-(--color-surface)
          text-sm
          text-(--text-medium-emphasis)
        "
      >
        Preview unavailable
      </div>
    );
  }

  return (
    <CardImage
      src={imageUrl}
      alt={title}
      width={800}
      height={450}
      loading="lazy"
      decoding="async"
      sizes={sizes}
    />
  );
}
