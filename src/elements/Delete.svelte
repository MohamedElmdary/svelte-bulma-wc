<svelte:options tag="b-delete" />

<script context="module" lang="ts">
  import { get_current_component } from "svelte/internal"
  import { applyHostClass, applySizeClass } from "../internals"
</script>

<script lang="ts">
  const host = get_current_component()
  applyHostClass(host, { delete: true })

  export let size: "small" | "medium" | "large" = undefined
  $: applySizeClass(host, size)
</script>

<slot />
