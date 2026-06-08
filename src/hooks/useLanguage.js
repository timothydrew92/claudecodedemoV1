import { useState } from 'react'

export function useLanguage() {
  const [lang, setLangState] = useState(
    () => localStorage.getItem('dw_lang') || 'en'
  )

  function setLang(l) {
    setLangState(l)
    localStorage.setItem('dw_lang', l)
  }

  return { lang, setLang }
}
