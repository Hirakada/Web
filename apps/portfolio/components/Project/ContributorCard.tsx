"use client";

import type { Contributor } from "@hirakada/database";
import { Icon } from "@iconify/react";

import {
  CardImage,
  SocialButton,
  SocialButtonGroup,
} from "@hirakada/ui";

export interface ContributorCardProps {
  contributor: Contributor;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function ContributorCard({
  contributor,
  onHoverStart,
  onHoverEnd,
}: ContributorCardProps) {
  const roles = contributor.roles ?? [];
  const primaryRole = roles[0];

  return (
    <article
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className="
        group/contributor
        relative
        h-full
        w-full
        rounded-3xl
        transition-transform
        duration-300
        ease-out
        hover:z-100
        hover:scale-[1.035]
      "
    >
      {/* =========================
          CARD SURFACE
      ========================== */}

      <div
        className="
          absolute
          inset-0
          overflow-hidden
          rounded-3xl
          border
          border-[rgba(var(--color-secondary-rgb),0.08)]
          bg-(--color-surface)
          shadow-sm
          transition-all
          duration-300
          group-hover/contributor:border-[rgba(var(--color-primary-rgb),0.18)]
          group-hover/contributor:shadow-xl
        "
      >
        {/* =========================
            FRONT
        ========================== */}

        <div
          className="
            absolute
            inset-0
            transition-all
            duration-300
            group-hover/contributor:scale-[0.985]
            group-hover/contributor:opacity-0
          "
        >
          {/* Image */}
          <div className="absolute inset-0">
            {contributor.profileImageUrl ? (
              <CardImage
                src={
                  contributor.profileImageUrl
                }
                alt={contributor.name}
                width={400}
                height={540}
                  quality={75}
                  sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) 50vw, 25vw"
                className="
                  h-full
                  w-full
                  object-cover
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-full
                  w-full
                  items-center
                  justify-center
                  bg-(--color-surface-secondary)
                  text-5xl
                  font-bold
                "
              >
                {getInitials(
                  contributor.name,
                )}
              </div>
            )}
          </div>

          {/* Gradient */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-linear-to-t
              from-black/80
              via-black/25
              to-transparent
            "
          />

          {/* Main Information */}
          <div
            className="
              absolute
              inset-x-0
              bottom-0
              p-5
              sm:p-6
            "
          >
            <div
              className="
                flex
                flex-col
                items-start
                gap-2.5
              "
            >
              <div className="h-8">
                {primaryRole && (
                  <span
                    className="inline-flex max-w-full items-center rounded-full border px-3 py-1.5 text-xs font-semibold leading-none text-white backdrop-blur-md"
                    style={{
                      borderColor:
                        primaryRole.color ??
                        "rgba(255,255,255,0.2)",
                      backgroundColor:
                        primaryRole.color
                          ? `color-mix(in srgb, ${primaryRole.color} 45%, transparent)`
                          : "rgba(0,0,0,0.25)",
                    }}
                  >
                    <span className="truncate">
                      {primaryRole.name}
                    </span>
                  </span>
                )}
              </div>

              <h3
                className="
                  h-12
                  max-w-full
                  line-clamp-2
                  text-left
                  text-xl
                  font-semibold
                  leading-tight
                  tracking-tight
                  text-white
                  sm:h-16
                  sm:text-2xl
                "
              >
                {contributor.name}
              </h3>
            </div>
          </div>
        </div>

        {/* =========================
            DETAIL
        ========================== */}

        <div
          className="
            absolute
            inset-0
            flex
            flex-col
            bg-(--color-surface)
            p-5
            opacity-0
            transition-all
            duration-300
            ease-out
            group-hover/contributor:opacity-100
            sm:p-6
          "
        >
          {/* Profile */}
          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            <div
              className="
                size-14
                shrink-0
                overflow-hidden
                rounded-2xl
                border
                border-[rgba(var(--color-secondary-rgb),0.08)]
                bg-(--color-surface-secondary)
              "
            >
              {contributor.profileImageUrl ? (
                <CardImage
                  src={
                    contributor.profileImageUrl
                  }
                  alt={contributor.name}
                  width={56}
                  height={56}
                  quality={75}
                  sizes="56px"
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-full
                    w-full
                    items-center
                    justify-center
                    text-lg
                    font-bold
                  "
                >
                  {getInitials(
                    contributor.name,
                  )}
                </div>
              )}
            </div>

            <div className="min-w-0">
              <h3
                className="
                  truncate
                  text-lg
                  font-semibold
                  tracking-tight
                "
              >
                {contributor.name}
              </h3>

              {primaryRole && (
                <p
                  className="
                    mt-1
                    truncate
                    text-sm
                    text-(--text-medium-emphasis)
                  "
                >
                  {primaryRole.name}
                </p>
              )}
            </div>
          </div>

          {/* Roles */}
          {roles.length > 0 && (
            <div className="mt-6">
              <p
                className="
                  mb-3
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.15em]
                  text-(--text-medium-emphasis)
                "
              >
                Roles
              </p>

              <div
                className="
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {roles.map((role) => (
                  <span
                    key={role.id}
                    className="
                      inline-flex
                      items-center
                      rounded-full
                      border
                      px-3
                      py-1.5
                      text-xs
                      font-semibold
                    "
                    style={{
                      borderColor:
                        role.color ??
                        "var(--color-border-subtle)",
                      backgroundColor:
                        role.color
                          ? `color-mix(in srgb, ${role.color} 12%, transparent)`
                          : "var(--color-surface-secondary)",
                    }}
                  >
                    {role.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social */}
          {(contributor.websiteUrl ||
            contributor.linkedinUrl) && (
            <div className="mt-auto pt-6">
              <SocialButtonGroup className="gap-3">
                {contributor.websiteUrl && (
                  <SocialButton
                    href={
                      contributor.websiteUrl
                    }
                    icon={
                      <Icon
                        icon="mdi:web"
                        className="text-lg"
                      />
                    }
                    label={`${contributor.name} website`}
                  />
                )}

                {contributor.linkedinUrl && (
                  <SocialButton
                    href={
                      contributor.linkedinUrl
                    }
                    icon={
                      <Icon
                        icon="mdi:linkedin"
                        className="text-lg"
                      />
                    }
                    label={`${contributor.name} LinkedIn`}
                  />
                )}
              </SocialButtonGroup>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}