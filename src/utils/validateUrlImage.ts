export function validateImageUrl(url: string): Promise<boolean> {
  return new Promise((resolve, _reject) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}
