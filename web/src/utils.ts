import { LANGUAGES } from './constants'

export function getPrefableLanguage() {
  let clientLanguages = navigator.languages || [navigator.language]

  for (const language of clientLanguages) {
    const code = language.split('-')[0]
    const targetLanguage = LANGUAGES.find(lang => lang.code === code)

    if (targetLanguage) {
      return targetLanguage
    }
  }

  return LANGUAGES[0]
}
