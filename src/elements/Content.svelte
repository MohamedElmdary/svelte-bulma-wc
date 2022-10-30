<svelte:options tag="b-content" />

<script context="module" lang="ts">
  import { get_current_component, onMount } from "svelte/internal"
  import { initElement } from "../internals"
</script>

<script lang="ts">
  const host: Element = get_current_component()

  onMount(initElement(host, { content: true }))
</script>

<slot />
