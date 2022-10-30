<svelte:options tag="b-btn" />

<script context="module" lang="ts">
  import { get_current_component, onMount } from "svelte/internal"
  import {
    assertBoolean,
    assertColors,
    assertIn,
    assertSize,
    classMap,
    initElement,
    isTrueBool,
    type Bool,
    type Colors,
    type Sizes,
  } from "../internals"

  export type Types = "button" | "submit"
</script>

<script lang="ts">
  const host = get_current_component()

  export let type: Types = "button"
  $: assertIn(type, ["button", "submit"], "type")

  export let disabled: Bool = undefined
  $: assertBoolean(disabled, "disabled")

  export let color: Colors = undefined
  $: assertColors(color)

  export let light: Bool = undefined
  $: assertBoolean(light, "light")

  export let size: Sizes = undefined
  $: assertSize(size)

  export let fullwidth: Bool = undefined
  $: assertBoolean(fullwidth, "fullwidth")

  export let outlined: Bool = undefined
  $: assertBoolean(outlined, "outlined")

  export let inverted: Bool = undefined
  $: assertBoolean(inverted, "inverted")

  export let rounded: Bool = undefined
  $: assertBoolean(rounded, "rounded")

  export let hovered: Bool = undefined
  $: assertBoolean(hovered, "hovered")

  export let focused: Bool = undefined
  $: assertBoolean(focused, "focused")

  export let active: Bool = undefined
  $: assertBoolean(active, "active")

  export let loading: Bool = undefined
  $: assertBoolean(loading, "loading")

  onMount(initElement(host.shadowRoot))
</script>

<button
  {type}
  disabled={isTrueBool(disabled)}
  on:click
  class={classMap({
    button: true,
    "is-primary": color === "primary",
    "is-link": color === "link",
    "is-info": color === "info",
    "is-success": color === "success",
    "is-warning": color === "warning",
    "is-danger": color === "danger",
    "is-small": size === "small",
    "is-medium": size === "medium",
    "is-large": size === "large",
    "is-light": isTrueBool(light),
    "is-fullwidth": isTrueBool(fullwidth),
    "is-outlined": isTrueBool(outlined),
    "is-inverted": isTrueBool(inverted),
    "is-rounded": isTrueBool(rounded),
    "is-hovered": isTrueBool(hovered),
    "is-focused": isTrueBool(focused),
    "is-active": isTrueBool(active),
    "is-loading": isTrueBool(loading),
  })}
>
  <slot name="right" />
  <slot />
  <slot name="left" />
</button>
