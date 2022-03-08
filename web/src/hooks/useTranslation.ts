import { useCallback, useContext } from 'preact/hooks'
import { LanguageContext } from '../context'
import TRANSLATION from '../translation'

export default function useTranslation() {
  const { code } = useContext(LanguageContext)

  const $ = useCallback(
    (localizationString: string) => {
      return TRANSLATION[code][localizationString] || localizationString
    },
    [code]
  )

  return $
}
