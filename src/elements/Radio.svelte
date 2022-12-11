<svelte:options tag="b-radio" />

<script context="module" lang="ts">
  import { onMount } from "svelte/internal"
  import { initElement } from "../internals"
  import type { FormControl } from "tf-svelte-rx-forms"

  const { form } = window.tfSvelteRxForms
  export type RadioOption = { label: string; value: any }
</script>

<script lang="ts">
  let host: Element

  export let name: string
  export let options: RadioOption[] = []
  export let controller: FormControl<string | number> = undefined
  export let disabled: boolean = false
  export let validation: boolean = true
  export let hint: string = ""

  onMount(() => {
    initElement(host.parentNode as Element)()
  })

  $: ctrl = $controller
  $: valid = ctrl ? ctrl.valid : false
  $: invalid = ctrl ? ctrl.invalid && (ctrl.dirty || ctrl.touched) : false
</script>

<div class="field" bind:this={host}>
  {#if controller}
    <div class="control">
      {#each options as option}
        <label class="radio">
          <input
            type="radio"
            {name}
            value={option.value}
            use:form={controller}
            {disabled}
          />
          {@html option.label}
        </label>
      {/each}
    </div>
    {#if hint}
      <p class="help" class:is-success={validation && valid}>
        {@html hint}
      </p>
    {:else if validation && invalid && ctrl.error}
      <p class="help is-danger">
        {@html ctrl.error}
      </p>
    {/if}
  {/if}
</div>
