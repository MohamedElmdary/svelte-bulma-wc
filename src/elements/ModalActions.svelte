<svelte:options tag="b-modal-actions" />

<script context="module" lang="ts">
  import { get_current_component, onMount } from "svelte/internal"
  import { initElement } from "../internals"
</script>

<script lang="ts">
  const host = get_current_component()

  onMount(() => {
    initElement(host, { "modal-card-foot": true })()
    host.setAttribute("slot", "modal-actions")
  })
</script>

<slot />
