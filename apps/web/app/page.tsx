import { createClient } from "@/lib/Supabase/server";

import {
  getAttributes,
  getProjectCards,
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
    getProjectCards(supabase),
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