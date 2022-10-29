<svelte:options tag="b-box" />

<script context="module" lang="ts">
  import { get_current_component } from "svelte/internal"
  import { applyHostClass } from "../internals"
</script>

<script lang="ts">
  const host = get_current_component()

  applyHostClass(host, { box: true })
</script>

<slot />
