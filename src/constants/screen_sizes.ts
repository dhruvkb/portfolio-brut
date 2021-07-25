/**
 * Maps screen size names to the lower bound of their width range in pixels.
 *
 * Duplicated in Tailwind config: `tailwind.config.js`
 */
export const screenSizes: Record<string, number> = {
  z: 0,
  s: 480, // shortened table
  m: 640, // regular table
  l: 800, // expanded table
  sx: 1200, // shortened table locked at 480px, with terminal
  mx: 1360, // regular table locked at 640px, with terminal
}
