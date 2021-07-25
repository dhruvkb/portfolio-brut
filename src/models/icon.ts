export interface IPath {
  d: string
  'fill-rule': string
}

/**
 * Picks `path` from `@types/simple-icons`
 */
export interface ISimpleIcon {
  path: string
}

/**
 * Used by custom icons (eg. IMG and BrowserStack) from `@/assets/icons/`.
 */
export interface ICustomIcon {
  paths: IPath[]
}
