<svelte:options tag="b-tags" />

<script context="module" lang="ts">
  import { get_current_component, onMount } from "svelte/internal"
  import {
    applySizeClass,
    applyAddonsClass,
    type Bool,
    type Sizes,
    initElement,
  } from "../internals"
</script>

<script lang="ts">
  const host = get_current_component()

  export let size: Sizes = undefined
  $: applySizeClass(host, size, "are-")

  export let addons: Bool = undefined
  $: applyAddonsClass(host, addons)

  onMount(initElement(host, { tags: true }))
</script>

<slot />
