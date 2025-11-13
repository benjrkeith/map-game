import * as types from '../types'

/** Helper to generate the viewBox str rather than duplicating values. */
function makeViewBox(x: number, y: number, w: number, h: number) {
  return { x, y, w, h, str: `${x} ${y} ${w} ${h}` }
}

const SPECIAL_CASES: Record<string, types.ViewBox[]> = {
  RU: [
    makeViewBox(750, 240, 120, 120),
    makeViewBox(510, 210, 80, 80),
    makeViewBox(560, 250, 100, 100),
  ],
  US: [makeViewBox(220, 350, 60, 60), makeViewBox(110, 295, 120, 120)],
  CA: [makeViewBox(220, 240, 150, 150)],
  GL: [makeViewBox(300, 100, 180, 180)],
  AU: [makeViewBox(790, 470, 110, 110)],
}

/** Get the viewBox for a given country, takes optional zoom param. */
export function getViewBox(country: types.Country, zoom = 0) {
  const specialCases = SPECIAL_CASES[country.id]
  if (specialCases)
    return specialCases[Math.floor(Math.random() * specialCases.length)]

  // Final viewport is square so we pick the larger of the two dimesions
  const { x, y } = country.bounds
  const width = x.max - x.min
  const height = y.max - y.min
  let size = Math.max(width, height) + zoom

  // For centering country if not perfect square
  const offsetX = (size - width) / 2
  const offsetY = (size - height) / 2

  let viewX = x.min - offsetX
  let viewY = y.min - offsetY

  return makeViewBox(viewX, viewY, size, size)
}
