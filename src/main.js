module.exports = function(pinOriginalColor, width = 50, height = 82) {
  return markerOutliner(pinOriginalColor, width, height)
}

/**
 * Outlines Leaflet map marker pins/houses via HTML5 Canvas.
 * @param {string} pinOriginalColor - color of the pin.
 * @param {number} width - width of the pin.
 * @param {number} height - height of the pin.
 * @return {string} - data URI in base64 representing an image.
 */
function markerOutliner(pinOriginalColor, width = 50, height = 82, markerType = 'pin') {
  let { pinColor, pinColorDark } = colorExtractor(pinOriginalColor)
  let marker
  if (markerType === 'pin')
    marker = pinMaker(pinColor, pinColorDark, width, height)
  else if (markerType === 'house')
    marker = houseMaker(pinColor, pinColorDark, width, height)
  else
    console.log('Unknown type of marker!')
  return marker.toDataURL('image/png')
}

/**
 * Extracts color in RGB format.
 * @param {string} pinOriginalColor - color of the pin.
 * @return {object} - colors of pin and pin stroke.
 */
function colorExtractor(pinOriginalColor) {
  let colorDiv = document.createElement('div')
  colorDiv.style.color = pinOriginalColor
  document.body.appendChild(colorDiv)
  let pinColor = (window.getComputedStyle(colorDiv).color)
  document.body.removeChild(colorDiv)
  let pinColorDark = colorDarkening(pinColor)
  return { pinColor, pinColorDark }
}

/**
 * Makes original color darker (for stroke).
 * @param {string} pinColor - color of the pin.
 * @return {string} - color in RGB format.
 */
function colorDarkening(pinColor) {
  let rgbColorsArray = (pinColor.substring(4, pinColor.length - 1))
                         .split(',')
                         .map((item) => parseInt(item, 10))
  let darkDegree = 60
  let [red, green, blue] =
    rgbColorsArray.map((color) => color >= darkDegree ? color - darkDegree : color)
  return 'rgb(' + red + ', ' + green + ', ' + blue + ')'
}

/**
 * Outlines pin.
 * @param {string} pinColor - color of the pin.
 * @param {string} pinColorDark - color of the stroke.
 * @param {number} width - width of the pin.
 * @param {number} height - height of the pin.
 * @return {HTMLElement} - canvas.
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

  let { pls, prs, arc } = setCoordinates(width, height)

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
 * @param {number} width - width of the pin.
 * @param {number} height - height of the pin.
 * @return {object} - coordinates for pin outlining.
 */
function setCoordinates(width, height) {
  // Pin left side coordinates
  let pls = {}
  pls.cp1x = 0
  pls.cp1y = -5
  pls.cp2x = -width
  pls.cp2y = -(height - 2)
  pls.x = 0
  pls.y = -(height - 2)

  // Pin right side coordinates
  let prs = {}
  prs.cp1x = width
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

  return { pls, prs, arc }
}

/**
 * Outlines house.
 * @param {string} pinColor - color of the pin.
 * @param {string} pinColorDark - color of the stroke.
 * @param {number} width - width of the pin.
 * @param {number} height - height of the pin.
 * @return {HTMLElement} - canvas.
 */
function houseMaker(pinColor, pinColorDark, width, height) {
  let element = document.createElement('canvas')
  element.setAttribute('id', 'house')
  element.setAttribute('width', '' + width)
  element.setAttribute('height', '' + height)
  let pin = {
    x: width,
    y: height,
    pinColor: pinColor,
    arcColor: 'white',
    strokeColor: pinColorDark,
  }

  let lw = 2
  let rh = height*0.4 // roof height
  let dlm = width*0.36 // door left margin
  let drm = width*0.64 // door right margin
  let dtm = height*0.68 // door top margin

  let ctx = element.getContext('2d')
  ctx.save()
  ctx.moveTo(lw/2, rh)
  ctx.lineTo(width-lw/2, rh)
  ctx.lineTo(width-lw/2, height-lw/2)
  ctx.lineTo(lw/2, height-lw/2)
  ctx.lineTo(lw/2, rh)
  ctx.lineTo(width/2, lw/2)
  ctx.lineTo(width-lw/2, rh)

  ctx.moveTo(dlm, height-lw/2)
  ctx.lineTo(dlm, dtm)
  ctx.lineTo(drm, dtm)
  ctx.lineTo(drm, height-lw/2)
  ctx.closePath()
  ctx.fillStyle = pin.pinColor
  ctx.fill()
  ctx.strokeStyle = pin.strokeColor
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.restore()

  return element
}
