import convert from 'color-convert'

export const getPairColor = (hex: string): string => {
  const hsl = convert.hex.hsl(hex)

  const h = hsl[0]
  const s = hsl[1]
  const l = hsl[2] > 80 ? 65 : 95

  const pairHex = convert.hsl.hex([h, s, l])
  return `#${pairHex}`
}
