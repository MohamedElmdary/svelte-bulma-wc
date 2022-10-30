<svelte:options tag="b-delete" />

<script context="module" lang="ts">
  import { get_current_component, onMount } from "svelte/internal"
  import { applySizeClass, initElement } from "../internals"
</script>

<script lang="ts">
  const host = get_current_component()

  export let size: "small" | "medium" | "large" = undefined
  $: applySizeClass(host, size)

  onMount(initElement(host, { delete: true }))
</script>

<slot />
