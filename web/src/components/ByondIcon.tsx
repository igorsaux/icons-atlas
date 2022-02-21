import '../styles/ByondIcon.scss'
import { pickIcon } from '../api'

type ByondIconProps = {
  id: string
}

export default function ByondIcon(props: ByondIconProps) {
  const iconsByDir = pickIcon(props.id)
  const icons = []

  for (const dir in iconsByDir) {
    icons.push(iconsByDir[dir])
  }

  return (
    <div className='ByondIcon'>
      {icons.map(icon => (
        <img class='Dir' src={`data:image/png;base64,${icon}`} />
      ))}
    </div>
  )
}
