<script lang="ts">
  import { page } from "$app/state";
</script>

<div class="fullscreen flex flex-col justify-center items-center">
  <h1>{page.status}</h1>
  <p>{page.error?.message}</p>
</div>
