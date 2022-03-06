import Cookies from 'js-cookie'
import { useCallback, useEffect, useState } from 'preact/hooks'

export default function useCookie(
  name: string,
  defaultValue: string
): [string, (value: string) => void] {
  const [cookieValue, setCookieValue] = useState(defaultValue)

  const setCookie = useCallback((value: string) => {
    Cookies.set(name, value)
    setCookieValue(value)
  }, [])

  useEffect(() => {
    const initial = Cookies.get(name)

    if (initial) {
      setCookieValue(initial)
    } else {
      Cookies.set(name, defaultValue)
    }
  }, [])

  return [cookieValue, setCookie]
}
