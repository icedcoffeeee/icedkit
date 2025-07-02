import { createAuthClient } from 'better-auth/svelte';
import { PUBLIC_BETTER_AUTH_URL } from '$env/static/public';

export const { signIn, signOut, signUp, useSession } = createAuthClient({
	baseURL: PUBLIC_BETTER_AUTH_URL
});
