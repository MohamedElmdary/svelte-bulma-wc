<svelte:options tag="b-app" />

<script lang="ts">
  import { btn } from "./elements"
</script>

<b-btns addons align="right" size="small">
  <button use:btn={{ color: "primary", selected: true }}>Yes</button>
  <button use:btn>Maybe</button>
  <button use:btn>No</button>
</b-btns>
