<svelte:options tag="b-checkbox" />

<script context="module" lang="ts">
  import { onMount } from "svelte/internal"
  import { initElement, assertIn } from "../internals"
  import { form, type FormControl } from "tf-svelte-rx-forms"
</script>

<script lang="ts">
  let host: Element

  export let label: string = ""
  export let controller: FormControl<boolean> = undefined
  export let disabled: boolean = false
  export let validation: boolean = true
  export let hint: string = ""

  export let type: "checkbox" | "switch" = "switch"
  $: assertIn(type, ["checkbox", "switch"], "type")

  onMount(() => {
    const styles = `
      <style scoped>
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }

        .switch .switch__input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          -webkit-transition: 0.4s;
          transition: 0.4s;
          border-radius: 34px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          -webkit-transition: 0.4s;
          transition: 0.4s;
          border-radius: 50%;
        }

        .switch__input:checked + .slider {
          background-color: #1982b1;
        }

        .switch__input:checked + .slider {
          box-shadow: 0 0 1px #1982b1;
        }

        .switch__input:checked + .slider:before {
          -webkit-transform: translateX(26px);
          -ms-transform: translateX(26px);
          transform: translateX(26px);
        }
      </style>
    `
    const stylesContainer = document.createElement("div")
    stylesContainer.innerHTML = styles
    initElement(host.parentNode as Element)()
    host.parentNode.appendChild(stylesContainer.querySelector("style"))
  })

  $: ctrl = $controller
  $: valid = ctrl ? ctrl.valid : false
  $: invalid = ctrl ? ctrl.invalid && (ctrl.dirty || ctrl.touched) : false
</script>

<div class="field" bind:this={host}>
  {#if ctrl}
    <div class="control">
      {#if type === "checkbox"}
        <label class="checkbox">
          <input
            type="checkbox"
            {disabled}
            use:form={controller}
            checked={ctrl.value}
          />
          {@html label}
        </label>
      {:else}
        <label class="checkbox is-flex is-align-items-center">
          <label class="switch mr-1">
            <input
              class="switch__input"
              type="checkbox"
              {disabled}
              use:form={controller}
              checked={ctrl.value}
            />
            <span class="slider" />
          </label>
          {@html label}
        </label>
      {/if}
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
