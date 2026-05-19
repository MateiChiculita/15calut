export function recommend(videos, stats = {}) {
  // Simple scoring: watchTime (seconds) + liked bonus
  const scored = videos.map(v => {
    const s = stats[v.id] || { watchTime: 0, liked: false }
    const score = (s.watchTime || 0) + (s.liked ? 600 : 0)
    return { ...v, score }
  })
  scored.sort((a, b) => b.score - a.score)
  return scored
}
