import { createClient } from "@/lib/Supabase/server";

import {
  getCachedAttributes,
  getCachedProjectCards,
} from "@hirakada/cache";

import {
  Hero,
  Skills,
  FeaturedProject,
  About,
  Contact,
} from "@/components/home";
import { principles } from "./journey/data/principles";
import { Principles } from "@/components/home/Principles";

export default async function HomePage() {
  const supabase = await createClient();


  const [
    attributes,
    projects,
  ] = await Promise.all([
    getCachedAttributes(supabase),
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

      <Contact />

      <Principles
        principles={principles}
      />
    </>
  );
}