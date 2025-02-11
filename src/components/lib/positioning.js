import { tick } from 'svelte'

function getY (width, top, bottom) {
  if (width < 480) {
    return Math.abs(top)
  } else if (top < 0) {
    return Math.abs(top)
  } else if (bottom < 0) {
    return bottom
  } else {
    return 0
  }
}

function getX (width, left, right) {
  if (width < 480) {
    const l = Math.abs(left)
    const r = Math.abs(right)
    const border = (Math.max(l, r) - Math.min(l, r)) / 2
    return l + border
  } else if (left < 0) {
    return Math.abs(left)
  } else if (right < 0) {
    return right
  } else {
    return 0
  }
}

function getTranslate (width, distance) {
  const { bottom, top, left, right } = distance
  const y = getY(width, top, bottom)
  const x = getX(width, left, right)
  return { x, y }
}

async function getDistanceToEdges (w, contentsWrapper, translateX, translateY) {
  await tick()
  const rect = contentsWrapper.getBoundingClientRect()
  return {
    top: rect.top + (-1 * translateY),
    bottom: w.innerHeight - rect.bottom + translateY,
    left: rect.left + (-1 * translateX),
    right: w.document.body.clientWidth - rect.right + translateX
  }
}

export {
  getDistanceToEdges,
  getTranslate
}
