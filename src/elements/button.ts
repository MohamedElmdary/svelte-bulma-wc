import {
  applyHostClass,
  assertBoolean,
  assertColors,
  assertSize,
  type Colors,
  type Sizes,
} from "../internals"

export interface ButtonOptions {
  color?: Colors
  light?: boolean
  size?: Sizes
  fullwidth?: boolean
  outlined?: boolean
  inverted?: boolean
  rounded?: boolean
  hovered?: boolean
  focused?: boolean
  active?: boolean
  loading?: boolean
  selected?: boolean
}

export function btn(node: Element, options: ButtonOptions = {}) {
  applyButtonClass(node, options)

  return {
    update(options: ButtonOptions = {}) {
      applyButtonClass(node, options)
    },
  }
}

function applyButtonClass(node: Element, options: ButtonOptions) {
  assertColors(options.color)
  assertBoolean(options.light, "light")
  assertSize(options.size)
  assertBoolean(options.fullwidth, "fullwidth")
  assertBoolean(options.outlined, "outlined")
  assertBoolean(options.inverted, "inverted")
  assertBoolean(options.rounded, "rounded")
  assertBoolean(options.hovered, "hovered")
  assertBoolean(options.focused, "focused")
  assertBoolean(options.active, "active")
  assertBoolean(options.loading, "loading")
  assertBoolean(options.selected, "selected")

  applyHostClass(node, {
    button: true,
    "is-primary": options.color === "primary",
    "is-link": options.color === "link",
    "is-info": options.color === "info",
    "is-success": options.color === "success",
    "is-warning": options.color === "warning",
    "is-danger": options.color === "danger",
    "is-small": options.size === "small",
    "is-medium": options.size === "medium",
    "is-large": options.size === "large",
    "is-light": options.light,
    "is-fullwidth": options.fullwidth,
    "is-outlined": options.outlined,
    "is-inverted": options.inverted,
    "is-rounded": options.rounded,
    "is-hovered": options.hovered,
    "is-focused": options.focused,
    "is-active": options.active,
    "is-loading": options.loading,
    "is-selected": options.selected,
  })
}
