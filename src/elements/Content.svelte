<svelte:options tag="b-content" />

<script context="module" lang="ts">
  import { get_current_component } from "svelte/internal"
  import { applyHostClass } from "../internals"
</script>

<script lang="ts">
  const host = get_current_component()

  applyHostClass(host, { content: true })
</script>

<slot />
