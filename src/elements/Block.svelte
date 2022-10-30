<svelte:options tag="b-block" />

<script context="module" lang="ts">
  import { get_current_component, onMount } from "svelte/internal"
  import { initElement } from "../internals"
</script>

<script lang="ts">
  const host = get_current_component()

  onMount(initElement(host, { block: true }))
</script>

<slot />
