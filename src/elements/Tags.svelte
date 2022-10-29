<svelte:options tag="b-tags" />

<script context="module" lang="ts">
  import { get_current_component } from "svelte/internal"
  import {
    applyHostClass,
    applySizeClass,
    applyAddonsClass,
    type Bool,
    type Sizes,
  } from "../internals"
</script>

<script lang="ts">
  const host = get_current_component()

  applyHostClass(host, { tags: true })

  export let size: Sizes = undefined
  $: applySizeClass(host, size, "are-")

  export let addons: Bool = undefined
  $: applyAddonsClass(host, addons)
</script>

<slot />
