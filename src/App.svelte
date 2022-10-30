<svelte:options tag="b-app" />

<script lang="ts">
  import Tabs from "./elements/Tabs.svelte"

  let active = "Tab 1"
</script>

<Tabs tabs={["Tab 1", "Tab 2", "Tab 3"]} style="toggle-rounded" bind:active />

{active}
