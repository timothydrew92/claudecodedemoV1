import { useT } from '../context/LanguageContext'

export default function EmptyState({ onAdd }) {
  const t = useT()

  return (
    <div className="text-center py-16 px-6 text-slate-500">
      <div className="text-6xl mb-3.5 leading-none">✨</div>
      <h3 className="text-xl font-extrabold text-slate-800 mb-2">{t('emptyTitle')}</h3>
      <p className="text-sm mb-5 max-w-[300px] mx-auto leading-relaxed">{t('emptySub')}</p>
      <button
        onClick={onAdd}
        className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent-dark active:scale-[0.97] text-white rounded-lg px-4 py-2 text-[0.88rem] font-bold transition-all shadow-[0_2px_6px_rgba(99,102,241,0.3)]"
      >
        <span className="text-base leading-none">+</span>
        {t('emptyBtn')}
      </button>
    </div>
  )
}
