"use client";

import { useState } from "react";
import type { ProjectMedia } from "@hirakada/database";

import { CardImage } from "@hirakada/ui";
import { Icon } from "@iconify/react";

export interface ProjectGalleryProps {
  title: string;

  media: ProjectMedia[];
}

export default function ProjectGallery({
  title,
  media,
}: ProjectGalleryProps) {
  const [downloading, setDownloading] = useState<
    Record<string, boolean>
  >({});
  const [downloadErrors, setDownloadErrors] = useState<
    Record<string, string>
  >({});

  if (media.length === 0) {
    return null;
  }

  async function downloadImage(
    imageUrl: string,
    mediaId: string
  ) {
    setDownloading((current) => ({
      ...current,
      [mediaId]: true,
    }));
    setDownloadErrors((current) => ({
      ...current,
      [mediaId]: "",
    }));

    try {
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error(
          `Image download failed with status ${response.status}.`
        );
      }

      const imageBlob = await response.blob();
      const imageUrlObject = URL.createObjectURL(imageBlob);
      const downloadLink = document.createElement("a");
      downloadLink.href = imageUrlObject;
      downloadLink.download = getImageFilename(imageUrl);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
      window.setTimeout(
        () => URL.revokeObjectURL(imageUrlObject),
        1000
      );
    } catch {
      setDownloadErrors((current) => ({
        ...current,
        [mediaId]:
          "Unable to download this image. Open it in a new tab and save it from your browser.",
      }));
    } finally {
      setDownloading((current) => ({
        ...current,
        [mediaId]: false,
      }));
    }
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
              <a
                href={item.mediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${item.altText ?? `${title} project image`} in a new tab`}
                className="block"
              >
                <CardImage
                  src={item.mediaUrl}
                  alt={item.altText ?? `${title} project media`}
                  width={1200}
                  height={1500}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, 768px"
                  unoptimized
                  className="block h-auto max-h-[75vh] w-full object-contain"
                />
              </a>
            )}

            {item.mediaType === "image" && (
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[rgba(var(--color-secondary-rgb),0.08)] px-5 py-4">
                {item.caption && (
                  <figcaption className="min-w-0 flex-1 text-left text-sm text-(--text-medium-emphasis)">
                    {item.caption}
                  </figcaption>
                )}

                <button
                  type="button"
                  onClick={() =>
                    void downloadImage(item.mediaUrl, item.id)
                  }
                  disabled={downloading[item.id]}
                  aria-label={`Download ${item.altText ?? `${title} project image`}`}
                  className="
                    inline-flex
                    shrink-0
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-[rgba(var(--color-secondary-rgb),0.12)]
                    bg-(--color-surface)
                    px-4
                    py-2
                    text-sm
                    font-medium
                    transition-colors
                    hover:border-[rgba(var(--color-primary-rgb),0.3)]
                    hover:bg-[rgba(var(--color-primary-rgb),0.05)]
                    disabled:cursor-wait
                    disabled:opacity-60
                  "
                >
                  <Icon icon="mdi:download" className="text-lg" />
                  {downloading[item.id] ? "Downloading…" : "Download"}
                </button>

                {downloadErrors[item.id] && (
                  <p
                    role="alert"
                    className="w-full text-left text-sm text-(--text-medium-emphasis)"
                  >
                    {downloadErrors[item.id]}
                  </p>
                )}
              </div>
            )}

            {item.mediaType === "video" && item.caption && (
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

function getImageFilename(imageUrl: string): string {
  const path = new URL(imageUrl).pathname;
  const encodedFilename = path.split("/").pop() ?? "";

  try {
    return decodeURIComponent(encodedFilename) || "project-image";
  } catch {
    return encodedFilename || "project-image";
  }
}
