export const shortenedTable = 480 // px
export const regularTable = 640 // px
export const expandedTable = 800 // px

export const detailPane = 720 // px

export const proButton = 32 // px

/**
 * Maps screen size names to the lower bound of their width range in pixels.
 *
 * **Key:**
 * - `'t'` indicates that terminal should be visible
 * - `'b'` indicates that the more button should be visible
 *
 * Duplicated in Tailwind config: `tailwind.config.js`
 */
export const screenSizes: Record<string, number> = {
  z: 0,
  s: shortenedTable,
  mb: regularTable + proButton,
  lb: expandedTable + proButton,
  spb: shortenedTable + detailPane + proButton,
  mpb: regularTable + detailPane + proButton,
}
