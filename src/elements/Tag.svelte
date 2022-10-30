<svelte:options tag="b-tag" />

<script context="module" lang="ts">
  import { get_current_component, onMount } from "svelte/internal"
  import {
    applyColorClass,
    applyDeleteClass,
    applyLightClass,
    applyRoundClass,
    applySizeClass,
    initElement,
    type Bool,
    type Colors,
    type Sizes,
  } from "../internals"
</script>

<script lang="ts">
  const host = get_current_component()

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

  onMount(initElement(host, { tag: true }))
</script>

<slot />
