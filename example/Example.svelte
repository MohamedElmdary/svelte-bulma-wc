<svelte:options tag="tf-example" />

<script context="module" lang="ts">
  import * as Bulma from "../src/public_api"
  import { FormControl, validators } from "tf-svelte-rx-forms"
</script>

<script lang="ts">
  const name = new FormControl("", [
    validators.required("Name is required."),
    validators.minLength("Name minLength is 3 chars.", 3),
    validators.maxLength("Name maxLength is 12 chars.", 12),
  ])
</script>

<Bulma.Input
  label="Cluster Name"
  placeholder="Your kubernetes cluster name"
  controller={name}
/>
