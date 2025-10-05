<script lang="ts">
  import { signIn, signUp } from '$/auth-client';

  let creds = {
    email: '',
    password: '',
    errors: '',
  };
</script>

<div class="h-screen flex items-center justify-center">
  <form class="grid gap-2">
    <input
      class="px-2 border border-black"
      placeholder="Email"
      type="email"
      bind:value={creds.email}
    />
    <input
      class="px-2 border border-black"
      placeholder="Password"
      type="password"
      bind:value={creds.password}
    />
    <button
      class="bg-black text-white"
      onclick={async () => {
        let data = await signIn.email(creds);
        if (data.error) creds.errors = data.error.message!;
      }}
    >
      Log In
    </button>
    <button
      class="bg-black text-white"
      onclick={async () => {
        let data = await signUp.email({ name: '', ...creds });
        if (data.error) creds.errors = data.error.message!;
      }}
    >
      Sign Up
    </button>
    {#if creds.errors.length > 0}
      <p class="text-red-700">{creds.errors}</p>
    {/if}
  </form>
</div>
