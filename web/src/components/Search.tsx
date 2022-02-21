type SearchProps = {
  onQueryChange: (newQuery: string) => void
  isInvalid: boolean
}

export default function Search(props: SearchProps) {
  const { onQueryChange, isInvalid } = props

  return (
    <input
      onInput={event => onQueryChange(event.target?.value)}
      type='text'
      placeholder='Search'
      autoComplete='on'
      class={`SearchInput ${isInvalid ? 'Invalid' : ''}`}
    />
  )
}
