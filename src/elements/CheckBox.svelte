<svelte:options tag="b-checkbox" />

<script context="module" lang="ts">
  import { onMount } from "svelte/internal"
  import { initElement } from "../internals"
  import { form, type FormControl } from "rx-svelte-forms"
</script>

<script lang="ts">
  let host: Element

  export let label: string = ""
  export let controller: FormControl<boolean> = undefined
  export let disabled: boolean = false

  onMount(() => {
    initElement(host.parentNode as Element)()
  })

  $: ctrl = $controller
  $: invalid = ctrl ? ctrl.invalid && (ctrl.dirty || ctrl.touched) : false
</script>

{#if ctrl}
  <div class="field" bind:this={host}>
    <div class="control">
      <label class="checkbox">
        <input
          type="checkbox"
          {disabled}
          use:form={controller}
          checked={ctrl.value}
        />
        {@html label}
      </label>
    </div>
    {#if invalid && ctrl.error}
      <p class="help is-danger">
        {ctrl.error}
      </p>
    {/if}
  </div>
{/if}
