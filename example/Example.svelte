<svelte:options tag="tf-example" />

<script context="module" lang="ts">
  import Table from "../src/elements/Table.svelte"

  let rows = Array.from({ length: 50 }, (_, i) => [i])
</script>

<Table
  headers={["id"]}
  {rows}
  position={false}
  selectable={true}
  actions={[
    {
      label: "Delete",
      click({ index, cmp }) {
        rows = rows.filter((_, i) => i !== index)
        cmp.rows = rows
        cmp.unselect(index)
      },
    },
  ]}
  on:select={console.log}
/>
