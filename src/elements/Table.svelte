<svelte:options tag="b-table" />

<script context="module" lang="ts">
  import { onMount, createEventDispatcher } from "svelte"
  import { get_current_component } from "svelte/internal"
  import {
    assertBoolean,
    initElement,
    isTrueBool,
    type Bool,
    type Colors,
  } from "../internals"
  import { btn } from "./button"
  import type { Table } from "../internals/type"

  export interface ActionEvent {
    event?: Event
    row: any[]
    index: number
    action: Action
    cmp: Table
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
  const cmp = get_current_component()
  let host: HTMLTableElement
  const dispatch = createEventDispatcher<{ select: number[] }>()

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

  export let selectable: Bool = false
  $: assertBoolean(selectable, "selectable")

  export let disabled: Bool = false
  $: assertBoolean(disabled, "disabled")

  export let headers: string[] = []
  export let actions: Action[] = []
  export let rows: any[][] = []

  onMount(() => {
    initElement(host.parentNode as Element)()
  })

  let selected = []
  function onSelect(index: number) {
    return (e: Event) => {
      const { checked } = e.target as HTMLInputElement
      if (index === -1) {
        if (checked) selected = Array.from({ length: rows.length }, (_, i) => i)
        else selected = []
      } else {
        if (checked) selected = [...selected, index]
        else selected = selected.filter((i) => i !== index)
      }
      dispatch("select", selected)
    }
  }

  export function unselect(index: number): void {
    if (selected.includes(index)) {
      selected = selected.filter((i) => i !== index)
    }
    selected = selected.map((i) => (i > index ? i - 1 : i))
    dispatch("select", selected)
  }
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
      {#if selectable}
        <th>
          <input
            type="checkbox"
            checked={selected.length === rows.length}
            on:change={onSelect(-1)}
          />
        </th>
      {/if}
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
        {#if selectable}
          <td style:vertical-align="middle">
            <input
              type="checkbox"
              checked={selected.includes(index)}
              on:change={onSelect(index)}
            />
          </td>
        {/if}

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
                      cmp,
                    }),
                  }}
                  disabled={action.disabled?.({
                    action,
                    index,
                    row: rows[index],
                    cmp,
                  })}
                  on:click={(e) =>
                    action.click?.({
                      action,
                      index,
                      row: rows[index],
                      event: e,
                      cmp,
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
