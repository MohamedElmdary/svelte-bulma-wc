<svelte:options tag="b-btns" />

<script context="module" lang="ts">
  import { get_current_component, onMount } from "svelte/internal"
  import {
    applyAddonsClass,
    applyAlignClass,
    applySizeClass,
    initElement,
    type Align,
    type Bool,
    type Sizes,
  } from "../internals"
</script>

<script lang="ts">
  const host: Element = get_current_component()

  export let addons: Bool = undefined
  $: applyAddonsClass(host, addons)

  export let align: Align = undefined
  $: applyAlignClass(host, align)

  export let size: Sizes = undefined
  $: applySizeClass(host, size, "are-")

  onMount(initElement(host, { buttons: true }))
</script>

<slot />

<style scoped>
  :host {
    display: block;
  }
</style>
