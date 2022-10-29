<svelte:options tag="b-delete" />

<script context="module" lang="ts">
  import { get_current_component } from "svelte/internal"
  import { applyHostClass, assertSize } from "../internals"
</script>

<script lang="ts">
  const host = get_current_component()
  applyHostClass(host, { delete: true })

  export let size: "small" | "medium" | "large"
  $: if (size) {
    assertSize(size)
    applyHostClass(host, {
      "is-small": size === "small",
      "is-medium": size === "medium",
      "is-large": size === "large",
    })
  }
</script>

<slot />
