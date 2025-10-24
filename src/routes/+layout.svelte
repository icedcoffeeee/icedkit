<script lang="ts">
  import "../app.css";
  import { name } from "../../package.json";

  import { signOut } from "$/auth-client";
  import { goto, invalidateAll } from "$app/navigation";
  import { LogOut, Menu, UserCircle, X } from "lucide-svelte";

  let { children, data } = $props();

  let sidebar = $state(false);
  let open = () => (sidebar = true);
  let close = () => (sidebar = false);
</script>

<nav class="p-4 backdrop-blur-sm sticky top-0 flex justify-between">
  <span class="flex gap-2 items-center">
    {#if data.user}
      <button onclick={open}>
        <Menu size={20}></Menu>
      </button>
    {/if}
    <a href="/">{name}</a>
  </span>

  {#if data.user}
    <a href="/account" class="flex gap-2 items-center">
      {data.user.name}<UserCircle size={20}></UserCircle>
    </a>
  {:else}
    <a href="/login">Log In</a>
  {/if}
</nav>

<main class="p-4">
  {@render children?.()}
</main>

<footer class="text-xs mb-4 w-full flex justify-center">&copy; {name} 2025</footer>

<button
  class="absolute top-0 left-0 w-full h-full slide bg-background/50"
  data-open={sidebar}
  onclick={close}
  aria-label="close sidebar"
></button>

<div
  class="absolute top-0 left-0 bg-background w-full h-full text-xl max-w-sm slide p-4 flex flex-col gap-4 shadow-2xl shadow-foreground/5"
  data-open={sidebar}
>
  <span class="flex justify-between">
    <button onclick={close}><X size={20}></X></button>
    <button
      onclick={async () => {
        close();
        await signOut();
        await goto("/");
        await invalidateAll();
      }}
    >
      <LogOut size={20}></LogOut>
    </button>
  </span>
  <a onclick={close} href="/dashboard">Dashboard</a>
</div>

<style>
  .slide {
    transition: all 0.25s ease-in-out;

    &[data-open="false"] {
      visibility: hidden;
      opacity: 0;
      translate: -1em 0em;
    }
    &[data-open="true"] {
      visibility: visible;
      opacity: 1;
      translate: 0em 0em;
    }
  }
</style>
