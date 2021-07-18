import { SVG, Rect, Circle, Ellipse } from '@k-kind/svg-generator'

export default (mainColor: string, backgroundColor: string): SVGSVGElement => {
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
  // const startTime = Date.now()
  // for (let i = 0; i < 400; i++) {
  //   const circle = generateCircle({
  //     cx: i.toString(),
  //     cy: i.toString(),
  //     r: '3',
  //     fill: 'red'
  //   })
  //   svg.appendChild(circle)
  //   const line = generateLine({
  //     x1: (512 - i).toString(),
  //     x2: (512 - i - 1).toString(),
  //     y1: i.toString(),
  //     y2: (i + 1).toString(),
  //     stroke: 'blue'
  //   })
  //   svg.appendChild(line)
  // }
  // console.log(Date.now() - startTime)

  return svg.element
}
