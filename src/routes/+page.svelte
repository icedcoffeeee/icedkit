<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>You are logged in! {data.user}</h1>
