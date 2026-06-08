import { useState, useEffect } from 'react'
import { today } from '../utils/streaks'

const STORAGE_KEY = 'dailywins_v1'

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

export function useHabits() {
  const [habits, setHabits] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [] }
    catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
  }, [habits])

  function addHabit(name, cat) {
    setHabits(prev => [...prev, { id: uid(), name, cat, dates: [] }])
  }

  function updateHabit(id, name, cat) {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, name, cat } : h))
  }

  function deleteHabit(id) {
    setHabits(prev => prev.filter(h => h.id !== id))
  }

  function toggleHabit(id) {
    const td = today()
    setHabits(prev => prev.map(h => {
      if (h.id !== id) return h
      const dates = h.dates || []
      const i = dates.indexOf(td)
      return { ...h, dates: i === -1 ? [...dates, td] : dates.filter((_, idx) => idx !== i) }
    }))
  }

  return { habits, addHabit, updateHabit, deleteHabit, toggleHabit }
}
