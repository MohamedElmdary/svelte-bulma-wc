/* types */
export type ClassMap = { [key: string]: boolean }
export type Sizes = "small" | "medium" | "large"
export type Bool = "" | "true" | "false" | true | false
type Colors = "primary" | "link" | "info" | "success" | "warning" | "danger"
export type Align = "centered" | "right"

export { type Colors }

/* utils */
export function applyHostClass(host: Element, map: ClassMap) {
  for (const hostClass in map) {
    const contains = host.classList.contains(hostClass)

    if (!contains && map[hostClass]) {
      host.classList.add(hostClass)
      continue
    }

    if (contains && !map[hostClass]) {
      host.classList.remove(hostClass)
    }
  }
}

export function isTrueBool(bool: Bool): boolean {
  return bool === "" || bool === "true" || bool === true
}

export function loadGlobalStyles(host: Element) {
  const styles = document.head.querySelector("[data-global-styles]")
  if (styles) {
    host.prepend(styles.cloneNode(true))
  }
}

export function initElement(host: Element, map: ClassMap = {}) {
  return () => {
    applyHostClass(host, map)
    loadGlobalStyles(host)
  }
}

export function applySizeClass(host: Element, size: Sizes, prefix = "is-") {
  assertSize(size)
  applyHostClass(host, {
    [`${prefix}small`]: size === "small",
    [`${prefix}medium`]: size === "medium",
    [`${prefix}large`]: size === "large",
  })
}

function applyBoolClass(
  host: Element,
  bool: Bool,
  name: string,
  className: string
) {
  assertBoolean(bool, name)
  applyHostClass(host, {
    [className]: isTrueBool(bool),
  })
}

export function applyLightClass(host: Element, light: Bool) {
  applyBoolClass(host, light, "light", "is-light")
}

export function applyRoundClass(host: Element, rounded: Bool) {
  applyBoolClass(host, rounded, "rounded", "is-rounded")
}

export function applyDeleteClass(host: Element, deletable: Bool) {
  applyBoolClass(host, deletable, "deletable", "is-delete")
}

export function applyAddonsClass(host: Element, addons: Bool) {
  applyBoolClass(host, addons, "addons", "has-addons")
}

const ALIGN = ["centered", "right"]
export function applyAlignClass(host: Element, align: Align) {
  assertIn(align, ALIGN, "align")
  applyHostClass(host, {
    "is-centered": align === "centered",
    "is-right": align === "right",
  })
}

export function applyColorClass(host: Element, color: Colors) {
  assertColors(color)
  applyHostClass(host, {
    "is-primary": color === "primary",
    "is-link": color === "link",
    "is-info": color === "info",
    "is-success": color === "success",
    "is-warning": color === "warning",
    "is-danger": color === "danger",
  })
}

/* directives */
export function classMap(map: ClassMap): string {
  return Object.entries(map)
    .filter(([_, value]) => value)
    .map(([key]) => key)
    .join(" ")
}

/* assertion */
const BOOLEAN = ["", "true", "false"]
function panic(message: string): never {
  throw new Error(message)
}

function isEmpty(value: any): boolean {
  return value === undefined || value === null
}

export function assertIn(
  value: string,
  list: string[],
  name: string = "value"
): void | never {
  if (!isEmpty(value) && !list.includes(value)) {
    panic(`Expected ${name} of ("${list.join('", "')}") but got "${value}".`)
  }
}

const SIZES = ["small", "medium", "large"]
export function assertSize(size: Sizes): void | never {
  assertIn(size, SIZES, "size")
}

export function assertBoolean(value: Bool, name: string): void | never {
  assertIn(value?.toString?.(), BOOLEAN, name)
}

const COLORS = ["primary", "link", "info", "success", "warning", "danger"]
export function assertColors(color: Colors): void | never {
  assertIn(color, COLORS, "color")
}
