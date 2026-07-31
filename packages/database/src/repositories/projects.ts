import type { SupabaseClient } from "@supabase/supabase-js";

import type {
  Project,
  ProjectCard,
} from "../types/project";

type ProjectImageRow = {
  id: string;
  image_url: string;
  alt_text: string | null;
  caption: string | null;
  order: number;
};


type ProjectAttributeRow = {
  attributes: {
    id: string;
    name: string;
    type: string | null;
    icon_url: string | null;
    description: string | null;
  };
};


type ProjectContributorRow = {
  role_on_project: string[] | null;

  contributors: {
    id: string;
    name: string;
    website_url: string | null;
    linkedin_url: string | null;
    profile_image_url: string | null;
  };
};

type ProjectBaseRow = {
  id: string;
  title: string;
  description: string;
  status: string;
  is_featured: boolean;
  completion_date: string | null;

  project_images: ProjectImageRow[] | null;
  project_attributes: ProjectAttributeRow[] | null;
  project_contributors: ProjectContributorRow[] | null;
};

type ProjectRow = ProjectBaseRow & {
  long_description: string | null;
  category: string | null;
  project_url: string | null;
  github_url: string | null;
};

function mapProjectDetail(project: ProjectRow): Project {
  const sortedImages = [
    ...(project.project_images ?? []),
  ].sort((a, b) => a.order - b.order);

  return {
    id: project.id,

    title: project.title,

    description: project.description,

    ...(project.long_description && {
      longDescription: project.long_description,
    }),

    ...(project.category && {
      category: project.category,
    }),

    ...(project.project_url && {
      projectUrl: project.project_url,
    }),

    ...(project.github_url && {
      githubUrl: project.github_url,
    }),

    status: project.status,

    isFeatured: project.is_featured,

    ...(project.completion_date && {
      completionDate: project.completion_date,
    }),

    ...(sortedImages[0]?.image_url && {
      coverImage: sortedImages[0].image_url,
    }),

    images: sortedImages.map((image) => ({
      id: image.id,
      imageUrl: image.image_url,

      ...(image.alt_text && {
        altText: image.alt_text,
      }),

      ...(image.caption && {
        caption: image.caption,
      }),

      order: image.order,
    })),

    attributes: (project.project_attributes ?? []).map(
      ({ attributes }) => ({
        id: attributes.id,

        name: attributes.name,

        ...(attributes.type && {
          type: attributes.type,
        }),

        ...(attributes.icon_url && {
          iconUrl: attributes.icon_url,
        }),

        ...(attributes.description && {
          description: attributes.description,
        }),
      })
    ),

    contributors: (project.project_contributors ?? []).map(
      ({
        contributors,
        role_on_project,
      }) => ({
        id: contributors.id,

        name: contributors.name,

        ...(contributors.website_url && {
          websiteUrl: contributors.website_url,
        }),

        ...(contributors.linkedin_url && {
          linkedinUrl: contributors.linkedin_url,
        }),

        ...(contributors.profile_image_url && {
          profileImageUrl:
            contributors.profile_image_url,
        }),

        roles: role_on_project ?? [],
      })
    ),
  };
}

function mapProjectCard(
  project: ProjectBaseRow
): ProjectCard {
  const sortedImages = [
    ...(project.project_images ?? []),
  ].sort((a, b) => a.order - b.order);

  return {
    id: project.id,
    title: project.title,
    description: project.description,
    status: project.status,
    isFeatured: project.is_featured,

    ...(project.completion_date && {
      completionDate: project.completion_date,
    }),

    ...(sortedImages[0]?.image_url && {
      coverImage: sortedImages[0].image_url,
    }),

    attributes: (project.project_attributes ?? []).map(
      ({ attributes }) => ({
        id: attributes.id,
        name: attributes.name,

        ...(attributes.icon_url && {
          iconUrl: attributes.icon_url,
        }),
      })
    ),

    contributors: (project.project_contributors ?? []).map(
      ({ contributors }) => ({
        id: contributors.id,
        name: contributors.name,

        ...(contributors.profile_image_url && {
          profileImageUrl:
            contributors.profile_image_url,
        }),
      })
    ),
  };
}

export async function getProjectCards(
  supabase: SupabaseClient
): Promise<ProjectCard[]> {
  const { data, error } = await supabase
    .from("projects")
    .select(`
      id,
      title,
      description,
      status,
      is_featured,
      completion_date,

      project_images(
        id,
        image_url,
        alt_text,
        caption,
        order
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
    `)
    .order("order");

  if (error) {
    throw error;
  }

  return (data as unknown as ProjectBaseRow[]).map(
    mapProjectCard
  );
}

export async function getProjectById(
  supabase: SupabaseClient,
  id: string
): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      project_attributes(
        attributes(*)
      ),
      project_contributors(
        role_on_project,
        contributors(*)
      ),
      project_images(*)
    `)
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw error;
  }
  console.log(
    JSON.stringify(data.project_contributors, null, 2)
  );
  
  return mapProjectDetail(data as ProjectRow);
}

export async function getRelatedProjects(
  supabase: SupabaseClient,
  currentId: string,
  limit = 3
): Promise<ProjectCard[]> {
  const { data, error } = await supabase
    .from("projects")
    .select(`
      id,
      title,
      description,
      status,
      is_featured,
      completion_date,

      project_images(
        id,
        image_url,
        alt_text,
        caption,
        order
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
    `)
    .neq("id", currentId)
    .limit(limit);

  if (error) {
    throw error;
  }

  return (data as unknown as ProjectRow[]).map(mapProjectCard);
}