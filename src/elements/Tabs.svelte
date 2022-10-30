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
  export interface TabOptions {
    id: string | number | symbol
    label: string
    icon?: string
    removable?: boolean
  }
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

  export let tabs: TabOptions[] = []
  export let active: TabOptions["id"]

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
    {#each tabs as tab, index}
      <li class:is-active={tab.id === active}>
        <a
          href="#!"
          on:click|preventDefault|stopPropagation={() => (active = tab.id)}
        >
          {#if tab.icon}
            <b-icon icon={tab.icon} />
          {/if}
          {tab.label}
          {#if tab.removable}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <b-delete
              class="ml-2"
              size="small"
              on:click|preventDefault|stopPropagation={(e) => {
                e.target.dispatchEvent(
                  new CustomEvent("remove", {
                    detail: { index, id: tab.id },
                    bubbles: true,
                    composed: true,
                    cancelable: true,
                  })
                )
              }}
            />
          {/if}
        </a>
      </li>
    {/each}
  </ul>
</div>
