import { SVG, Rect, Circle, Ellipse } from '@k-kind/svg-generator'

export const generateSimpleIcon = (
  mainColor: string,
  backgroundColor: string
): SVGSVGElement => {
  const svg = new SVG()
  svg.setAttributes({
    width: '512',
    height: '512',
    viewBox: '0 0 512 512'
  })

  const background = new Rect({
    x: '0',
    y: '0',
    width: '512',
    height: '512',
    fill: backgroundColor
  })
  svg.append(background)

  const face = new Circle({
    cx: '256',
    cy: '199',
    r: '114',
    fill: mainColor
  })
  svg.append(face)

  const body = new Ellipse({
    cx: '256',
    cy: '512',
    rx: '242',
    ry: '172',
    fill: mainColor
  })
  svg.append(body)
  return svg.element
}

export const updateSimpleIcon = (
  svg: SVGSVGElement,
  mainColor: string,
  backgroundColor: string
): void => {
  const backgroundRect = svg.children[0]
  backgroundRect.setAttribute('fill', backgroundColor)

  const faceCircle = svg.children[1]
  faceCircle.setAttribute('fill', mainColor)

  const bodyEllipse = svg.children[2]
  bodyEllipse.setAttribute('fill', mainColor)
}
