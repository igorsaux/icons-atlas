import { useCallback, useContext } from 'preact/hooks'
import { LanguageContext } from '../context'
import translation from '../translation.json'

export default function useTranslation() {
  const { code } = useContext(LanguageContext)

  const $ = useCallback(
    (localizationString: string) => {
      return translation[code][localizationString] || localizationString
    },
    [code]
  )

  return $
}
