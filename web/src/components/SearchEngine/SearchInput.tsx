import useTranslation from '../../hooks/useTranslation'
import './SearchInput.scss'

type SearchInputProps = {
  onQueryChange: (newQuery: string) => void
  isInvalid: boolean
}

export default function SearchInput(props: SearchInputProps) {
  const _ = useTranslation()
  const { onQueryChange, isInvalid } = props

  return (
    <input
      onInput={event => onQueryChange(event.target?.value)}
      type='text'
      placeholder={_('$SEARCH$')}
      autoComplete='on'
      class={`SearchInput ${isInvalid ? 'Invalid' : ''}`}
    />
  )
}
