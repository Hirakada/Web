import {
  PROJECT_STATUS_META,
  PROJECT_TYPE_META,
  type Project,
} from "@hirakada/database";

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
  const status =
    PROJECT_STATUS_META[project.status];

  const type =
    PROJECT_TYPE_META[project.type];

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
      <ProjectActions
        project={project}
      />

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
        <div
          className="
            flex
            flex-wrap
            justify-center
            gap-3
          "
        >
          <BulletTag
            variant={status.variant}
            animated={
              status.animated
            }
          >
            {project.status}
          </BulletTag>

          <BulletTag
            variant={type.variant}
          >
            {project.type}
          </BulletTag>
        </div>

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
            {project.attributes.map(
              (attribute) => (
                <AttributeTag
                  key={attribute.id}
                  iconUrl={
                    attribute.iconUrl
                  }
                >
                  {attribute.name}
                </AttributeTag>
              )
            )}
          </div>
        </div>
      )}

      {project.contributors.length > 0 && (
        <ProjectContributors
          contributors={
            project.contributors
          }
        />
      )}
    </section>
  );
}