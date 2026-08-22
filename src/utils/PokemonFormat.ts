export function formatHeight(dm: number): string {
  return `${(dm / 10).toFixed(1)} m`;
}

export function formatWeight(hg: number): string {
  return `${(hg / 10).toFixed(1)} kg`;
}