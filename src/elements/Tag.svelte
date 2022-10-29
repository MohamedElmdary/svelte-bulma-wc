<svelte:options tag="b-tag" />

<script context="module" lang="ts">
  import { get_current_component } from "svelte/internal"
  import {
    applyColorClass,
    applyDeleteClass,
    applyHostClass,
    applyLightClass,
    applyRoundClass,
    applySizeClass,
    type Bool,
    type Colors,
    type Sizes,
  } from "../internals"
</script>

<script lang="ts">
  const host = get_current_component()

  applyHostClass(host, { tag: true })

  export let color: Colors = undefined
  $: applyColorClass(host, color)

  export let size: Sizes = undefined
  $: applySizeClass(host, size)

  export let rounded: Bool = undefined
  $: applyRoundClass(host, rounded)

  export let light: Bool = undefined
  $: applyLightClass(host, light)

  export let deletable: Bool = undefined
  $: applyDeleteClass(host, deletable)
</script>

<slot />
