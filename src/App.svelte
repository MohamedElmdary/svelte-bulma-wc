<svelte:options tag="b-app" />

<script lang="ts">
  import { btn } from "./elements"
</script>

<b-modal open closable on:close={console.log}>
  <b-modal-header>
    <b-btns addons size="small" align="centered">
      <button use:btn={{ color: "primary" }}>Details</button>
      <button use:btn>JSON</button>
    </b-btns>
  </b-modal-header>

  <b-modal-body>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
    corrupti vitae aliquid dolores nesciunt voluptatem perspiciatis, veritatis
    eius cumque. Neque in sunt, dolorem voluptas sapiente recusandae alias
    blanditiis consectetur, perspiciatis rerum laudantium ullam est veritatis,
    nam quas mollitia. Unde ullam beatae neque, aliquam quibusdam placeat. Ea
    saepe, iste maxime repellat rerum omnis quis voluptates dignissimos
    consequatur numquam voluptatum dolorem eos eligendi nam molestiae, qui culpa
    perspiciatis aliquam nobis incidunt. Magnam inventore nemo ab, perspiciatis
    fugit sequi laborum unde provident voluptas corporis sed ea accusantium enim
    fuga, et deleniti ipsum cum eaque? Deleniti dicta corporis ab veritatis,
    tempora quam animi. Temporibus minima ab sequi dolore accusamus, numquam
    repudiandae esse, doloremque laudantium, labore saepe dolor quo nam modi!
    Nulla corporis ipsam quod quae totam velit aliquam doloremque commodi
    libero, nobis modi quibusdam ex, vero molestiae. Voluptas consequuntur enim
    error quos quasi. Neque minus consequuntur odio iste et alias nemo numquam
    inventore expedita?
  </b-modal-body>

  <b-modal-actions>
    <b-btns size="small" align="right">
      <button use:btn={{ color: "link", outlined: true }}>Submit</button>
      <button use:btn={{ color: "danger" }}>Cancel</button>
    </b-btns>
  </b-modal-actions>
</b-modal>
