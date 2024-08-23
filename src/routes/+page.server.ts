import { redirect, type ServerLoadEvent } from '@sveltejs/kit';

export async function load({ locals: { user } }: ServerLoadEvent) {
	if (!user) redirect(302, '/login');
	return { user };
}
