/// <reference types="svelte" />
/// <reference types="vite/client" />

import type * as tfSvelteRxForms from "tf-svelte-rx-forms"

declare global {
  interface Window {
    tfSvelteRxForms: typeof tfSvelteRxForms
  }
}
