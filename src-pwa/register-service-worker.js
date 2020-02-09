import {register} from 'register-service-worker'

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration:
// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

register(process.env.SERVICE_WORKER_FILE, {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  // registrationOptions: { scope: './' },

  ready() {
    if(process.env.DEV) {
      // eslint-disable-next-line no-console
      console.log('App is being served from cache by a service worker.')
    }
  },

  registered(registration) {
    if(process.env.DEV) {
      // eslint-disable-next-line no-console
      console.log('Service worker has been registered.')
    }
    document.dispatchEvent(new CustomEvent('updatefound', {detail: registration}))
  },

  cached(registration) {
    if(process.env.DEV) {
      // eslint-disable-next-line no-console
      console.log('Content has been cached for offline use.')
    }
    document.dispatchEvent(new CustomEvent('cached', {detail: registration}))
  },

  updatefound(registration) {
    if(process.env.DEV) {
      // eslint-disable-next-line no-console
      console.log('New content is downloading.')
    }
    document.dispatchEvent(new CustomEvent('updatefound', {detail: registration}))
  },

  updated(registration) {
    if(process.env.DEV) {
      // eslint-disable-next-line no-console
      console.log('New content is available; please refresh.')
    }
    document.dispatchEvent(new CustomEvent('updated', {detail: registration}))
  },

  offline() {
    if(process.env.DEV) {
      // eslint-disable-next-line no-console
      console.log('No internet connection found. App is running in offline mode.')
    }
    document.dispatchEvent(new CustomEvent('offline', {detail: null}))
  },

  error(err) {
    if(process.env.DEV) {
      console.error('Error during service worker registration:', err)
    }
    document.dispatchEvent(new CustomEvent('error', {detail: err}))
  },
})
