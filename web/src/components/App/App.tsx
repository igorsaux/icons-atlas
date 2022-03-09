import './App.scss'
import { useRegisterSW } from 'virtual:pwa-register/preact'
import { useCallback, useState } from 'preact/hooks'
import { Loading, SearchEngine } from '@components'
import { LanguageContext } from '@context'
import { useCookie } from '@hooks'
import { getPrefableLanguage } from '@/utils'
import Footer from '../Footer'

export default function App() {
  useRegisterSW()
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
        <Footer />
      </div>
    </LanguageContext.Provider>
  )
}
