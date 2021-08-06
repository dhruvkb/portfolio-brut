export interface IPath {
  d: string
  'fill-rule': string
}

/**
 * Used by custom icons (eg. IMG and BrowserStack) from `@/assets/icons/`.
 */
export interface ICustomIcon {
  paths: IPath[]
}
