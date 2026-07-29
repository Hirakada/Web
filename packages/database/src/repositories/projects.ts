import type { SupabaseClient } from "@supabase/supabase-js";

import type { Project } from "../types/project";


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
  contributors: {
    id: string;
    name: string;
    website_url: string | null;
    linkedin_url: string | null;
    profile_image_url: string | null;
  };
};


type ProjectRow = {
  id: string;
  title: string;
  description: string;
  long_description: string | null;
  category: string | null;
  project_url: string | null;
  github_url: string | null;
  status: string;
  is_featured: boolean;
  completion_date: string | null;

  project_images: ProjectImageRow[] | null;
  project_attributes: ProjectAttributeRow[] | null;
  project_contributors: ProjectContributorRow[] | null;
};

function mapProject(project: ProjectRow): Project {
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
      ({ contributors }) => ({
        id: contributors.id,

        name: contributors.name,

        ...(contributors.website_url && {
          websiteUrl: contributors.website_url,
        }),

        ...(contributors.linkedin_url && {
          linkedinUrl: contributors.linkedin_url,
        }),

        ...(contributors.profile_image_url && {
          profileImageUrl: contributors.profile_image_url,
        }),
      })
    ),
  };
}

export async function getProjects(
  supabase: SupabaseClient
): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      project_attributes(
        attributes(*)
      ),
      project_contributors(
        contributors(*)
      ),
      project_images(*)
    `)
    .order("order");


  if (error) {
    throw error;
  }


  return (data as ProjectRow[]).map((project) => {
    const sortedImages = [
      ...(project.project_images ?? []),
    ].sort(
      (a, b) => a.order - b.order
    );


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

      attributes:
        (project.project_attributes ?? []).map(
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

      contributors:
        (project.project_contributors ?? []).map(
          ({ contributors }) => ({
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
          })
        ),
    };
  });
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

  return mapProject(data as ProjectRow);
}