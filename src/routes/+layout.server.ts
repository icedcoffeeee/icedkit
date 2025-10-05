import { auth } from '$lib/auth';
import { type ServerLoadEvent } from '@sveltejs/kit';

export async function load({ request: { headers } }: ServerLoadEvent) {
  const data = await auth.api.getSession({ headers });
  if (data && data.session) return { user: data.user };
  return {};
}
