import { createContext } from 'preact'
import { LANGUAGES } from '../constants'

const LanguageContext = createContext({
  code: LANGUAGES[0].code,
  setCode: (newCode: string) => {}
})

export default LanguageContext
