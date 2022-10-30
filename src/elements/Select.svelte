<svelte:options tag="b-select" />

<script context="module" lang="ts">
  import { onMount } from "svelte/internal"
  import { initElement } from "../internals"
  import { form, type FormControl } from "rx-svelte-forms"

  export type SelectOption = { label: string; value: any }
</script>

<script lang="ts">
  let host: Element

  export let label: string = ""
  export let options: SelectOption[] = []
  export let controller: FormControl<string | number> = undefined
  export let loading: boolean = false

  onMount(() => {
    initElement(host.parentNode as Element)()
  })
</script>

<div class="field" bind:this={host}>
  {#if controller}
    <div class="control">
      <div class="select" class:is-loading={loading}>
        <select use:form={controller}>
          {#if label}
            <option disabled>{label}</option>
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
