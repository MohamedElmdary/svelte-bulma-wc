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

  onMount(() => {
    initElement(host.parentNode as Element)()
  })
</script>

<div class="field" bind:this={host}>
  {#if controller}
    <span class="label">
      {label}
    </span>
    <div class="control">
      <div class="select" style:width="100%" class:is-loading={loading}>
        <select style:width="100%" use:form={controller}>
          {#if placeholder}
            <option disabled>{placeholder}</option>
          {/if}
          {#each options as option}
            <option value={option.value}>
              {option.label}
            </option>
          {/each}
        </select>
      </div>
    </div>
  {/if}
</div>
