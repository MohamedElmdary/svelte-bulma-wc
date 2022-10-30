<svelte:options tag="b-app" />

<script lang="ts">
  import { fb, validators, form } from "rx-svelte-forms"
  import Input from "./elements/Input.svelte"
  import CheckBox from "./elements/CheckBox.svelte"
  import Radio from "./elements/Radio.svelte"
  import Select from "./elements/Select.svelte"

  const userForm = fb.group({
    email: [null as number, [validators.required(), validators.min(5)]],
    terms: [false, [validators.requiredTrue()]],
    gender: [
      "female",
      [validators.required(), validators.isIn(["male", "female"])],
    ],
    country: [
      null as string,
      [validators.required(), validators.isIn(["egypt", "america"])],
    ],
  })

  const email = userForm.get("email")
  const terms = userForm.get("terms")
  const gender = userForm.get("gender")
  const country = userForm.get("country")
</script>

<form use:form={userForm}>
  <!-- prettier-ignore -->
  <Input
    label="Email Address"
    placeholder="User's email address"
    controller={email}
    type="text"
    loading
    hint="valid"
  />

  <CheckBox label="I agree to the terms and conditions" controller={terms} />

  <Radio
    name="gender"
    options={[
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ]}
    controller={gender}
  />

  <Select
    label="Please select a country"
    options={[
      { label: "Egypt", value: "egypt" },
      { label: "America", value: "america" },
    ]}
    controller={country}
  />
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
