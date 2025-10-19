import { auth } from "$lib/auth";
import type { Handle } from "@sveltejs/kit";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";
import { sequence } from "@sveltejs/kit/hooks";

const better_auth: Handle = async ({ event, resolve }) => {
  return svelteKitHandler({ event, resolve, auth, building });
};

const locals_handler: Handle = async ({ event, resolve }) => {
  const data = await auth.api.getSession({ headers: event.request.headers });
  if (data) {
    event.locals.session = data.session;
    event.locals.user = data.user;
  }

  return resolve(event);
};

export const handle: Handle = sequence(better_auth, locals_handler);
