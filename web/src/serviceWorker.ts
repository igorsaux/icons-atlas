import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'

function getUrlExtension(url: string) {
  return url.split(/[#?]/)[0].split('.').pop()!.trim()
}

declare let self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST)

cleanupOutdatedCaches()

registerRoute(
  ({ url }) =>
    getUrlExtension(url.pathname) === 'bin' ||
    getUrlExtension(url.pathname) === 'txt',
  new StaleWhileRevalidate()
)

clientsClaim()
