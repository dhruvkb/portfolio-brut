/* eslint-disable */
declare module '*.vue' {
  const component: DefineComponent<{}, {}, any>
  export default component

  import type { Binary } from '@/models/bin'
  export const binaryFn: () => Binary
}
