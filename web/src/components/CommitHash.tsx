import { useEffect, useState } from 'preact/hooks'
import { TARGET_REPOSITORY_COMMIT } from '../constants'
import useTranslation from '../hooks/useTranslation'

type CommitHashProps = {
  url: string
}

export default function CommitHash(props: CommitHashProps) {
  const [hash, setHash] = useState('')
  const $ = useTranslation()

  useEffect(() => {
    fetch(props.url)
      .then(response => response.text())
      .then(commit => setHash(commit))
  }, [])

  return (
    <span className='CommitHash'>
      {$('$LAST_COMMIT_HASH$')}{' '}
      <a target='_blank' href={`${TARGET_REPOSITORY_COMMIT}/${hash}`}>
        {hash.substring(0, 7)}
      </a>
    </span>
  )
}
