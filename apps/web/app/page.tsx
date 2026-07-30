import { createClient } from "@/lib/Supabase/server";

import { getCachedProjectCards } from "@hirakada/cache";

import {
  getAttributes,
} from "@hirakada/database";

import {
  Hero,
  Skills,
  FeaturedProject,
  About,
} from "@/components/home";

export default async function HomePage() {
  const supabase = await createClient();


  const [
    attributes,
    projects,
  ] = await Promise.all([
    getAttributes(supabase),
    getCachedProjectCards(supabase),
  ]);


  return (
    <>

      <Hero />

      <Skills
        attributes={attributes}
      />

      <About/>

      <FeaturedProject
        projects={projects}
      />
    </>
  );
}