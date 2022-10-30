<svelte:options tag="b-icon" />

<script context="module" lang="ts">
  import { get_current_component, onMount } from "svelte/internal"
  import {
    assertColors,
    assertSize,
    initElement,
    type Colors,
    type Sizes,
  } from "../internals"
</script>

<script lang="ts">
  const host = get_current_component()

  export let icon: string = undefined

  export let size: Sizes = undefined
  $: assertSize(size)

  export let color: Colors = undefined
  $: assertColors(color)

  onMount(initElement(host.shadowRoot))
</script>

<span
  class={`icon-text ${color ? `has-text-${color}` : ""}`}
  style:align-items="center"
>
  <span
    class="icon"
    class:is-small={size === "small"}
    class:is-medium={size === "medium"}
    class:is-large={size === "large"}
  >
    <i
      class={icon}
      class:fa-lg={size === "medium"}
      class:fa-2x={size === "large"}
    />
  </span>
  <span>
    <slot />
  </span>
</span>
