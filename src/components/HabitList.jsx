import { useT } from '../context/LanguageContext'
import HabitCard from './HabitCard'
import EmptyState from './EmptyState'

export default function HabitList({ habits, onToggle, onComplete, onOpenModal }) {
  const t = useT()

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.08em] text-slate-400">
          {t('myHabits')}
        </p>
        <button
          onClick={() => onOpenModal(null)}
          className="flex items-center gap-1.5 bg-accent hover:bg-accent-dark active:scale-[0.97] text-white rounded-lg px-4 py-2 text-[0.88rem] font-bold transition-all shadow-[0_2px_6px_rgba(99,102,241,0.3)]"
        >
          <span className="text-base leading-none">+</span>
          {t('addHabit')}
        </button>
      </div>

      {habits.length === 0 ? (
        <EmptyState onAdd={() => onOpenModal(null)} />
      ) : (
        <div className="flex flex-col gap-2.5">
          {habits.map(h => (
            <HabitCard
              key={h.id}
              habit={h}
              onToggle={() => onToggle(h.id)}
              onComplete={() => onComplete(h.id)}
              onEdit={() => onOpenModal(h.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
