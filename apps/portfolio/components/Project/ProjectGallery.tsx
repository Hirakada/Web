import type { ProjectMedia } from "@hirakada/database";

import { CardImage } from "@hirakada/ui";

export interface ProjectGalleryProps {
  title: string;

  media: ProjectMedia[];
}

export default function ProjectGallery({
  title,
  media,
}: ProjectGalleryProps) {
  if (media.length === 0) {
    return null;
  }

  return (
    <section
      aria-label={`${title} gallery`}
      className="mx-auto flex w-full max-w-3xl flex-col gap-6"
    >
      <div
        className="flex flex-col gap-6"
      >
        {media.map((item) => (
          <figure
            key={item.id}
            className="overflow-hidden rounded-2xl border border-[rgba(var(--color-secondary-rgb),0.08)] bg-(--color-surface) shadow-sm"
          >
            {item.mediaType === "video" ? (
              <video
                src={item.mediaUrl}
                controls
                playsInline
                preload="metadata"
                aria-label={item.altText ?? title}
                className="block max-h-[75vh] w-full bg-black object-contain"
              />
            ) : (
              <CardImage
                src={item.mediaUrl}
                alt={item.altText ?? `${title} project media`}
                width={1200}
                height={1500}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 768px"
                className="block h-auto max-h-[75vh] w-full object-contain"
              />
            )}

            {item.caption && (
              <figcaption
                className="border-t border-[rgba(var(--color-secondary-rgb),0.08)] px-5 py-4 text-sm text-(--text-medium-emphasis)"
              >
                {item.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}