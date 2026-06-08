import { useState } from 'react'
import { LanguageContext } from './context/LanguageContext'
import { useLanguage } from './hooks/useLanguage'
import { useHabits } from './hooks/useHabits'
import { useMotivation } from './hooks/useMotivation'
import { streaks } from './utils/streaks'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import HabitList from './components/HabitList'
import HabitModal from './components/HabitModal'
import Toast from './components/Toast'

export default function App() {
  const { lang, setLang }                                          = useLanguage()
  const { habits, addHabit, updateHabit, deleteHabit, toggleHabit } = useHabits()
  const { toast, fetchMotivation, dismissToast }                   = useMotivation()
  const [modal, setModal] = useState({ open: false, editId: null })

  function openModal(editId = null) {
    setModal({ open: true, editId })
  }

  function closeModal() {
    setModal({ open: false, editId: null })
  }

  function handleSave(name, cat) {
    if (modal.editId) updateHabit(modal.editId, name, cat)
    else              addHabit(name, cat)
    closeModal()
  }

  function handleDelete() {
    if (modal.editId) deleteHabit(modal.editId)
    closeModal()
  }

  function handleComplete(habitId) {
    const habit = habits.find(h => h.id === habitId)
    if (!habit) return
    const { cur } = streaks(habit.dates || [])
    fetchMotivation(habit.name, cur + 1)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <div className="min-h-screen bg-slate-100 font-sans">
        <Header />

        <main className="max-w-[840px] mx-auto px-5 py-7 pb-16 sm:px-3.5 sm:py-5">
          <Dashboard habits={habits} />
          <HabitList
            habits={habits}
            onToggle={toggleHabit}
            onComplete={handleComplete}
            onOpenModal={openModal}
          />
        </main>

        <HabitModal
          open={modal.open}
          editId={modal.editId}
          habits={habits}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={closeModal}
        />

        <Toast toast={toast} onDismiss={dismissToast} />
      </div>
    </LanguageContext.Provider>
  )
}
