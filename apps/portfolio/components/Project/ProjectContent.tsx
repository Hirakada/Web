import type { Project } from "@hirakada/database";

import {
  AttributeTag,
  BulletTag,
} from "@hirakada/ui";

import ProjectActions from "./ProjectActions";
import ProjectContributors from "./ProjectContributors";

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
        items-center
        gap-12
        p-[clamp(1.5rem,3vw,3rem)]
        text-center
      "
    >
      {/* Actions */}
      <ProjectActions
        project={project}
      />

      {/* Header */}
      <div
        className="
          flex
          w-full
          flex-col
          items-center
          space-y-6
          text-center
        "
      >
        <BulletTag
          variant="success"
          className="w-fit"
        >
          {project.status}
        </BulletTag>

        <h1 className="text-wrap">
          {project.title}
        </h1>

        <p
          className="
            max-w-4xl
            text-center
          "
        >
          {project.longDescription}
        </p>
      </div>

      {/* Technology */}
      {project.attributes.length > 0 && (
        <div
          className="
            flex
            w-full
            flex-col
            items-center
            space-y-5
            text-center
          "
        >
          <h2>
            Technology Stack
          </h2>

          <div
            className="
              flex
              flex-wrap
              justify-center
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
    </section>
  );
}