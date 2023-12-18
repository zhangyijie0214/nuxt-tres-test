export function getWheelDirection(ev) {
  ev = ev || window.event
  if (ev.wheelDelta) {
    return ev.wheelDelta > 0 ? 'up' : 'down'
  }
  // firefox
  if (ev.detail) {
    return ev.detail > 0 ? 'down' : 'up'
  }
}
