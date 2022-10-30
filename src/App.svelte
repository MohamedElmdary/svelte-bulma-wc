<svelte:options tag="b-app" />

<script lang="ts">
  import Table from "./elements/Table.svelte"
  let headers = ["Name", "Weight", "Certified"]
</script>

<Table
  {headers}
  rows={[
    ["Mohamed", 19, true],
    ["Ahmed", 18, false],
    ["Said", 21, true],
  ]}
  actions={[
    {
      label: "Yes",
      icon: "fas fa-home",
    },
    {
      label: "Maybe",
    },
    {
      label: "No",
      icon: "fas fa-home",
      iconRight: true,
      disabled: ({ row }) => {
        console.log(row[0])

        return row[0] === "Ahmed"
      },
    },
  ]}
/>
