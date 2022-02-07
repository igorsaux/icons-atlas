import Search from './Search'
import { useCallback, useState } from 'preact/hooks'
import QueryResultView from './QueryResultView'
import { makeQuery, QueryResult } from '../api'

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
      <Search onQueryChange={updateQuery} />
      <ul class='SearchResults'>
        {queryResults.sort(sortQueryResults).map(result => {
          return (
            <li class='SearchEntry'>
              <QueryResultView queryResult={result} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
