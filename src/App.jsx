import { useState } from 'react'
import { LanguageContext } from './context/LanguageContext'
import { useLanguage } from './hooks/useLanguage'
import { useHabits } from './hooks/useHabits'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import HabitList from './components/HabitList'
import HabitModal from './components/HabitModal'

export default function App() {
  const { lang, setLang }                                          = useLanguage()
  const { habits, addHabit, updateHabit, deleteHabit, toggleHabit } = useHabits()
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

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <div className="min-h-screen bg-slate-100 font-sans">
        <Header />

        <main className="max-w-[840px] mx-auto px-5 py-7 pb-16 sm:px-3.5 sm:py-5">
          <Dashboard habits={habits} />
          <HabitList
            habits={habits}
            onToggle={toggleHabit}
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
      </div>
    </LanguageContext.Provider>
  )
}
