<svelte:options tag="b-table" />

<script context="module" lang="ts">
  import { onMount } from "svelte/internal"
  import {
    assertBoolean,
    initElement,
    isTrueBool,
    type Bool,
    type Colors,
  } from "../internals"
  import { btn } from "./button"

  export interface ActionEvent {
    event?: Event
    row: any[]
    index: number
    action: Action
  }
  export interface Action {
    label: string
    color?: Colors
    icon?: string
    iconRight?: boolean
    click?(event: ActionEvent): void
    disabled?(event: ActionEvent): boolean
    loading?(event: ActionEvent): boolean
  }
</script>

<script lang="ts">
  let host: HTMLTableElement

  export let position: Bool = true
  $: assertBoolean(position, "position")

  export let striped: Bool = true
  $: assertBoolean(striped, "striped")

  export let hoverable: Bool = true
  $: assertBoolean(hoverable, "hoverable")

  export let fullwidth: Bool = true
  $: assertBoolean(fullwidth, "fullwidth")

  export let bordered: Bool = true
  $: assertBoolean(bordered, "bordered")

  export let headers: string[] = []
  export let rows: any[][] = []
  export let actions: Action[] = []

  onMount(() => {
    initElement(host.parentNode as Element)()
  })
</script>

<table
  bind:this={host}
  class="table"
  class:is-striped={isTrueBool(striped)}
  class:is-hoverable={isTrueBool(hoverable)}
  class:is-fullwidth={isTrueBool(fullwidth)}
  class:is-bordered={isTrueBool(bordered)}
  style:text-align="center"
>
  <thead>
    <tr>
      {#if position}
        <th>
          <abbr title="Position">#</abbr>
        </th>
      {/if}
      {#each headers as header}
        <th>
          {header}
        </th>
      {/each}
      {#if actions.length}
        <th> Actions </th>
      {/if}
    </tr>
  </thead>

  <tbody>
    {#each rows as row, index}
      <tr>
        {#if position}
          <td style:vertical-align="middle">
            {index}
          </td>
        {/if}

        {#each row as cell}
          <td style:vertical-align="middle">
            {cell}
          </td>
        {/each}

        {#if actions.length}
          <td style:vertical-align="middle">
            <b-btns addons size="small" align="centered">
              {#each actions as action}
                <button
                  use:btn={{
                    color: action.color,
                    loading: action.loading?.({
                      action,
                      index,
                      row: rows[index],
                    }),
                  }}
                  disabled={action.disabled?.({
                    action,
                    index,
                    row: rows[index],
                  })}
                  on:click={(e) =>
                    action.click?.({
                      action,
                      index,
                      row: rows[index],
                      event: e,
                    })}
                >
                  {#if action.icon && !action.iconRight}
                    <b-icon icon={action.icon} />
                  {/if}
                  {action.label}
                  {#if action.icon && action.iconRight}
                    <b-icon icon={action.icon} />
                  {/if}
                </button>
              {/each}
            </b-btns>
          </td>
        {/if}
      </tr>
    {/each}
  </tbody>
</table>
