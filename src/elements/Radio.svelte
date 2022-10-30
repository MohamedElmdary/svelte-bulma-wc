<svelte:options tag="b-radio" />

<script context="module" lang="ts">
  import { onMount } from "svelte/internal"
  import { initElement } from "../internals"
  import { form, type FormControl } from "rx-svelte-forms"

  export type RadioOtion = { label: string; value: any }
</script>

<script lang="ts">
  let host: Element

  export let name: string
  export let options: RadioOtion[] = []
  export let controller: FormControl<string | number> = undefined

  onMount(() => {
    initElement(host.parentNode as Element)()
  })
</script>

{#if controller}
  <div class="field" bind:this={host}>
    <div class="control">
      {#each options as option}
        <label class="radio">
          <input
            type="radio"
            {name}
            value={option.value}
            use:form={controller}
          />
          {option.label}
        </label>
      {/each}
    </div>
  </div>
{/if}
