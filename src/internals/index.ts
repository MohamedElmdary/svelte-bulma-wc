/* types */
export type ClassMap = { [key: string]: boolean }
export type Sizes = "small" | "medium" | "large"

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

/* directives */
export function classMap(map: ClassMap): string {
  return Object.entries(map)
    .filter(([_, value]) => value)
    .map(([key]) => key)
    .join(" ")
}

/* assertion */
function panic(message: string): never {
  throw new Error(message)
}

export function assertIn(
  value: string,
  list: string[],
  name: string = "value"
): void | never {
  if (!list.includes(value)) {
    panic(`Expected ${name} of ("${list.join('", "')}") but got "${value}".`)
  }
}

const SIZES = ["small", "medium", "large"]
export function assertSize(size: Sizes): void | never {
  assertIn(size, SIZES, "size")
}
