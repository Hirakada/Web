import type { Project } from "@hirakada/database";

import ReactMarkdown from "react-markdown";

import { AttributeTag } from "@hirakada/ui";

import ProjectContributors from "./ProjectContributors";
import ProjectGallery from "./ProjectGallery";

export interface ProjectContentProps {
  project: Project;
}

export default function ProjectContent({
  project,
}: ProjectContentProps) {
  return (
    <section
      className="
        flex
        flex-col
        gap-12
        p-[clamp(1.5rem,3vw,3rem)]
      "
    >
      {/* Overview */}

      <div className="space-y-4">
        <h2>Overview</h2>

        <p className="text-(--text-medium-emphasis)">
          {project.description}
        </p>
      </div>

      {/* Information */}

      <div
        className="
          grid
          gap-6
          md:grid-cols-3
        "
      >
        <div>
          <p className="text-sm text-(--text-medium-emphasis)">
            Status
          </p>

          <p className="mt-2 font-medium">
            {project.status}
          </p>
        </div>

        {project.category && (
          <div>
            <p className="text-sm text-(--text-medium-emphasis)">
              Category
            </p>

            <p className="mt-2 font-medium">
              {project.category}
            </p>
          </div>
        )}

        {project.completionDate && (
          <div>
            <p className="text-sm text-(--text-medium-emphasis)">
              Completion
            </p>

            <p className="mt-2 font-medium">
              {project.completionDate}
            </p>
          </div>
        )}
      </div>

      {/* Technologies */}

      {project.attributes.length > 0 && (
        <div className="space-y-5">
          <h2>Technology Stack</h2>

          <div
            className="
              flex
              flex-wrap
              gap-3
            "
          >
            {project.attributes.map((attribute) => (
              <AttributeTag
                key={attribute.id}
                iconUrl={attribute.iconUrl}
              >
                {attribute.name}
              </AttributeTag>
            ))}
          </div>
        </div>
      )}

      {/* Contributors */}

      {project.contributors.length > 0 && (
        <ProjectContributors
          contributors={project.contributors}
        />
      )}

      {/* Gallery */}

      {project.images.length > 0 && (
        <ProjectGallery
          images={project.images}
        />
      )}

      {/* Long Description */}

      {project.longDescription && (
        <div className="space-y-6">
          <h2>Details</h2>

          <div
            className="
              prose
              prose-neutral
              max-w-none
              dark:prose-invert
            "
          >
            <ReactMarkdown>
              {project.longDescription}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </section>
  );
}