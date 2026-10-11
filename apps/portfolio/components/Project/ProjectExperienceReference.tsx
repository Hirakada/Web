import { DOMAIN } from "@hirakada/config";
import type { JourneyEntry } from "@hirakada/database";
import { Icon } from "@iconify/react";

interface ProjectExperienceReferenceProps {
  experience: JourneyEntry;
}

export default function ProjectExperienceReference({
  experience,
}: ProjectExperienceReferenceProps) {
  const organization = experience.organizations;
  const formattedStart = formatDate(experience.start_date);
  const formattedEnd = experience.end_date
    ? formatDate(experience.end_date)
    : "Present";

  return (
    <a
      href={`${DOMAIN.web}/journey#experience-${experience.id}`}
      aria-label={`View ${experience.title} experience on the journey page`}
      className="
        group
        flex
        w-full
        max-w-4xl
        items-center
        justify-between
        gap-4
        rounded-2xl
        border
        border-(--color-border)
        bg-(--color-surface)
        p-5
        text-left
        transition-colors
        hover:border-[rgba(var(--color-primary-rgb),0.3)]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[rgba(var(--color-primary-rgb),0.3)]
      "
    >
      <span className="min-w-0">
        <span className="block text-xs font-medium uppercase tracking-wide text-(--text-medium-emphasis)">
          Associated experience
        </span>
        <span className="mt-1 block text-lg font-semibold text-(--text-high-emphasis)">
          {experience.title}
        </span>
        {(experience.role || organization) && (
          <span className="mt-1 block text-sm text-(--text-medium-emphasis)">
            {[experience.role, organization?.name]
              .filter(Boolean)
              .join(" · ")}
          </span>
        )}
        <span className="mt-1 block text-sm text-(--text-medium-emphasis)">
          {formattedStart} — {formattedEnd}
          {experience.location ? ` · ${experience.location}` : ""}
        </span>
      </span>
      <Icon
        icon="mdi:arrow-top-right"
        aria-hidden="true"
        className="shrink-0 text-xl transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  );
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}
