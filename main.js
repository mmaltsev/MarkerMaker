/**
 * Main function.
 * @constructor
 * @param {string} pinOriginalColor - color of the pin.
 * @param {number} width - width of the pin.
 * @param {number} height - height of the pin.
 */
function pinOutline(pinOriginalColor, width = 50, height = 82) {
  let {pinColor, pinColorDark} = colorExtractor(pinOriginalColor)
  let pin = pinMaker(pinColor, pinColorDark, width, height)
  return pin.toDataURL('image/png')
}

/**
 * Extracts color in RGB format.
 * @constructor
 * @param {string} pinOriginalColor - color of the pin.
 */
function colorExtractor(pinOriginalColor) {
  let colorDiv = document.createElement('div')
  colorDiv.style.color = pinOriginalColor
  document.body.appendChild(colorDiv)
  let pinColor = (window.getComputedStyle(colorDiv).color)
  document.body.removeChild(colorDiv)
  let pinColorDark = colorDarkening(pinColor)
  return {pinColor, pinColorDark}
}

/**
 * Makes original color darker (for stroke).
 * @constructor
 * @param {string} pinColor - color of the pin.
 */
function colorDarkening(pinColor) {
  let rgbColorsArray = (pinColor.substring(4, pinColor.length - 1))
                         .split(',')
                         .map((item) => parseInt(item, 10))
  let darkDegree = 100
  let [red, green, blue] =
    rgbColorsArray.map((color) => color >= darkDegree ? color - darkDegree : color)
  return 'rgb(' + red + ', ' + green + ', ' + blue + ')'
}

/**
 * Outlines pin.
 * @constructor
 * @param {string} pinColor - color of the pin.
 * @param {string} pinColorDark - color of the stroke.
 * @param {number} width - width of the pin.
 * @param {number} height - height of the pin.
 */
function pinMaker(pinColor, pinColorDark, width, height) {
  let element = document.createElement('canvas')
  element.setAttribute('id', 'pin')
  element.setAttribute('width', '' + width)
  element.setAttribute('height', '' + height)
  let pin = {
    x: width / 2,
    y: height,
    pinColor: pinColor,
    arcColor: 'white',
    strokeColor: pinColorDark,
  }

  let {pls, prs, arc} = setCoordinates(width, height)

  let ctx = element.getContext('2d')
  ctx.save()
  ctx.translate(pin.x, pin.y)
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.bezierCurveTo(pls.cp1x, pls.cp1y, pls.cp2x, pls.cp2y, pls.x, pls.y)
  ctx.bezierCurveTo(prs.cp1x, prs.cp1y, prs.cp2x, prs.cp2y, prs.x, prs.y)
  ctx.fillStyle = pin.pinColor
  ctx.fill()
  ctx.strokeStyle = pin.strokeColor
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(arc.x, arc.y, arc.r, arc.sAngle, arc.eAngle)
  ctx.closePath()
  ctx.fillStyle = pin.arcColor
  ctx.fill()
  ctx.strokeStyle = pin.strokeColor
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.restore()

  return element
}

/**
 * Sets pin coordinates for canvas outlining.
 * @constructor
 * @param {number} width - width of the pin.
 * @param {number} height - height of the pin.
 */
function setCoordinates(width, height) {
  // Pin left side coordinates
  let pls = {}
  pls.cp1x = 0
  pls.cp1y = -5
  pls.cp2x = -(width + 4.5)
  pls.cp2y = -(height - 2)
  pls.x = 0
  pls.y = -(height - 2)

  // Pin right side coordinates
  let prs = {}
  prs.cp1x = width + 4.5
  prs.cp1y = -(height - 2)
  prs.cp2x = 0
  prs.cp2y = -5
  prs.x = 0
  prs.y = 0

  // Arc coordinates
  let arc = {}
  arc.x = 0
  arc.y = -(0.67 * height)
  arc.r = height / 9
  arc.sAngle = 0
  arc.eAngle = Math.PI * 2

  return {pls, prs, arc}
}
