import { useT } from '../context/LanguageContext'
import { streaks, today } from '../utils/streaks'

const CAT_STYLES = {
  Fitness:      'bg-amber-100 text-amber-700',
  Mindfulness:  'bg-green-50 text-green-700',
  Learning:     'bg-blue-50 text-blue-700',
  Productivity: 'bg-purple-50 text-purple-700',
}

const CAT_KEYS = {
  Fitness:      'catFitness',
  Mindfulness:  'catMindfulness',
  Learning:     'catLearning',
  Productivity: 'catProductivity',
}

export default function HabitCard({ habit, onToggle, onComplete, onEdit }) {
  const t    = useT()
  const done = (habit.dates || []).includes(today())
  const { cur, best } = streaks(habit.dates || [])

  function handleCheck() {
    if (!done) onComplete?.()
    onToggle()
  }

  return (
    <div
      className={`rounded-xl p-4 border-[1.5px] shadow-sm transition-all duration-200 hover:shadow-md
        ${done ? 'border-green-500 bg-green-50' : 'border-slate-200 bg-white'}`}
    >
      {/* Top row */}
      <div className="flex items-start gap-3">
        <button
          onClick={handleCheck}
          aria-label={done ? 'Mark incomplete' : 'Mark complete'}
          className={`flex-shrink-0 w-[26px] h-[26px] mt-0.5 rounded-full border-2 flex items-center justify-center text-sm transition-all duration-[180ms]
            ${done
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-slate-200 text-transparent hover:border-green-500 hover:bg-green-50'
            }`}
        >
          ✓
        </button>

        <div className="flex-1 min-w-0">
          <p className="font-bold text-[0.97rem] mb-1.5 break-words">{habit.name}</p>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`text-[0.68rem] font-bold px-2 py-0.5 rounded-full tracking-wide
              ${CAT_STYLES[habit.cat] || 'bg-accent-bg text-accent'}`}>
              {t(CAT_KEYS[habit.cat] || habit.cat)}
            </span>
            {cur > 0 && (
              <span className="flex items-center gap-0.5 text-[0.78rem] font-bold text-orange-500">
                🔥 {cur} {t('days')}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={onEdit}
          className="w-8 h-8 rounded-[7px] flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-all text-sm flex-shrink-0"
          aria-label="Edit habit"
        >
          ✏️
        </button>
      </div>

      {/* Streak footer */}
      <div className="flex gap-5 mt-3 pt-3 border-t border-slate-100 flex-wrap">
        <span className="flex items-center gap-1.5 text-xs text-slate-500">
          🔥 {t('curStreak')}:{' '}
          <strong className="text-slate-800 font-extrabold">{cur}</strong>{' '}
          {t('days')}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-slate-500">
          🏆 {t('longStreak')}:{' '}
          <strong className="text-slate-800 font-extrabold">{best}</strong>{' '}
          {t('days')}
        </span>
      </div>
    </div>
  )
}
