import type { SupabaseClient } from "@supabase/supabase-js";

import type { Attribute } from "../types/attribute";
import type { Contributor } from "../types/contributor";
import type {
  Project,
  ProjectCard,
  ProjectMedia,
} from "../types/project";
import type {
  ProjectStatus,
  ProjectType,
} from "../types/enums";

const PROJECT_MEDIA_BUCKET_ENV = "HIRAKADA_SUPABASE_STORAGE_BUCKET";

function resolveProjectMediaUrl(
  supabase: SupabaseClient,
  mediaUrl: string | null | undefined
): string {
  const value = mediaUrl?.trim();

  if (!value) {
    return "";
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const bucketName =
    process.env.HIRAKADA_SUPABASE_STORAGE_BUCKET?.trim();

  if (!bucketName) {
    throw new Error(
      `Cannot resolve relative project media paths: ${PROJECT_MEDIA_BUCKET_ENV} is not configured.`
    );
  }

  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(value.replace(/[?#]/g, (character) =>
      character === "?" ? "%3F" : "%23"
    ));

  if (!data.publicUrl) {
    throw new Error(
      `Supabase did not return a public URL for project media bucket "${bucketName}".`
    );
  }

  return data.publicUrl.replace(/%25(3F|23)/gi, "%$1");
}

type ProjectMediaRow = {
  id: string;

  media_type: "image" | "video";

  media_url: string;

  alt_text: string | null;

  caption: string | null;

  order: number;

  isBanner: boolean | null;
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

  is_featured: boolean;

  categories: string[] | null;

  experience_id: string | null;

  completion_date: string | null;

  project_media: ProjectMediaRow[] | null;

  project_attributes:
    | ProjectAttributeRow[]
    | null;

  project_contributors:
    | ProjectContributorRow[]
    | null;
};

type ProjectRow = ProjectBaseRow & {
  type: ProjectType;

  completion_date: string | null;

  long_description: string | null;

  project_url: string | null;

  github_url: string | null;
};

const PROJECT_CARD_SELECT = `
  id,
  title,
  description,
  status,
  is_featured,
  categories,
  experience_id,
  completion_date,

  project_media(
    id,
    media_type,
    media_url,
    alt_text,
    caption,
    order,
    isBanner
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
  experience_id,
  categories,

  project_media(
    id,
    media_type,
    media_url,
    alt_text,
    caption,
    order,
    isBanner
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
  supabase: SupabaseClient,
  rows: ProjectMediaRow[]
): Project["images"] {
  return [...rows]
    .sort((a, b) => a.order - b.order)
    .filter(
      (image) =>
        image.media_type === "image" &&
        typeof image.media_url === "string" &&
        image.media_url.trim().length > 0
    )
    .map((image) => ({
      id: image.id,

      imageUrl: resolveProjectMediaUrl(
        supabase,
        image.media_url
      ),

      ...(image.alt_text && {
        altText: image.alt_text,
      }),

      ...(image.caption && {
        caption: image.caption,
      }),

      order: image.order,

      isBanner: image.isBanner,
    }));
}

function mapMedia(
  supabase: SupabaseClient,
  rows: ProjectMediaRow[] | null | undefined
): ProjectMedia[] {
  return [...(rows ?? [])]
    .sort((a, b) => a.order - b.order)
    .filter(
      (media) =>
        (media.media_type === "image" ||
          media.media_type === "video") &&
        typeof media.media_url === "string" &&
        media.media_url.trim().length > 0 &&
        media.isBanner !== true
    )
    .map((media) => ({
      id: media.id,
      mediaType: media.media_type,
      mediaUrl: resolveProjectMediaUrl(
        supabase,
        media.media_url
      ),
      ...(media.alt_text && {
        altText: media.alt_text,
      }),
      ...(media.caption && {
        caption: media.caption,
      }),
      order: media.order,
    }));
}

function mapCategories(
  categories: string[] | null | undefined
): string[] {
  const seen = new Set<string>();

  return (categories ?? []).flatMap((category) => {
    const name = category.trim();
    const normalizedName = name.toLocaleLowerCase();

    if (!name || seen.has(normalizedName)) {
      return [];
    }

    seen.add(normalizedName);
    return [name];
  });
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
  supabase: SupabaseClient,
  project: ProjectBaseRow
): ProjectCard {
  const images = mapImages(
    supabase,
    project.project_media ?? []
  );
  const bannerImage = images.find(
    (image) => image.isBanner === true
  );

  return {
    id: project.id,

    title: project.title,

    description: project.description,

    status: project.status,

    isFeatured: project.is_featured,

    categories: mapCategories(project.categories),

    ...(project.completion_date && {
      completionDate: project.completion_date,
    }),

    ...(project.experience_id && {
      experienceId: project.experience_id,
    }),

    ...(bannerImage && {
      coverImage: bannerImage.imageUrl,
    }),

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
  supabase: SupabaseClient,
  project: ProjectRow
): Project {
  const images = mapImages(
    supabase,
    project.project_media ?? []
  );
  const bannerImage = images.find(
    (image) => image.isBanner === true
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

      ...(project.experience_id && {
        experienceId: project.experience_id,
      }),

    ...(bannerImage && {
      coverImage: bannerImage.imageUrl,
    }),

    images,

    media: mapMedia(
      supabase,
      project.project_media
    ),

    categories: mapCategories(project.categories),

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
  ).map((project) =>
    mapProjectCard(supabase, project)
  );
}

export async function getProjectCardsByExperienceIds(
  supabase: SupabaseClient,
  experienceIds: string[],
  excludeProjectId?: string,
  limit?: number
): Promise<ProjectCard[]> {
  const uniqueIds = Array.from(new Set(experienceIds));

  if (uniqueIds.length === 0) {
    return [];
  }

  let query = supabase
    .from("projects")
    .select(PROJECT_CARD_SELECT)
    .in("experience_id", uniqueIds)
    .order("order")
    .order("title");

  if (excludeProjectId) {
    query = query.neq("id", excludeProjectId);
  }

  if (limit !== undefined) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return (data as unknown as ProjectBaseRow[]).map((project) =>
    mapProjectCard(supabase, project)
  );
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
    supabase,
    data as unknown as ProjectRow
  );
}

export async function getRelatedProjects(
  supabase: SupabaseClient,
  currentId: string,
  limit = 3
): Promise<ProjectCard[]> {
  const [outgoing, incoming, currentProject] = await Promise.all([
    supabase
      .from("project_relations")
      .select("related_project_id")
      .eq("project_id", currentId),
    supabase
      .from("project_relations")
      .select("project_id")
      .eq("related_project_id", currentId),
    supabase
      .from("projects")
      .select("categories, experience_id")
      .eq("id", currentId)
      .maybeSingle(),
  ]);

  if (outgoing.error) {
    throw outgoing.error;
  }
  if (incoming.error) {
    throw incoming.error;
  }
  if (currentProject.error) {
    throw currentProject.error;
  }

  const explicitIds = Array.from(
    new Set([
      ...(outgoing.data ?? []).map((relation) =>
        relation.related_project_id
      ),
      ...(incoming.data ?? []).map((relation) =>
        relation.project_id
      ),
    ])
  ).filter((projectId) => projectId !== currentId);

  if (explicitIds.length > 0) {
    const explicitProjects = await getProjectCardsByIds(
      supabase,
      explicitIds,
      limit
    );

    if (explicitProjects.length > 0) {
      return explicitProjects;
    }
  }

  const experienceId = currentProject.data?.experience_id;

  if (experienceId) {
    const experienceProjects =
      await getProjectCardsByExperienceIds(
        supabase,
        [experienceId],
        currentId,
        limit
      );

    if (experienceProjects.length > 0) {
      return experienceProjects;
    }
  }

  const categories = mapCategories(currentProject.data?.categories);

  if (categories.length === 0) {
    return [];
  }

  const { data: candidates, error: candidateError } = await supabase
    .from("projects")
    .select("id, title, categories, completion_date")
    .neq("id", currentId)
    .overlaps("categories", categories);

  if (candidateError) {
    throw candidateError;
  }

  const normalizedCategories = new Set(
    categories.map((category) => category.toLocaleLowerCase())
  );

  const rankedIds = (candidates ?? [])
    .map((project) => ({
      id: project.id,
      title: project.title,
      completionDate: project.completion_date,
      sharedCategoryCount: mapCategories(project.categories).filter(
        (category) =>
          normalizedCategories.has(category.toLocaleLowerCase())
      ).length,
    }))
    .filter((project) => project.sharedCategoryCount > 0)
    .sort(
      (a, b) =>
        b.sharedCategoryCount - a.sharedCategoryCount ||
        (b.completionDate ?? "").localeCompare(
          a.completionDate ?? ""
        ) ||
        a.title.localeCompare(b.title) ||
        a.id.localeCompare(b.id)
    )
    .slice(0, limit)
    .map((project) => project.id);

  return getProjectCardsByIds(
    supabase,
    rankedIds,
    limit,
    true
  );
}

async function getProjectCardsByIds(
  supabase: SupabaseClient,
  projectIds: string[],
  limit: number,
  preserveInputOrder = false
): Promise<ProjectCard[]> {
  if (projectIds.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from("projects")
    .select(PROJECT_CARD_SELECT)
    .in("id", projectIds)
    .order("order")
    .order("title")
    .limit(limit);

  if (error) {
    throw error;
  }

  const cards = (data as unknown as ProjectBaseRow[]).map((project) =>
    mapProjectCard(supabase, project)
  );

  const cardsById = new Map(
    cards.map((project) => [project.id, project])
  );

  if (!preserveInputOrder) {
    return cards;
  }

  return projectIds.flatMap((projectId) => {
    const project = cardsById.get(projectId);
    return project ? [project] : [];
  });
}
