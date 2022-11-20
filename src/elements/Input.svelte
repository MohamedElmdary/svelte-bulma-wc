<svelte:options tag="b-input" />

<script context="module" lang="ts">
  import { onMount } from "svelte"
  import { assertIn, initElement } from "../internals"
  import { form, type FormControl } from "tf-svelte-rx-forms"
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
  export let validation: boolean = true

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
    <span class="label">
      {label}
    </span>
    <div
      class="control"
      class:is-loading={loading}
      class:has-icons-right={valid && type !== "password"}
    >
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
          type={usedType}
          {placeholder}
          use:form={controller}
          value={ctrl.value}
          {disabled}
        />

        {#if type === "password"}
          <!-- fas far fa-eye-slash -->
          <!-- fas fa-eye -->
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
      <p class="help" class:is-success={valid}>
        {hint}
      </p>
    {:else if invalid && ctrl.error}
      <p class="help is-danger">
        {ctrl.error}
      </p>
    {/if}
  {/if}
</div>
