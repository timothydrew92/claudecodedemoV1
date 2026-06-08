import { useState, useEffect, useRef } from 'react'
import { useT } from '../context/LanguageContext'

const CATEGORIES = ['Fitness', 'Mindfulness', 'Learning', 'Productivity']
const CAT_KEYS   = {
  Fitness: 'catFitness', Mindfulness: 'catMindfulness',
  Learning: 'catLearning', Productivity: 'catProductivity',
}

const SELECT_ARROW = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2364748b' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`

export default function HabitModal({ open, editId, habits, onSave, onDelete, onClose }) {
  const t        = useT()
  const inputRef = useRef(null)
  const [name, setName] = useState('')
  const [cat,  setCat]  = useState('Fitness')

  useEffect(() => {
    if (!open) return
    if (editId) {
      const h = habits.find(x => x.id === editId)
      if (h) { setName(h.name); setCat(h.cat) }
    } else {
      setName(''); setCat('Fitness')
    }
    setTimeout(() => inputRef.current?.focus(), 80)
  }, [open, editId, habits])

  function handleSave() {
    if (!name.trim()) { inputRef.current?.focus(); return }
    onSave(name.trim(), cat)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter')  handleSave()
    if (e.key === 'Escape') onClose()
  }

  const inputCls = `w-full px-3.5 py-2.5 border-[1.5px] border-slate-200 rounded-[9px] text-[0.95rem]
    bg-slate-50 outline-none transition-all font-[inherit]
    focus:border-accent focus:ring-[3px] focus:ring-accent/10`

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 bg-slate-900/45 backdrop-blur-sm z-50 flex items-center justify-center p-4
        transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div
        className={`bg-white rounded-2xl p-7 w-full max-w-[420px] shadow-2xl
          transition-transform duration-200
          ${open ? 'translate-y-0 scale-100' : 'translate-y-4 scale-[0.98]'}`}
      >
        <h2 className="text-lg font-extrabold mb-5 text-slate-800">
          {editId ? t('editHabit') : t('addHabit')}
        </h2>

        <div className="mb-4">
          <label className="block text-[0.82rem] font-bold text-slate-500 mb-1.5 tracking-[0.01em]">
            {t('habitName')}
          </label>
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('namePlaceholder')}
            autoComplete="off"
            className={inputCls}
          />
        </div>

        <div className="mb-4">
          <label className="block text-[0.82rem] font-bold text-slate-500 mb-1.5 tracking-[0.01em]">
            {t('category')}
          </label>
          <select
            value={cat}
            onChange={e => setCat(e.target.value)}
            className={`${inputCls} appearance-none cursor-pointer pr-9`}
            style={{
              backgroundImage: SELECT_ARROW,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
            }}
          >
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{t(CAT_KEYS[c])}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 justify-end mt-5 flex-wrap">
          {editId && (
            <button
              onClick={onDelete}
              className="mr-auto px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-[9px] text-[0.88rem] font-bold transition-colors"
            >
              {t('delete')}
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2.5 border-[1.5px] border-slate-200 text-slate-700 rounded-[9px] text-[0.88rem] font-bold hover:bg-slate-50 transition-colors"
          >
            {t('cancel')}
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-accent hover:bg-accent-dark text-white rounded-[9px] text-[0.88rem] font-bold transition-colors shadow-[0_2px_6px_rgba(99,102,241,0.28)]"
          >
            {t('save')}
          </button>
        </div>
      </div>
    </div>
  )
}
