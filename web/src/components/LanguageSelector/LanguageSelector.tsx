import './LanguageSelector.scss'
import Tippy from '@tippyjs/react'
import { LANGUAGES } from '@/constants'
import { FlagIcon } from '@icons'
import { useTranslation } from '@hooks'
import { useContext } from 'preact/hooks'
import { LanguageContext } from '@context'

function LanguagesMenu() {
  const { setCode } = useContext(LanguageContext)

  return (
    <ul className='Languages'>
      {LANGUAGES.map(lang => (
        <li className='Language' onClick={() => setCode(lang.code)}>
          <FlagIcon country={lang.country} /> <span>{lang.display}</span>
        </li>
      ))}
    </ul>
  )
}

export default function LanguageSelector() {
  const { code } = useContext(LanguageContext)
  const countryFlag =
    LANGUAGES.find(language => language.code === code)?.country || 'us'

  return (
    <Tippy
      content={<LanguagesMenu />}
      interactive={true}
      interactiveBorder={20}
      theme='dark'
      animation='scale'
    >
      <FlagIcon class='LanguageSelector' country={countryFlag} />
    </Tippy>
  )
}
