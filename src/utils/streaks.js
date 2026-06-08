export function today() {
  return new Date().toISOString().split('T')[0]
}

export function streaks(dates) {
  if (!dates || dates.length === 0) return { cur: 0, best: 0 }

  const set    = new Set(dates)
  const sorted = [...dates].sort()
  const now    = today()

  // Walk backward from today to find current streak
  let cur = 0
  let d   = new Date(now + 'T12:00:00')
  while (set.has(d.toISOString().split('T')[0])) {
    cur++
    d.setDate(d.getDate() - 1)
  }
  // If today not done, check if yesterday keeps the streak alive
  if (cur === 0) {
    d = new Date(now + 'T12:00:00')
    d.setDate(d.getDate() - 1)
    while (set.has(d.toISOString().split('T')[0])) {
      cur++
      d.setDate(d.getDate() - 1)
    }
  }

  // Longest consecutive streak
  let best = 1, run = 1
  for (let i = 1; i < sorted.length; i++) {
    const diff = Math.round(
      (new Date(sorted[i] + 'T12:00:00') - new Date(sorted[i - 1] + 'T12:00:00')) / 86400000
    )
    if (diff === 1)    { run++; best = Math.max(best, run) }
    else if (diff > 1) { run = 1 }
  }
  best = Math.max(best, run)

  return { cur, best }
}
