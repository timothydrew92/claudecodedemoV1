import { useLang, useT } from '../context/LanguageContext'
import { streaks, today } from '../utils/streaks'
import StatCard from './StatCard'

const LOCALE_MAP = { en: 'en-US', es: 'es', fr: 'fr-FR', ja: 'ja-JP' }

export default function Dashboard({ habits }) {
  const t        = useT()
  const { lang } = useLang()

  const td    = today()
  const total = habits.length
  const done  = habits.filter(h => (h.dates || []).includes(td)).length
  const left  = total - done
  const pct   = total === 0 ? 0 : Math.round((done / total) * 100)
  const best  = habits.reduce((mx, h) => Math.max(mx, streaks(h.dates || []).best), 0)
  const full  = pct === 100 && total > 0

  const dateStr = (() => {
    const opts   = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const locale = LOCALE_MAP[lang] || 'en-US'
    try { return new Date().toLocaleDateString(locale, opts) }
    catch { return new Date().toLocaleDateString('en-US', opts) }
  })()

  return (
    <div className="mb-8">
      <p className="text-sm text-slate-500 font-medium mb-3.5">{dateStr}</p>

      <p className="text-[0.7rem] font-bold uppercase tracking-[0.08em] text-slate-400 mb-3">
        {t('todayOverview')}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3.5">
        <StatCard value={done}  label={t('completed')} />
        <StatCard value={left}  label={t('remaining')} />
        <StatCard value={total} label={t('totalHabits')} />
        <StatCard value={best}  label={t('bestStreak')} />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex justify-between items-center mb-2.5">
          <span className="font-bold text-[0.95rem]">{t('dailyProgress')}</span>
          <span className="text-lg font-extrabold text-accent tracking-tight">{pct}%</span>
        </div>

        <div className="bg-slate-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="h-full rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              width: `${pct}%`,
              background: full
                ? 'linear-gradient(90deg, #22c55e 0%, #4ade80 100%)'
                : 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)',
            }}
          />
        </div>

        <p className="text-xs text-slate-500 mt-2">
          {t('progressSub', { done, total })}
        </p>
      </div>
    </div>
  )
}
