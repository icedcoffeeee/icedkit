<script lang="ts">
	import { signIn, signOut } from '$/auth-client';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

{#if data.user}
	<h1>You are logged in! {data.user}</h1>
	<button onclick={async () => await signOut()}> Log Out </button>
{:else}
	<button onclick={async () => await signIn.social({ provider: 'github' })}>
		Log In with GitHub
	</button>
{/if}
