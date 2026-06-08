import { useState, useEffect } from 'react'

export default function Toast({ toast, onDismiss }) {
  const [displayed, setDisplayed] = useState(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (toast) {
      setDisplayed(toast)
      requestAnimationFrame(() => requestAnimationFrame(() => setShow(true)))
    } else {
      setShow(false)
      const t = setTimeout(() => setDisplayed(null), 350)
      return () => clearTimeout(t)
    }
  }, [toast])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(onDismiss, 5000)
    return () => clearTimeout(t)
  }, [toast, onDismiss])

  if (!displayed) return null

  return (
    <div
      className={`fixed bottom-6 inset-x-0 flex justify-center z-50 px-4
        pointer-events-none transition-all duration-300 ease-out
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <div className="bg-slate-800 text-white rounded-xl px-4 py-3.5 shadow-2xl max-w-sm w-full flex items-start gap-3 pointer-events-auto">
        <span className="text-xl flex-shrink-0 mt-0.5">✨</span>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-accent-light uppercase tracking-wide mb-1">
            {displayed.habitName}
          </p>
          <p className="text-sm text-slate-200 leading-relaxed">{displayed.message}</p>
        </div>
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          className="flex-shrink-0 text-slate-400 hover:text-white text-xl leading-none transition-colors -mt-0.5"
        >
          ×
        </button>
      </div>
    </div>
  )
}
