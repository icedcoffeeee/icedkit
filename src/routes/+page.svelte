<script lang="ts">
  import { name } from "../../package.json";
</script>

<div class="fullscreen flex flex-col justify-center items-center gap-4">
  <h1
    class="[letter-spacing:var(--lspace)] -mr-[var(--lspace)] font-thin [--lspace:20px] md:[--lspace:50px]"
  >
    {name.toUpperCase()}
  </h1>
  <span class="w-full h-px bg-gradient-to-r frto-transparent to-transparent via-white"></span>
  <h2>SvelteKit Starter Kit</h2>
  <span class="flex gap-2 mt-4">
    <a href="/about" class="bg-foreground text-background px-4">Learn More</a>
    <a href="/dashboard" class="bg-blue-800 px-4">Get Started</a>
  </span>
</div>
