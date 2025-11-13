import * as types from '../types'
import { SPECIAL_CASES } from './getIncorrectAnswers'

/** Check if a country is visible within the viewBox. */
export function isCountryVisible(
  country: types.Country,
  viewBox: types.ViewBox,
  fullCheck = false,
) {
  if (SPECIAL_CASES.includes(country.id) && !fullCheck) return true

  const { path } = country
  const SVG_NS = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(SVG_NS, 'svg')
  const pathEl = document.createElementNS(SVG_NS, 'path')
  pathEl.setAttribute('d', path)
  svg.appendChild(pathEl)
  svg.style.position = 'absolute'
  svg.style.left = '-9999px'
  svg.style.top = '-9999px'
  svg.style.width = '0'
  svg.style.height = '0'
  document.body.appendChild(svg)

  try {
    const bb = pathEl.getBBox()
    if (
      bb.x + bb.width < viewBox.x ||
      bb.x > viewBox.x + viewBox.w ||
      bb.y + bb.height < viewBox.y ||
      bb.y > viewBox.y + viewBox.h
    )
      return false

    const totalLength = pathEl.getTotalLength()
    const sampleCount = Math.max(1, Math.ceil(totalLength))

    let prev = pathEl.getPointAtLength(0)
    if (inView(prev.x, prev.y, viewBox)) return true

    for (let i = 1; i <= sampleCount; i++) {
      const p = pathEl.getPointAtLength((i * totalLength) / sampleCount)

      if (
        inView(p.x, p.y, viewBox) ||
        segIntersectsRect(prev.x, prev.y, p.x, p.y, viewBox)
      )
        return true

      prev = p
    }

    return false
  } finally {
    svg.remove()
  }
}

// Helpers
function orient(
  ax: number,
  ay: number,
  bx: number,
  by: number,
  cx: number,
  cy: number,
) {
  return (bx - ax) * (cy - ay) - (by - ay) * (cx - ax)
}

function inView(x: number, y: number, viewBox: types.ViewBox) {
  return (
    x >= viewBox.x &&
    x <= viewBox.x + viewBox.w &&
    y >= viewBox.y &&
    y <= viewBox.y + viewBox.h
  )
}

function segsIntersect(
  ax: number,
  ay: number,
  bx: number,
  by: number,
  cx: number,
  cy: number,
  dx: number,
  dy: number,
) {
  const o1 = orient(ax, ay, bx, by, cx, cy)
  const o2 = orient(ax, ay, bx, by, dx, dy)
  const o3 = orient(cx, cy, dx, dy, ax, ay)
  const o4 = orient(cx, cy, dx, dy, bx, by)
  return o1 * o2 < 0 && o3 * o4 < 0
}

function segIntersectsRect(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  viewBox: types.ViewBox,
) {
  const sMinX = Math.min(x1, x2),
    sMaxX = Math.max(x1, x2),
    sMinY = Math.min(y1, y2),
    sMaxY = Math.max(y1, y2)

  if (
    sMaxX < viewBox.x ||
    sMinX > viewBox.x + viewBox.w ||
    sMaxY < viewBox.y ||
    sMinY > viewBox.y + viewBox.h
  )
    return false

  if (inView(x1, y1, viewBox) || inView(x2, y2, viewBox)) return true

  const x1v = viewBox.x,
    y1v = viewBox.y,
    x2v = viewBox.x + viewBox.w,
    y2v = viewBox.y + viewBox.h

  return (
    segsIntersect(x1, y1, x2, y2, x1v, y1v, x2v, y1v) ||
    segsIntersect(x1, y1, x2, y2, x2v, y1v, x2v, y2v) ||
    segsIntersect(x1, y1, x2, y2, x2v, y2v, x1v, y2v) ||
    segsIntersect(x1, y1, x2, y2, x1v, y2v, x1v, y1v)
  )
}
