import '../styles/App.scss'
import { useCallback, useState } from 'preact/hooks'
import Loading from './Loading'
import SearchEngine from './SearchEngine'
import { LanguageContext } from '../context'
import useCookie from '../hooks/useCookie'
import { getPrefableLanguage } from '../utils'
import useTranslation from '../hooks/useTranslation'

export default function App() {
  const [language, setLanguage] = useCookie('lang', getPrefableLanguage().code)
  const [isLoaded, setIsLoaded] = useState(false)
  const onLoaded = useCallback(() => {
    setIsLoaded(true)
  }, [])

  return (
    <LanguageContext.Provider
      value={{
        code: language,
        setCode: setLanguage
      }}
    >
      <div className={`App ${isLoaded ? '' : 'Center'}`}>
        {isLoaded ? <SearchEngine /> : <Loading onLoaded={onLoaded} />}
      </div>
    </LanguageContext.Provider>
  )
}
