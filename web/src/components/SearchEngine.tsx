import Search from './Search'
import { useCallback, useState } from 'preact/hooks'
import QueryResultView from './QueryResultView'
import { makeQuery, QueryResult } from '../api'
import Help from './Help'

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
  const [queryResults, setQueryResults] = useState<QueryResult[]>([])
  const [query, setQuery] = useState('')

  const updateQuery = useCallback(
    (newQuery: string) => {
      setQuery(newQuery)
      setQueryResults(makeQuery(newQuery, 500))
    },
    [query]
  )

  return (
    <div className='SearchEngine'>
      <div className='TopBar'>
        <Search onQueryChange={updateQuery} />
        <Help />
      </div>
      <div class='SearchResults'>
        {queryResults.sort(sortQueryResults).map(result => {
          return <QueryResultView queryResult={result} />
        })}
      </div>
    </div>
  )
}
