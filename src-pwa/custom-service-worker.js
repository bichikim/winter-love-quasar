/* eslint-disable no-undef */
/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

function service() {
  self.addEventListener('install', (event) => {
    self.skipWaiting()
  })

  self.addEventListener('activate', (event) => {
    return self.clients.claim()
  })

  self.addEventListener('message', (event) => {
    if(event.data && event.data.type === 'SKIP_WAITING') {
      // empty
    }
  })
}

if(workbox) {
  service()
} else {
  console.warn('Service worker is not loaded.')
}

