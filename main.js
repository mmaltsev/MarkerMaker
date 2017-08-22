function pinOutline(pinOriginalColor, width, height) {
  let {pinColor, pinColorDark} = colorExtractor(pinOriginalColor)
  let pin = pinMaker(pinColor, pinColorDark, width, height)
  document.getElementById('html').innerHTML = pin.toDataURL('image/png')
  return pin.toDataURL('image/png')
}
	  
function colorExtractor(pinOriginalColor) {
  let colorDiv = document.createElement('div')
  colorDiv.style.color = pinOriginalColor
  document.body.appendChild(colorDiv)
  let pinColor = (window.getComputedStyle(colorDiv).color)
  document.body.removeChild(colorDiv)
  let pinColorDark = colorDarkening(pinColor)
  return {pinColor, pinColorDark}
}

function colorDarkening(pinColor) {
  let rgbColorsArray = (pinColor.substring(4, pinColor.length - 1))
                         .split(',')
                         .map((item) => parseInt(item, 10))
  let darkDegree = 100
  let [red, green, blue] =
    rgbColorsArray.map((color) => color >= darkDegree ? color - darkDegree : color)
  return 'rgb(' + red + ', ' + green + ', ' + blue + ')'
}
	  
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

function setCoordinates(width, height) {
  // pin left side coordinates
  let pls = {}
  pls.cp1x = 0
  pls.cp1y = -5
  pls.cp2x = -(width + 4.5)
  pls.cp2y = -(height - 2)
  pls.x = 0
  pls.y = -(height - 2)

  // pin right side coordinates
  let prs = {}
  prs.cp1x = width + 4.5
  prs.cp1y = -(height - 2)
  prs.cp2x = 0
  prs.cp2y = -5
  prs.x = 0
  prs.y = 0

  // arc coordinates
  let arc = {}
  arc.x = 0
  arc.y = -(0.67 * height)
  arc.r = height / 9
  arc.sAngle = 0
  arc.eAngle = Math.PI * 2

  return {pls, prs, arc}
}
