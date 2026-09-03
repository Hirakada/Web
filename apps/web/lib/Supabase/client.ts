import { createBrowserClient } from "@supabase/ssr";

let browserClient: ReturnType<typeof createBrowserClient> | undefined;

export function createClient() {
  browserClient ??= createBrowserClient(
      process.env.NEXT_PUBLIC_HIRAKADA_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_HIRAKADA_SUPABASE_ANON_KEY!
    );

  return browserClient;
}