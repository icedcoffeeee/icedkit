import { lucia, supabase } from '$lib/auth';
import { db } from '$lib/db';
import { users } from '$lib/schema';
import { formToObj } from '$lib/utils';
import { fail, redirect, type Actions, type ServerLoadEvent } from '@sveltejs/kit';

type LoginReturn = { success: boolean; message: string | null };

export async function load({ locals: { user } }: ServerLoadEvent) {
	if (user) redirect(308, '/');
}

export const actions: Actions = {
	login: async function ({ cookies, request }): Promise<LoginReturn> {
		const form = await request.formData();
		const { email, password } = formToObj(form);
		let {
			data: { user },
			error: authError
		} = await supabase.auth.signInWithPassword({ email, password });
		if (authError) return { success: false, message: authError.message };
		if (!user)
			return {
				success: false,
				message: 'Please confirm your email address through the link sent to ' + email
			};
		const logged_user = await db.query.users.findFirst({
			where: (users, { eq }) => eq(users.email, email)
		});

		const session = await lucia.createSession(logged_user!.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	},

	signup: async function ({ cookies, request }): Promise<LoginReturn> {
		const form = await request.formData();
		const { email, password } = formToObj(form);
		let {
			data: { user },
			error: authError
		} = await supabase.auth.signUp({ email, password });
		if (authError) return { success: false, message: authError.message };
		if (!user)
			return {
				success: true,
				message: 'Please confirm your email address through the link sent to ' + email
			};
		const logged_user = (await db.insert(users).values({ email }).returning())[0];

		const session = await lucia.createSession(logged_user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	},

	logout: async ({ cookies, locals: { session } }) => {
		if (!session) return fail(401);

		await lucia.invalidateSession(session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		redirect(302, '/login');
	}
};
