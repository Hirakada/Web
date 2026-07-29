import { createClient } from "@/lib/Supabase/server";

import {
  getAttributes,
  getProjects,
} from "@hirakada/database";

import {
  Hero,
  Skills,
  FeaturedProject,
} from "@/components/home";


export default async function HomePage() {
  const supabase = await createClient();


  const [
    attributes,
    projects,
  ] = await Promise.all([
    getAttributes(supabase),
    getProjects(supabase),
  ]);


  return (
    <>
      <Hero />

      <Skills
        attributes={attributes}
      />

      <FeaturedProject
        projects={projects}
      />
    </>
  );
}