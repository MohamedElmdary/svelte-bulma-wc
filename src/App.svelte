<svelte:options tag="b-app" />

<script lang="ts">
  import { fb, validators, form } from "rx-svelte-forms"
  import Input from "./elements/Input.svelte"

  const userForm = fb.group({
    email: [null as number, [validators.required(), validators.min(5)]],
  })

  const email = userForm.get("email")
</script>

<form use:form={userForm}>
  <!-- prettier-ignore -->
  <Input
    label="Email Address"
    placeholder="User's email address"
    controller={email}
    type="number"
  />
  <!-- <b-input placeholder="User's email address"> Email Address </b-input> -->
</form>

<!-- <Table
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
/> -->
