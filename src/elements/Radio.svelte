<svelte:options tag="b-radio" />

<script context="module" lang="ts">
  import { onMount } from "svelte/internal"
  import { initElement } from "../internals"
  import { form, type FormControl } from "rx-svelte-forms"

  export type RadioOption = { label: string; value: any }
</script>

<script lang="ts">
  let host: Element

  export let name: string
  export let options: RadioOption[] = []
  export let controller: FormControl<string | number> = undefined
  export let disabled: boolean = false

  onMount(() => {
    initElement(host.parentNode as Element)()
  })
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
          {option.label}
        </label>
      {/each}
    </div>
  {/if}
</div>
