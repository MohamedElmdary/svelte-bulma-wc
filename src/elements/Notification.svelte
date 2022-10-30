<svelte:options tag="b-notification" />

<script context="module" lang="ts">
  import { get_current_component, onMount } from "svelte/internal"
  import {
    applyColorClass,
    applyLightClass,
    initElement,
    type Bool,
    type Colors,
  } from "../internals"
</script>

<script lang="ts">
  const host = get_current_component()

  export let light: Bool = undefined
  $: applyLightClass(host, light)

  export let color: Colors = undefined
  $: applyColorClass(host, color)

  onMount(initElement(host, { notification: true }))
</script>

<slot />

<style scoped>
  :host {
    display: block;
  }
</style>
