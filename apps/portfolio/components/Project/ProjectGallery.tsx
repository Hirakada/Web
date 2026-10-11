"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const reduceMotion = useReducedMotion();
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const triggerRef = useRef<HTMLElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const stopHoverPreview = useCallback((idToStop?: string) => {
    const idsToPause = idToStop
      ? [idToStop]
      : Object.keys(videoRefs.current);

    idsToPause.forEach((mediaId) => {
      const video = videoRefs.current[mediaId];

      if (!video) {
        return;
      }

      video.pause();
      video.currentTime = 0;
      video.muted = true;
    });
  }, []);

  const handleVideoPointerEnter = useCallback(
    (mediaId: string, pointerType: string) => {
      if (pointerType !== "mouse" || reduceMotion) {
        return;
      }

      const video = videoRefs.current[mediaId];

      if (!video) {
        return;
      }

      Object.entries(videoRefs.current).forEach(([id, currentVideo]) => {
        if (id === mediaId || !currentVideo) {
          return;
        }

        currentVideo.pause();
        currentVideo.currentTime = 0;
      });

      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.play().catch(() => undefined);
    },
    [reduceMotion]
  );

  const handleVideoPointerLeave = useCallback(
    (mediaId: string, pointerType: string) => {
      if (pointerType !== "mouse") {
        return;
      }

      const video = videoRefs.current[mediaId];

      if (!video) {
        return;
      }

      video.pause();
      video.currentTime = 0;
    },
    []
  );

  const openMediaViewer = useCallback(
    (index: number, trigger: HTMLElement | null) => {
      triggerRef.current = trigger;
      stopHoverPreview();
      setSelectedIndex(index);
    },
    [stopHoverPreview]
  );

  const closeMediaViewer = useCallback(() => {
    setSelectedIndex(null);
    stopHoverPreview();

    if (triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [stopHoverPreview]);

  const showPreviousMedia = useCallback(() => {
    if (media.length <= 1) {
      return;
    }

    setSelectedIndex((currentIndex) => {
      if (currentIndex === null) {
        return 0;
      }

      return (currentIndex - 1 + media.length) % media.length;
    });
    stopHoverPreview();
  }, [media.length, stopHoverPreview]);

  const showNextMedia = useCallback(() => {
    if (media.length <= 1) {
      return;
    }

    setSelectedIndex((currentIndex) => {
      if (currentIndex === null) {
        return 0;
      }

      return (currentIndex + 1) % media.length;
    });
    stopHoverPreview();
  }, [media.length, stopHoverPreview]);

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMediaViewer();
        return;
      }

      if (event.key === "ArrowLeft") {
        showPreviousMedia();
      }

      if (event.key === "ArrowRight") {
        showNextMedia();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = previousOverflow;
      stopHoverPreview();
    };
  }, [closeMediaViewer, selectedIndex, showNextMedia, showPreviousMedia, stopHoverPreview]);

  if (media.length === 0) {
    return null;
  }

  const selectedMedia =
    selectedIndex === null ? null : media[selectedIndex];

  return (
    <section
      aria-label={`${title} gallery`}
      className="mx-auto w-full max-w-6xl"
    >
      <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-4">
        {media.map((item, index) => {
          const isVideo = item.mediaType === "video";

          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={(event) => {
                openMediaViewer(index, event.currentTarget);
              }}
              aria-label={`Open ${item.altText ?? `${title} gallery item`} in preview`}
              className="group relative aspect-square overflow-hidden rounded-xl border border-[rgba(var(--color-secondary-rgb),0.08)] bg-(--color-surface) text-left shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--color-primary-rgb),0.45)]"
            >
              <div className="absolute inset-0 z-10 bg-black/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

              {isVideo ? (
                <video
                  ref={(element) => {
                    videoRefs.current[item.id] = element;
                  }}
                  src={item.mediaUrl}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={item.altText ?? title}
                  className="block h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  onPointerEnter={(event) => {
                    handleVideoPointerEnter(
                      item.id,
                      event.pointerType
                    );
                  }}
                  onPointerLeave={(event) => {
                    handleVideoPointerLeave(
                      item.id,
                      event.pointerType
                    );
                  }}
                />
              ) : (
                <CardImage
                  src={item.mediaUrl}
                  alt={item.altText ?? `${title} project media`}
                  width={1200}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 33vw, (max-width: 1280px) 25vw, 20vw"
                  unoptimized
                  className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              )}

              {isVideo && (
                <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white shadow-lg backdrop-blur-sm">
                    <Icon icon="mdi:play" className="text-xl" />
                  </span>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {selectedMedia &&
        createPortal(
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-sm sm:p-6"
              onClick={closeMediaViewer}
            >
              <motion.div
                initial={{ scale: 0.98, opacity: 0, y: 12 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.98, opacity: 0, y: 8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={(event) => event.stopPropagation()}
                className="relative my-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-[#111827] shadow-2xl"
              >
                <button
                  type="button"
                  onClick={closeMediaViewer}
                  aria-label="Close media preview"
                  className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white transition-colors hover:bg-black/55"
                >
                  <Icon icon="mdi:close" className="text-xl" />
                </button>

                {selectedMedia.mediaType === "video" ? (
                  <div className="flex max-h-[88dvh] min-h-[55dvh] items-center justify-center bg-black">
                    <video
                      key={selectedMedia.id}
                      src={selectedMedia.mediaUrl}
                      controls
                      autoPlay
                      playsInline
                      preload="auto"
                      className="block max-h-[88dvh] w-full object-contain"
                      onPause={() => {
                        stopHoverPreview();
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex max-h-[88dvh] min-h-[55dvh] items-center justify-center bg-[#0f172a]">
                    <CardImage
                      src={selectedMedia.mediaUrl}
                      alt={selectedMedia.altText ?? `${title} preview image`}
                      width={1600}
                      height={1600}
                      unoptimized
                      className="block h-auto max-h-[88dvh] w-auto max-w-full object-contain"
                    />
                  </div>
                )}

                {(selectedMedia.caption || media.length > 1) && (
                  <div className="flex flex-col gap-3 border-t border-white/10 bg-black/20 px-4 py-3 text-white sm:flex-row sm:items-center sm:justify-between sm:px-5">
                    {selectedMedia.caption && (
                      <p className="text-sm text-slate-200">
                        {selectedMedia.caption}
                      </p>
                    )}

                    {media.length > 1 && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={showPreviousMedia}
                          aria-label="View previous media item"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors hover:bg-white/10"
                        >
                          <Icon icon="mdi:chevron-left" className="text-lg" />
                        </button>

                        <span className="min-w-12 text-center text-xs text-slate-300">
                          {selectedIndex! + 1}/{media.length}
                        </span>

                        <button
                          type="button"
                          onClick={showNextMedia}
                          aria-label="View next media item"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors hover:bg-white/10"
                        >
                          <Icon icon="mdi:chevron-right" className="text-lg" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
