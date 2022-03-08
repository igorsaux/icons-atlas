import '../styles/SearchEntry.scss'
import { QueryResult } from '../api'
import { TARGET_REPOSITORY_MAIN_BRANCH } from '../constants'
import ByondIcon from './ByondIcon'
import useTranslation from '../hooks/useTranslation'
import { GitHubIcon } from './icons'

type SearchEntryProps = {
  queryResult: QueryResult
}

function getUrlToIconOnGithub(iconPath: string) {
  const normalized = iconPath.replaceAll('\\', '/')

  return `${TARGET_REPOSITORY_MAIN_BRANCH}/${normalized}`
}

export default function SearchEntry(props: SearchEntryProps) {
  const $ = useTranslation()
  const { queryResult } = props

  return (
    <div className='SearchEntry'>
      <div className='Content'>
        <a
          title={$('$OPEN_ON_GITHUB$')}
          className='GithubMark'
          target='_blank'
          href={getUrlToIconOnGithub(queryResult.fields.path)}
        >
          <GitHubIcon />
        </a>
        <div className='IconState'>
          <b>{$('$STATE$')}:</b> {queryResult.fields.state}
        </div>
        <div className='IconPath'>
          <b>{$('$PATH$')}:</b> {queryResult.fields.path}
        </div>
      </div>
      <hr />
      <ByondIcon id={queryResult.fields.id} />
    </div>
  )
}
