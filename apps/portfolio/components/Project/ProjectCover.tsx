import { CardImage } from "@hirakada/ui";

interface ProjectCoverProps {
  imageUrl: string | undefined;
  title: string;
  sizes?: string;
  eager?: boolean;
}

export default function ProjectCover({
  imageUrl,
  title,
  sizes,
  eager = false,
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
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      sizes={sizes}
    />
  );
}
