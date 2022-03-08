import './Loading.scss'
import { useEffect } from 'preact/hooks'
import { GITHUB_BASE_URL } from '@/constants'
import { useFetch } from '@hooks'
import { load_database, load_icons } from '@/pkg/icons_atlas'
import { useTranslation } from '@hooks'

type LoadingProps = {
  onLoaded: () => void
}

function formatDownloadingMessage(
  whatLoading: string,
  received: number,
  total: number
): string {
  const _ = useTranslation()
  const receivedInKb = received / 1000000
  const totalInKb = total / 1000000
  const inPercents = (received / total) * 100

  return `${_('$LOADING$')} ${whatLoading} ${receivedInKb.toFixed(
    2
  )} MB / ${totalInKb.toFixed(2)} MB (${inPercents.toFixed(0)}%)`
}

export default function Loading(props: LoadingProps) {
  const _ = useTranslation()

  const dbDownloading = useFetch({
    url: `${GITHUB_BASE_URL}/database.bin`,
    onDone: data => {
      load_database(data)
    }
  })
  const iconsDownloading = useFetch({
    url: `${GITHUB_BASE_URL}/icons.bin`,
    onDone: data => {
      load_icons(data)
    }
  })
  let loadingState = ''

  useEffect(() => {
    dbDownloading.start()
  }, [])

  useEffect(() => {
    if (dbDownloading.isDone) {
      iconsDownloading.start()
    }
  }, [dbDownloading.isDone])

  let progress = 0

  if (!dbDownloading.isDone) {
    const { received, total } = dbDownloading
    loadingState = formatDownloadingMessage('"database.bin"', received, total)
    progress = (received / total) * 100
  } else if (!iconsDownloading.isDone) {
    const { received, total } = iconsDownloading
    loadingState = formatDownloadingMessage('"icons.bin"', received, total)
    progress = (received / total) * 100
  } else {
    props.onLoaded()
  }

  return (
    <div className='Loading'>
      <h2>{_('$LOADING_RESOURCES$')}</h2>
      <span>{loadingState}</span>
      <progress max={100} value={progress} />
    </div>
  )
}
