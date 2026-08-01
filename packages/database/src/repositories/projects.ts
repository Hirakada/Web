import type { SupabaseClient } from "@supabase/supabase-js";

import type { Attribute } from "../types/attribute";
import type { Category } from "../types/category";
import type { Contributor } from "../types/contributor";
import type {
  Project,
  ProjectCard,
} from "../types/project";
import type {
  ProjectStatus,
  ProjectType,
} from "../types/enums";

type ProjectImageRow = {
  id: string;

  image_url: string;

  alt_text: string | null;

  caption: string | null;

  order: number;
};

type ProjectCategoryRow = {
  categories: {
    id: string;

    name: string;

    icon: string | null;

    color: string | null;

    description: string | null;
  };
};

type ProjectAttributeRow = {
  attributes: {
    id: string;

    name: string;

    type: Attribute["type"] | null;

    icon_url: string | null;

    description: string | null;
  };
};

type ProjectContributorRow = {
  contributors: {
    id: string;

    name: string;

    website_url: string | null;

    linkedin_url: string | null;

    profile_image_url: string | null;
  };

  roles: {
    id: string;

    name: string;

    icon: string | null;

    color: string | null;
  };
};

type ProjectBaseRow = {
  id: string;

  title: string;

  description: string;

  status: ProjectStatus;

  type: ProjectType;

  is_featured: boolean;

  completion_date: string | null;

  project_images: ProjectImageRow[] | null;

  project_categories:
    | ProjectCategoryRow[]
    | null;

  project_attributes:
    | ProjectAttributeRow[]
    | null;

  project_contributors:
    | ProjectContributorRow[]
    | null;
};

type ProjectRow = ProjectBaseRow & {
  long_description: string | null;

  project_url: string | null;

  github_url: string | null;
};

const PROJECT_CARD_SELECT = `
  id,
  title,
  description,
  status,
  type,
  is_featured,
  completion_date,

  project_images(
    id,
    image_url,
    alt_text,
    caption,
    order
  ),

  project_categories(
    categories(
      id,
      name,
      icon,
      color
    )
  ),

  project_attributes(
    attributes(
      id,
      name,
      icon_url
    )
  ),

  project_contributors(
    contributors(
      id,
      name,
      profile_image_url
    )
  )
`;

const PROJECT_DETAIL_SELECT = `
  id,
  title,
  description,
  long_description,
  project_url,
  github_url,
  status,
  type,
  is_featured,
  completion_date,

  project_images(
    id,
    image_url,
    alt_text,
    caption,
    order
  ),

  project_categories(
    categories(
      id,
      name,
      icon,
      color,
      description
    )
  ),

  project_attributes(
    attributes(
      id,
      name,
      type,
      icon_url,
      description
    )
  ),

  project_contributors(
    contributors(
      id,
      name,
      website_url,
      linkedin_url,
      profile_image_url
    ),

    roles(
      id,
      name,
      icon,
      color
    )
  )
`;

function mapImages(
  rows: ProjectImageRow[]
): Project["images"] {
  return [...rows]
    .sort((a, b) => a.order - b.order)
    .map((image) => ({
      id: image.id,

      imageUrl: image.image_url,

      ...(image.alt_text && {
        altText: image.alt_text,
      }),

      ...(image.caption && {
        caption: image.caption,
      }),

      order: image.order,
    }));
}

function mapCategories(
  rows: ProjectCategoryRow[]
): Category[] {
  return rows.map(
    ({ categories }) => ({
      id: categories.id,

      name: categories.name,

      ...(categories.icon && {
        icon: categories.icon,
      }),

      ...(categories.color && {
        color: categories.color,
      }),

      ...(categories.description && {
        description:
          categories.description,
      }),
    })
  );
}

function mapAttributes(
  rows: ProjectAttributeRow[]
): Attribute[] {
  return rows.map(
    ({ attributes }) => ({
      id: attributes.id,

      name: attributes.name,

      ...(attributes.type && {
        type: attributes.type,
      }),

      ...(attributes.icon_url && {
        iconUrl:
          attributes.icon_url,
      }),

      ...(attributes.description && {
        description:
          attributes.description,
      }),
    })
  );
}

function mapContributorCards(
  rows: ProjectContributorRow[]
): ProjectCard["contributors"] {
  const contributors = new Map<
    string,
    ProjectCard["contributors"][number]
  >();

  for (const {
    contributors: contributor,
  } of rows) {
    if (
      contributors.has(contributor.id)
    ) {
      continue;
    }

    contributors.set(
      contributor.id,
      {
        id: contributor.id,

        name: contributor.name,

        ...(contributor.profile_image_url && {
          profileImageUrl:
            contributor.profile_image_url,
        }),
      }
    );
  }

  return Array.from(
    contributors.values()
  );
}

function mapContributors(
  rows: ProjectContributorRow[]
): Contributor[] {
  const contributors = new Map<
    string,
    Contributor
  >();

  for (const row of rows) {
    const existing =
      contributors.get(
        row.contributors.id
      );

    const role = {
      id: row.roles.id,

      name: row.roles.name,

      ...(row.roles.icon && {
        icon: row.roles.icon,
      }),

      ...(row.roles.color && {
        color: row.roles.color,
      }),
    };

    if (existing) {
      existing.roles ??= [];
      existing.roles.push(role);
      continue;
    }

    contributors.set(
      row.contributors.id,
      {
        id: row.contributors.id,

        name: row.contributors.name,

        ...(row.contributors
          .website_url && {
          websiteUrl:
            row.contributors
              .website_url,
        }),

        ...(row.contributors
          .linkedin_url && {
          linkedinUrl:
            row.contributors
              .linkedin_url,
        }),

        ...(row.contributors
          .profile_image_url && {
          profileImageUrl:
            row.contributors
              .profile_image_url,
        }),

        roles: [role],
      }
    );
  }

  return Array.from(
    contributors.values()
  );
}

function mapProjectCard(
  project: ProjectBaseRow
): ProjectCard {
  const images = mapImages(
    project.project_images ?? []
  );

  return {
    id: project.id,

    title: project.title,

    description: project.description,

    status: project.status,

    type: project.type,

    isFeatured: project.is_featured,

    ...(project.completion_date && {
      completionDate:
        project.completion_date,
    }),

    ...(images[0] && {
      coverImage: images[0].imageUrl,
    }),

    categories: mapCategories(
      project.project_categories ?? []
    ).map((category) => ({
      id: category.id,

      name: category.name,

      ...(category.icon && {
        icon: category.icon,
      }),

      ...(category.color && {
        color: category.color,
      }),
    })),

    attributes: mapAttributes(
      project.project_attributes ?? []
    ).map((attribute) => ({
      id: attribute.id,

      name: attribute.name,

      ...(attribute.iconUrl && {
        iconUrl: attribute.iconUrl,
      }),
    })),

    contributors: mapContributorCards(
      project.project_contributors ?? []
    ),
  };
}

function mapProjectDetail(
  project: ProjectRow
): Project {
  const images = mapImages(
    project.project_images ?? []
  );

  return {
    id: project.id,

    title: project.title,

    description: project.description,

    ...(project.long_description && {
      longDescription:
        project.long_description,
    }),

    ...(project.project_url && {
      projectUrl: project.project_url,
    }),

    ...(project.github_url && {
      githubUrl: project.github_url,
    }),

    status: project.status,

    type: project.type,

    isFeatured: project.is_featured,

    ...(project.completion_date && {
      completionDate:
        project.completion_date,
    }),

    ...(images[0] && {
      coverImage: images[0].imageUrl,
    }),

    images,

    categories: mapCategories(
      project.project_categories ?? []
    ),

    attributes: mapAttributes(
      project.project_attributes ?? []
    ),

    contributors: mapContributors(
      project.project_contributors ?? []
    ),
  };
}

export async function getProjectCards(
  supabase: SupabaseClient
): Promise<ProjectCard[]> {
  const { data, error } = await supabase
    .from("projects")
    .select(PROJECT_CARD_SELECT)
    .order("order");

  if (error) {
    throw error;
  }

  return (
    data as unknown as ProjectBaseRow[]
  ).map(mapProjectCard);
}

export async function getProjectById(
  supabase: SupabaseClient,
  id: string
): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .select(PROJECT_DETAIL_SELECT)
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw error;
  }

  return mapProjectDetail(
    data as unknown as ProjectRow
  );
}

export async function getRelatedProjects(
  supabase: SupabaseClient,
  currentId: string,
  limit = 3
): Promise<ProjectCard[]> {
  const { data, error } = await supabase
    .from("projects")
    .select(PROJECT_CARD_SELECT)
    .neq("id", currentId)
    .order("order")
    .limit(limit);

  if (error) {
    throw error;
  }

  return (
    data as unknown as ProjectBaseRow[]
  ).map(mapProjectCard);
}

