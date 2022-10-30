<svelte:options tag="b-tabs" />

<script context="module" lang="ts">
  import { onMount } from "svelte/internal"
  import {
    assertAlign,
    assertBoolean,
    assertIn,
    assertSize,
    classMap,
    initElement,
    isTrueBool,
    type Align,
    type Bool,
    type Sizes,
  } from "../internals"

  export type Styles = "boxed" | "toggle" | "toggle-rounded"
</script>

<script lang="ts">
  let host: Element

  export let align: Align = "centered"
  $: assertAlign(align)

  export let size: Sizes = undefined
  $: assertSize(size)

  export let style: Styles = "boxed"
  $: assertIn(style, ["boxed", "toggle", "toggle-rounded"], "style")

  export let fullwidth: Bool = undefined
  $: assertBoolean(fullwidth, "fullwidth")

  export let tabs: string[] = []
  export let active: string

  onMount(() => {
    initElement(host.parentNode as Element)()
  })
</script>

<div
  bind:this={host}
  class={classMap({
    tabs: true,
    "is-centered": align === "centered",
    "is-right": align === "right",
    "is-small": size === "small",
    "is-medium": size === "medium",
    "is-large": size === "large",
    "is-boxed": style === "boxed",
    "is-toggle": style === "toggle" || style === "toggle-rounded",
    "is-toggle-rounded": style === "toggle-rounded",
    "is-fullwidth": isTrueBool(fullwidth),
  })}
>
  <ul>
    {#each tabs as tab}
      <li class:is-active={tab === active}>
        <a
          href="#!"
          on:click|preventDefault|stopPropagation={() => (active = tab)}
        >
          {tab}
        </a>
      </li>
    {/each}
  </ul>
</div>
