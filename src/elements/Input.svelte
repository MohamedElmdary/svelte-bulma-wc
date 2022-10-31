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
  export let controller: FormControl<string> | FormControl<number> = undefined
  export let loading: boolean = false
  export let hint: string = undefined
  export let disabled: boolean = false

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
    <div class="control" class:is-loading={loading}>
      {#if type === "textarea"}
        <textarea
          class="textarea"
          class:is-success={valid}
          class:is-danger={invalid}
          {placeholder}
          use:form={controller}
          value={ctrl.value}
          {disabled}
        />
      {:else}
        <input
          class="input"
          class:is-success={valid}
          class:is-danger={invalid}
          {type}
          {placeholder}
          use:form={controller}
          value={ctrl.value}
          {disabled}
        />
      {/if}
    </div>
    {#if invalid}
      <p class="help is-danger">
        {Object.keys(ctrl.errors)}
      </p>
    {:else if hint}
      <p class="help">
        {hint}
      </p>
    {/if}
  {/if}
</div>
