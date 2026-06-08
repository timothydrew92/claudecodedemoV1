import { createContext, useContext } from 'react'
import { I18N } from '../i18n/translations'

export const LanguageContext = createContext(null)

export function useLang() {
  return useContext(LanguageContext)
}

export function useT() {
  const { lang } = useLang()
  return (key, vars = {}) => {
    let s = (I18N[lang] || I18N.en)[key] ?? I18N.en[key] ?? key
    for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, v)
    return s
  }
}
