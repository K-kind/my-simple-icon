export const EXTENSIONS = {
  PNG: 'png',
  JPG: 'jpg',
  SVG: 'svg'
} as const

export type Extension = typeof EXTENSIONS[keyof typeof EXTENSIONS]

export const downloadImage = (
  type: Extension,
  svg: SVGSVGElement,
  filename: string
): void => {
  if (type === EXTENSIONS.PNG || type === EXTENSIONS.JPG) {
    downloadViaCanvas(type, svg, filename)
  } else if (type === EXTENSIONS.SVG) {
    downloadAsSVG(svg, filename)
  }
}

const downloadViaCanvas = async (
  type: typeof EXTENSIONS.PNG | typeof EXTENSIONS.JPG,
  svg: SVGSVGElement,
  filename: string
) => {
  const canvas = document.createElement('canvas')
  canvas.width = svg.width.baseVal.value
  canvas.height = svg.height.baseVal.value

  const ctx = canvas.getContext('2d')!
  const image = new Image()

  const svgBlob = getSVGBlob(svg)
  const svgUrl = URL.createObjectURL(svgBlob)
  image.src = svgUrl

  await new Promise((resolve) => {
    image.onload = () => {
      resolve(undefined)
    }
  })
  ctx.drawImage(image, 0, 0)
  const canvasImageUrl = canvas.toDataURL(`image/${type}`)
  doDownloadFromUrl(canvasImageUrl, `${filename}.${type}`)

  image.remove()
  canvas.remove()
  URL.revokeObjectURL(svgUrl)
  URL.revokeObjectURL(canvasImageUrl)
}

const downloadAsSVG = (svg: SVGSVGElement, filename: string) => {
  const svgBlob = getSVGBlob(svg)
  const url = URL.createObjectURL(svgBlob)
  doDownloadFromUrl(url, `${filename}.svg`)
  URL.revokeObjectURL(url)
}

const getSVGBlob = (svg: SVGSVGElement) => {
  const svgSource = new XMLSerializer().serializeToString(svg)
  return new Blob([svgSource], {
    type: 'image/svg+xml;charset=utf-8'
  })
}

const doDownloadFromUrl = (url: string, fullFilename: string) => {
  const a = document.createElement('a')
  a.href = url
  a.download = fullFilename
  a.click()
  a.remove()
}
