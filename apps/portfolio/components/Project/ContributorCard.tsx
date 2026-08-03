"use client";

import { useState } from "react";

import type { Contributor } from "@hirakada/database";
import { Icon } from "@iconify/react";

import {
  CardImage,
  SocialButton,
  SocialButtonGroup,
} from "@hirakada/ui";

export interface ContributorCardProps {
  contributor: Contributor;
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
}: ContributorCardProps) {
  const [showRoles, setShowRoles] = useState(false);

  const roles = contributor.roles ?? [];
  const primaryRole = roles[0];

  return (
    <article
      className="
        group
        relative
        flex
        min-h-90
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-[rgba(var(--color-secondary-rgb),0.08)]
        bg-(--color-surface)
        p-6
        text-center
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[rgba(var(--color-primary-rgb),0.16)]
        hover:shadow-lg
      "
    >
      {/* Background */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-3xl
          bg-[radial-gradient(circle_at_top,rgba(var(--color-primary-rgb),0.05),transparent_68%)]
          opacity-80
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          left-1/2
          h-64
          w-64
          -translate-x-1/2
          rounded-full
          bg-[rgba(var(--color-primary-rgb),0.025)]
          blur-3xl
        "
      />

      <div
        className="
          relative
          flex
          h-full
          flex-1
          flex-col
          items-center
        "
      >
        {/* Avatar */}
        <div
          className="
            h-20
            w-20
            overflow-hidden
            rounded-full
            border
            border-[rgba(var(--color-secondary-rgb),0.08)]
            bg-(--color-surface-secondary)
            shadow-sm
          "
        >
          {contributor.profileImageUrl ? (
            <CardImage
              src={contributor.profileImageUrl}
              alt={contributor.name}
              width={80}
              height={80}
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
                text-xl
                font-bold
              "
            >
              {getInitials(contributor.name)}
            </div>
          )}
        </div>

        {/* Name */}
        <h3
          className="
            mt-5
            text-xl
            font-semibold
            tracking-tight
          "
        >
          {contributor.name}
        </h3>

        {/* Roles */}
        {roles.length > 0 ? (
          <div
            className="
              mt-3
              flex
              flex-col
              items-center
              gap-2
            "
          >
            <span
              className="
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                text-white
              "
              style={{
                backgroundColor:
                  primaryRole?.color ??
                  "rgb(var(--color-primary-rgb))",
              }}
            >
              {primaryRole?.name}
            </span>

            {roles.length > 1 && (
              <button
                type="button"
                onClick={() => setShowRoles(true)}
                className="
                  cursor-pointer
                  text-xs
                  text-(--text-medium-emphasis)
                  transition-colors
                  hover:text-(--color-primary)
                "
              >
                +{roles.length - 1} more roles
              </button>
            )}
          </div>
        ) : (
          <span
            className="
              mt-3
              text-sm
              text-(--text-medium-emphasis)
            "
          >
            No roles available
          </span>
        )}

        {/* Social */}
        {(contributor.websiteUrl ||
          contributor.linkedinUrl) && (
          <SocialButtonGroup
            className="
              mt-auto
              gap-3
              pt-6
            "
          >
            {contributor.websiteUrl && (
              <SocialButton
                href={contributor.websiteUrl}
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
                href={contributor.linkedinUrl}
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
        )}
      </div>

      {/* Roles Popup */}
      {showRoles && (
        <div
          className="
            absolute
            inset-0
            z-20
            flex
            items-center
            justify-center
            rounded-3xl
            bg-(--color-surface)/95
            p-6
            backdrop-blur-sm
          "
        >
          <div
            className="
              flex
              flex-col
              items-center
              gap-4
            "
          >
            <h4
              className="
                text-lg
                font-semibold
              "
            >
              Roles
            </h4>

            <div
              className="
                flex
                flex-wrap
                justify-center
                gap-2
              "
            >
              {roles.map((role) => (
                <span
                  key={role.id}
                  className="
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-white
                  "
                  style={{
                    backgroundColor:
                      role.color ??
                      "rgb(var(--color-primary-rgb))",
                  }}
                >
                  {role.name}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                setShowRoles(false)
              }
              className="
                cursor-pointer
                rounded-full
                border
                border-[rgba(var(--color-secondary-rgb),0.08)]
                px-4
                py-2
                text-xs
                transition
                hover:text-(--color-primary)
              "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </article>
  );
}