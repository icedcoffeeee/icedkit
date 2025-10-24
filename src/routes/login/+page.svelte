<script lang="ts">
  import { signIn, signUp } from "$/auth-client";
  import { invalidateAll } from "$app/navigation";

  let creds = {
    email: "",
    password: "",
    errors: "",
  };
</script>

<div class="fullscreen flex flex-col items-center justify-center">
  <h1 class="mb-6">Welcome!</h1>
  <form class="grid gap-2">
    <input
      class="px-2 border border-foreground bg-background"
      placeholder="Email"
      type="email"
      bind:value={creds.email}
    />
    <input
      class="px-2 border border-foreground bg-background"
      placeholder="Password"
      type="password"
      bind:value={creds.password}
    />
    <span class="grid grid-cols-2 gap-2">
      <button
        class="bg-foreground text-background"
        onclick={async () => {
          let data = await signIn.email(creds);
          if (data.error) creds.errors = data.error.message!;
          await invalidateAll();
        }}
      >
        Log In
      </button>
      <button
        class="bg-foreground text-background"
        onclick={async () => {
          let data = await signUp.email({ name: "", ...creds });
          if (data.error) creds.errors = data.error.message!;
          await invalidateAll();
        }}
      >
        Sign Up
      </button>
    </span>
    {#if creds.errors.length > 0}
      <p class="text-red-500">{creds.errors}</p>
    {/if}
  </form>
</div>
