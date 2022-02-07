import { useCallback, useState } from 'preact/hooks'
import Loading from './Loading'
import SearchEngine from './SearchEngine'

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const onLoaded = useCallback(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className={`App ${isLoaded ? '' : 'Center'}`}>
      {isLoaded ? <SearchEngine /> : <Loading onLoaded={onLoaded} />}
    </div>
  )
}
