<svelte:options tag="b-input" />

<script context="module" lang="ts">
  import { onMount } from "svelte/internal"
  import { assertIn, initElement } from "../internals"
  import { form, type FormControl } from "rx-svelte-forms"
</script>

<script lang="ts">
  let host: Element

  export let type: "text" | "email" | "password" | "number" | "textarea" =
    "text"
  $: assertIn(type, ["text", "email", "password", "number", "textarea"], "type")

  export let label: string = ""
  export let placeholder: string = undefined
  export let controller: FormControl<string | number> = undefined
  let value: string | number

  onMount(() => {
    value = controller.value
    initElement(host.parentNode as Element)()
  })

  $: ctrl = $controller
  $: valid = ctrl ? ctrl.valid && (ctrl.dirty || ctrl.touched) : false
  $: invalid = ctrl ? ctrl.invalid && (ctrl.dirty || ctrl.touched) : false
</script>

{#if ctrl}
  <div class="field" bind:this={host}>
    <span class="label">
      {label}
    </span>
    <div class="control">
      {#if type === "textarea"}
        <textarea
          class="textarea"
          class:is-success={valid}
          class:is-danger={invalid}
          {placeholder}
          use:form={controller}
        />
      {:else}
        <input
          class="input"
          class:is-success={valid}
          class:is-danger={invalid}
          {type}
          {placeholder}
          {value}
          use:form={controller}
        />
      {/if}
    </div>
    {#if invalid}
      <p class="help is-danger">
        {Object.keys(ctrl.errors)}
      </p>
    {/if}
  </div>
{/if}
