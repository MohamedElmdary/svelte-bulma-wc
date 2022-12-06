<svelte:options tag="tf-example" />

<script context="module" lang="ts">
  import Tabs from "../src/elements/Tabs.svelte";

  let active = 0;
</script>

<Tabs
  tabs={[
    { id: 0, label: "t1", error: true },
    { id: 1, label: "t2", error: true },
  ]}
  bind:active
/>
