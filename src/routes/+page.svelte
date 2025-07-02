<script lang="ts">
	import { signIn, signOut } from '$/auth-client';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.user}
	<h1>You are logged in! {data.user}</h1>
	<button on:click={async () => await signOut()}> Log Out </button>
{:else}
	<button on:click={async () => await signIn.social({ provider: 'github' })}>
		Log In with GitHub
	</button>
{/if}
