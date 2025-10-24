<script lang="ts">
  import { enhance } from "$app/forms";

  const { data } = $props();
</script>

<form
  use:enhance={() =>
    async ({ update }) =>
      await update({ reset: false })}
  method="post"
  class="fullscreen flex flex-col gap-4 max-w-xs"
>
  <h1>Account Details</h1>
  <label for="name">Name</label>
  <input name="name" type="text" value={data.user?.name} />
  <label for="email">Email</label>
  <input name="email" type="email" value={data.user?.email} />
  <button class="bg-foreground text-background w-fit px-4">Save</button>
</form>

<style lang="postcss">
  @reference "../../app.css";

  label {
    @apply -mb-2;
  }

  input {
    @apply border border-foreground px-2;
  }
</style>
