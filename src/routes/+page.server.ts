import { redirect } from "@sveltejs/kit";
import type { PageServerLoadEvent } from "./$types";

export function load({ locals }: PageServerLoadEvent) {
  if (locals.user) redirect(301, "/dashboard");
}
