<svelte:options tag="b-notification" />

<script context="module" lang="ts">
  import { get_current_component } from "svelte/internal"
  import {
    applyColorClass,
    applyHostClass,
    applyLightClass,
    type Bool,
    type Colors,
  } from "../internals"
</script>

<script lang="ts">
  const host = get_current_component()

  applyHostClass(host, { notification: true })

  export let light: Bool
  $: applyLightClass(host, light)

  export let color: Colors
  $: applyColorClass(host, color)
</script>

<slot />

<style scoped>
  :host {
    display: block;
  }
</style>
