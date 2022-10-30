<svelte:options tag="b-modal-body" />

<script context="module" lang="ts">
  import { get_current_component, onMount } from "svelte/internal"
  import { initElement } from "../internals"
</script>

<script lang="ts">
  const host = get_current_component()

  onMount(() => {
    initElement(host, { "modal-card-body": true })()
    host.setAttribute("slot", "modal-body")
  })
</script>

<slot />
