export function transformCount(count: number): string {
  if (count >= 1000 && count < 1000000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'M'
  } else if (count >= 1000000 && count < 1000000000) {
    return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'Mi'
  } else if (count >= 1000000000) {
    return (count / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B'
  }
  return count.toString()
}
