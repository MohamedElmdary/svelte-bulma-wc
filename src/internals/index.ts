export type ClassMap = { [key: string]: boolean }

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

export function classMap(map: ClassMap): string {
  return Object.entries(map)
    .filter(([_, value]) => value)
    .map(([key]) => key)
    .join(" ")
}
