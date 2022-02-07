import { useCallback, useState } from 'preact/hooks'

type UseFetchParams = {
  url: string
  onDone: (data: Uint8Array) => void
}

export default function useFetch(params: UseFetchParams) {
  const { url, onDone } = params
  const [reader, setReader] =
    useState<ReadableStreamDefaultReader<Uint8Array>>()
  const [isDone, setIsDone] = useState(false)
  const [received, setReceived] = useState(0)
  const [total, setTotal] = useState(0)
  const [chunks, setChunks] = useState<Uint8Array[]>([])

  const start = useCallback(() => {
    fetch(url).then(response => {
      setTotal(parseInt(response.headers.get('Content-Length') || '0'))
      setReader(response.body?.getReader())
    })
  }, [])

  if (reader) {
    reader.read().then(data => {
      const { done, value } = data

      if (done) {
        const mergedChunks = new Uint8Array(total)
        let position = 0

        for (const chunk of chunks) {
          mergedChunks.set(chunk, position)
          position += chunk.length
        }

        onDone(mergedChunks)
        setReader(undefined)
        setIsDone(true)

        return
      }

      if (value === undefined) {
        return
      }

      if (chunks === undefined) {
        setChunks([value])
      } else {
        setChunks([...chunks, value])
      }

      setReceived(received + value.length)
    })
  }

  return {
    total,
    received,
    isDone,
    start
  }
}
