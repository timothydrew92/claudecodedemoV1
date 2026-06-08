import { useState } from 'react'

export function useMotivation() {
  const [toast, setToast] = useState(null)

  async function fetchMotivation(habitName, streak) {
    try {
      const res = await fetch('/api/motivate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habitName, streak }),
      })
      if (!res.ok) return
      const { message } = await res.json()
      if (message) setToast({ message, habitName })
    } catch {
      // silent fail — habit was already toggled, toast is best-effort
    }
  }

  function dismissToast() {
    setToast(null)
  }

  return { toast, fetchMotivation, dismissToast }
}
