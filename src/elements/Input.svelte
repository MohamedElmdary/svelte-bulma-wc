<svelte:options tag="b-input" />

<script context="module" lang="ts">
  import { onMount } from "svelte"
  import {
    assertColors,
    assertIn,
    initElement,
    type Colors,
  } from "../internals"
  import type { FormControl } from "tf-svelte-rx-forms"
  const { form } = window.tfSvelteRxForms
</script>

<script lang="ts">
  let host: Element

  export let type: "text" | "password" | "number" | "textarea" = "text"
  $: assertIn(type, ["text", "password", "number", "textarea"], "type")

  export let label: string = ""
  export let sublabel: string = ""
  export let placeholder: string = undefined
  export let controller: FormControl<string | number>
  export let loading: boolean = false
  export let hint: string = undefined
  export let disabled: boolean = false
  export let validation: boolean = true
  export let style: string = ""
  
  let _class: string = "" 
  export { _class as class }

  export let hintColor: Colors = undefined
  $: assertColors(hintColor)

  onMount(() => {
    initElement(host.parentNode as Element)()
  })

  $: usedType = type
  $: ctrl = $controller
  $: valid = validation && (ctrl ? ctrl.valid : false)
  $: invalid =
    validation && (ctrl ? ctrl.invalid && (ctrl.dirty || ctrl.touched) : false)
</script>

<div class="field" bind:this={host}>
  {#if ctrl}
    <span class="label mb-0">
      {@html label}
    </span>
    <p class="mb-2 is-size-6 has-text-grey">
      {@html sublabel}
    </p>
    <div
      class="control"
      class:is-loading={loading}
      class:has-icons-right={valid && type !== "password"}
    >
      {#if type === "textarea"}
        <textarea
          class="textarea {_class}"
          class:is-success={valid}
          class:is-danger={invalid}
          {placeholder}
          use:form={controller}
          value={ctrl.value}
          {disabled}
          {style}
        />
      {:else}
        <input
          class="input {_class}"
          class:is-success={valid}
          class:is-danger={invalid}
          type={usedType}
          {placeholder}
          use:form={controller}
          value={ctrl.value}
          {disabled}
          {style}
        />

        {#if type === "password"}
          <b-icon
            class="icon"
            style:position="absolute"
            style:top="50%"
            style:right="10px"
            style:transform="translateY(-50%)"
            style:z-index="999"
            style:cursor="pointer"
            size="small"
            icon={usedType === "password"
              ? "fas fa-eye fa-eye-slash"
              : "fas fa-eye"}
            on:mousedown={() =>
              (usedType = usedType === "password" ? "text" : "password")}
          />
        {:else if valid}
          <b-icon
            class="icon is-right"
            color="success"
            icon="fas fa-check fa-sm"
          />
        {/if}
      {/if}
    </div>
    {#if hint}
      <p
        class="help"
        class:is-success={(valid && !hintColor) || hintColor === "success"}
        class:is-primary={hintColor === "primary"}
        class:is-link={hintColor === "link"}
        class:is-info={hintColor === "info"}
        class:is-warning={hintColor === "warning"}
        class:is-danger={hintColor === "danger"}
      >
        {@html hint}
      </p>
    {:else if invalid && ctrl.error}
      <p class="help is-danger">
        {@html ctrl.error}
      </p>
    {/if}
  {/if}
</div>
