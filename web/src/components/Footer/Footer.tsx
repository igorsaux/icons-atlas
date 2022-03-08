import './Footer.scss'
import { GITHUB_BASE_URL, REPOSITORY_URL } from '@/constants'
import { CommitHash } from '@components'
import { GitHubIcon } from '@icons'

export default function Footer() {
  return (
    <footer>
      <CommitHash url={`${GITHUB_BASE_URL}/last_commit.txt`} />
      <a target='_blank' href={`${REPOSITORY_URL}`}>
        <GitHubIcon />
      </a>
    </footer>
  )
}
