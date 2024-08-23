<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="flex flex-col justify-center items-center h-screen gap-5">
	<h1 class="text-xl font-bold">Welcome to SSD starter</h1>
	<form method="post" action="?/login" class="flex flex-col gap-2 w-1/4">
		<input
			class="input rounded-none border border-base-content"
			placeholder="Email"
			name="email"
			type="email"
		/>
		<input
			class="input rounded-none border border-base-content"
			placeholder="Password"
			name="password"
			type="password"
		/>
		<div class="flex gap-2">
			<button class="w-1/2 rounded-none">Log In</button>
			<button formaction="?/signup" class="w-1/2 rounded-none">Sign Up</button>
		</div>
		{#if form}
			<p class:text-green-500={form.success} class:text-red-500={!form.success}>
				{form.message}
			</p>
		{/if}
	</form>
</div>
