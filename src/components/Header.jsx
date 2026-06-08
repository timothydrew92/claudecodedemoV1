import { useLang } from '../context/LanguageContext'

const LANGS = ['en', 'es', 'fr', 'ja']

export default function Header() {
  const { lang, setLang } = useLang()

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-[840px] mx-auto px-5 h-[62px] flex items-center justify-between gap-3 sm:px-3.5">
        <div className="flex items-center gap-2 font-extrabold text-lg text-accent select-none tracking-tight">
          <span className="text-xl">🏆</span>
          Daily Wins
        </div>

        <div
          className="flex gap-0.5 bg-slate-100 border border-slate-200 rounded-[9px] p-0.5"
          role="group"
          aria-label="Language"
        >
          {LANGS.map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2.5 py-1 rounded-[6px] text-[0.78rem] font-semibold transition-all tracking-wide
                ${lang === l
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-slate-500 hover:bg-slate-200 hover:text-slate-800'
                }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
