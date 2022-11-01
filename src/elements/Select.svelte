<svelte:options tag="b-select" />

<script context="module" lang="ts">
  import { onMount } from "svelte/internal"
  import { initElement } from "../internals"
  import { form, type FormControl } from "rx-svelte-forms"

  export type SelectOption = { label: string; value: any }; // prettier-ignore
</script>

<script lang="ts">
  let host: Element

  export let label: string = ""
  export let placeholder: string = ""
  export let options: SelectOption[] = []
  export let controller: FormControl<string | number> = undefined
  export let loading: boolean = false
  export let disabled: boolean = false
  export let validation: boolean = false

  onMount(() => {
    initElement(host.parentNode as Element)()
  })

  $: ctrl = $controller
  $: valid = ctrl ? ctrl.valid : false
  $: invalid = ctrl ? ctrl.invalid && (ctrl.dirty || ctrl.touched) : false
</script>

<div class="field" bind:this={host}>
  {#if ctrl}
    <span class="label">
      {label}
    </span>
    <div class="control">
      <div
        class="select"
        class:is-success={validation && valid}
        class:is-danger={validation && invalid}
        style:width="100%"
        class:is-loading={loading}
      >
        <select
          style:width="100%"
          value={ctrl.value}
          use:form={controller}
          {disabled}
        >
          {#if placeholder}
            <option value={null} disabled>{placeholder}</option>
          {/if}
          {#each options as option}
            <option value={option.value}>
              {option.label}
            </option>
          {/each}
        </select>
      </div>
      {#if validation && invalid && ctrl.error}
        <p class="help is-danger">
          {ctrl.error}
        </p>
      {/if}
    </div>
  {/if}
</div>
