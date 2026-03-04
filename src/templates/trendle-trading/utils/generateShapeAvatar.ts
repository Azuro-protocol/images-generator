const hashCode = (str: string) => {
  return Array.from(str).reduce((hash, c) => (hash << 5) - hash + c.charCodeAt(0), 0)
}

const generateShapeAvatar = (address: string, size = 6, scale = 10): string => {
  const hash = Math.abs(hashCode(address.toLowerCase()))
  const color = `hsl(${hash % 360}, 60%, 55%)`
  let svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size * scale}' height='${size * scale}'>`

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < Math.ceil(size / 2); x++) {
      if (((hash >> (x + y * size)) & 1) === 1) {
        const rx = x * scale
        const ry = y * scale
        const symX = (size - x - 1) * scale
        svg += `<rect x='${rx}' y='${ry}' width='${scale}' height='${scale}' fill='${color}'/>`
        svg += `<rect x='${symX}' y='${ry}' width='${scale}' height='${scale}' fill='${color}'/>`
      }
    }
  }

  svg += '</svg>'

  const avatar = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`

  return avatar
}

export default generateShapeAvatar
