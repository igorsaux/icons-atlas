import { pickIcon } from '../api'

type QueryIconViewProps = {
  id: string
}

export default function QueryIconView(props: QueryIconViewProps) {
  const iconsByDir = pickIcon(props.id)
  const icons = []

  for (const dir in iconsByDir) {
    icons.push(iconsByDir[dir])
  }

  return (
    <div className='Icons'>
      {icons.map(icon => (
        <img class='Icon' src={`data:image/png;base64,${icon}`} />
      ))}
    </div>
  )
}
