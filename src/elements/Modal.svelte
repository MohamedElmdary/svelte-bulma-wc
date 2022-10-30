<svelte:options tag="b-modal" />

<script context="module" lang="ts">
  import { get_current_component, onMount } from "svelte/internal"
  import {
    applyBoolClass,
    assertBoolean,
    initElement,
    isTrueBool,
    type Bool,
  } from "../internals"
</script>

<script lang="ts">
  const host = get_current_component()

  export let open: Bool = undefined
  $: applyBoolClass(host, open, "open", "is-active")

  export let closable: Bool = undefined
  $: assertBoolean(closable, "closable")
  // $: applyBoolClass(host, closable, "closable", "is-active")

  onMount(initElement(host, { modal: true }))
  onMount(initElement(host.shadowRoot))
</script>

<div class="modal-background" />
{#if isTrueBool(closable)}
  <button
    class="modal-close is-large"
    aria-label="close"
    on:click={(e) => {
      e.target.dispatchEvent(
        new CustomEvent("close", {
          detail: e,
          bubbles: true,
          composed: true,
          cancelable: true,
        })
      )
    }}
  />
{/if}

<div class="modal-card">
  <slot name="modal-header" />
  <slot name="modal-body" />
  <slot name="modal-actions" />
</div>

<style scoped>
  :host {
    display: block;
  }
</style>
