import './SearchEngine.scss'
import SearchInput from './SearchInput'
import { useCallback, useState } from 'preact/hooks'
import SearchEntry from './SearchEntry'
import { makeQuery, QueryResult } from '../../api'
import Help from '../Help'
import LanguageSelector from '../LanguageSelector'

function sortQueryResults(a: QueryResult, b: QueryResult) {
  if (a.score > b.score) {
    return -1
  } else if (a.score === b.score) {
    return 0
  } else {
    return 1
  }
}

export default function SearchEngine() {
  const [isQueryInvalid, setIsQueryInvalid] = useState(false)
  const [queryResults, setQueryResults] = useState<QueryResult[]>([])
  const [query, setQuery] = useState('')

  const updateQuery = useCallback(
    (newQuery: string) => {
      setQuery(newQuery)

      try {
        setQueryResults(makeQuery(newQuery, 500))
        setIsQueryInvalid(false)
      } catch (error) {
        setIsQueryInvalid(true)
      }
    },
    [query]
  )

  return (
    <div className='SearchEngine'>
      <div className='TopBar'>
        <LanguageSelector />
        <SearchInput onQueryChange={updateQuery} isInvalid={isQueryInvalid} />
        <Help />
      </div>
      <div class='SearchResults'>
        {queryResults.sort(sortQueryResults).map(result => {
          return <SearchEntry queryResult={result} />
        })}
      </div>
    </div>
  )
}