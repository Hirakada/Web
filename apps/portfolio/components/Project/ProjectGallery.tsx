import type { ProjectImage } from "@hirakada/database";

import { CardImage } from "@hirakada/ui";

export interface ProjectGalleryProps {
  images: ProjectImage[];
}

export default function ProjectGallery({
  images,
}: ProjectGalleryProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div>
        <h2>Gallery</h2>

        <p
          className="
            mt-2
            text-(--text-medium-emphasis)
          "
        >
          Selected screenshots showcasing the
          interface, interactions, and overall
          visual experience.
        </p>
      </div>

      <div
        className="
          flex
          flex-col
          gap-8
        "
      >
        {images.map((image) => (
          <figure
            key={image.id}
            className="
              overflow-hidden
              rounded-2xl
              border
              border-[rgba(var(--color-secondary-rgb),0.08)]
            "
          >
            <CardImage
              src={image.imageUrl}
              alt={
                image.altText ??
                "Project Screenshot"
              }
              width={1600}
              height={900}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 100vw, 80vw"
              className="
                w-full
                object-cover
              "
            />

            {(image.caption ||
              image.altText) && (
              <figcaption
                className="
                  border-t
                  border-[rgba(var(--color-secondary-rgb),0.08)]
                  bg-(--color-surface)
                  px-6
                  py-4
                  text-sm
                  text-(--text-medium-emphasis)
                "
              >
                {image.caption ??
                  image.altText}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}