<svelte:options tag="b-select" />

<script context="module" lang="ts">
  import { onDestroy, onMount } from "svelte/internal"
  import { initElement } from "../internals"
  import type { FormControl } from "tf-svelte-rx-forms"

  const { form } = window.tfSvelteRxForms
  export type SelectOption = { label: string; value: any }; // prettier-ignore
</script>

<script lang="ts">
  let host: Element
  let select: HTMLSelectElement

  export let label: string = ""
  export let sublabel: string = ""
  export let placeholder: string = ""
  export let options: SelectOption[] = []
  export let controller: FormControl<string | number> = undefined
  export let loading: boolean = false
  export let disabled: boolean = false
  export let validation: boolean = true
  export let hint: string = ""

  onMount(() => {
    initElement(host.parentNode as Element)()
  })

  // Support Numeric values
  let setValue: (value: string | number) => void
  onDestroy(() => {
    if (setValue) controller.setValue = setValue
  })

  $: if (controller && !setValue) {
    setValue = controller.setValue.bind(controller)
    controller.setValue = (value) => {
      if (value == null || value == undefined || value == "null") {
        return setValue(null)
      }

      const idx = options.findIndex((option) => option.value == value)
      if (idx > -1) {
        return setValue(options[idx].value)
      }

      return setValue(value)
    }
  }

  $: ctrl = $controller
  $: valid = ctrl ? ctrl.valid : false
  $: invalid = ctrl ? ctrl.invalid && (ctrl.dirty || ctrl.touched) : false
</script>

<div class="field" bind:this={host}>
  {#if ctrl}
    <span class="label">
      {label}
    </span>
    {@html sublabel}
    <div class="control">
      <div
        class="select"
        class:is-success={validation && valid}
        class:is-danger={validation && invalid && !hint}
        style:width="100%"
        class:is-loading={loading}
      >
        <select
          bind:this={select}
          style:width="100%"
          value={ctrl.value}
          use:form={controller}
          {disabled}
        >
          {#if placeholder}
            <option value={null} selected={ctrl.value == null} disabled>
              {placeholder}
            </option>
          {/if}
          {#each options as option (option.value)}
            <option selected={ctrl.value == option.value} value={option.value}>
              {option.label}
            </option>
          {/each}
        </select>
      </div>
    </div>
    {#if hint}
      <p class="help" class:is-success={validation && valid}>
        {hint}
      </p>
    {:else if validation && invalid && ctrl.error}
      <p class="help is-danger">
        {ctrl.error}
      </p>
    {/if}
  {/if}
</div>
