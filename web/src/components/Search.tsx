import { StateUpdater } from 'preact/hooks'

type SearchProps = {
  onQueryChange: (newQuery: string) => void
}

export default function Search(props: SearchProps) {
  const { onQueryChange } = props

  return (
    <input
      onInput={event => onQueryChange(event.target?.value)}
      type='text'
      placeholder='Search'
      autoComplete='on'
      class='SearchInput'
    />
  )
}
