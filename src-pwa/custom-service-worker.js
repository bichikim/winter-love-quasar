/* eslint-disable no-undef */
/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

workbox.core.skipWaiting()

workbox.core.clientsClaim()

workbox.core.setCacheNameDetails({prefix: 'winter-love'})

self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})


workbox.routing.registerRoute(/^http/, new workbox.strategies.NetworkFirst(), 'GET')

