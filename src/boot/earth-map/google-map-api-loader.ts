import Google from './type'

let googleApi: Google | null = null

export const googleApiCallback = '__GoogleApiCallback__'

export function createErrorMessage(where: string,message: string) {
  return `google-map-api-loader.${where}: ${message}`
}

export function createGoogleMapsApiSrc(key: string, callback: string) {
  return `https://maps.googleapis.com/maps/api/js?key=${key}&callback=${callback}`
}

export function loadGoogleMapsApi(src: string) {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = src

  const head = document.querySelector('head')
  if(!head) {
    throw new Error(createErrorMessage('loadGoogleMapsApi', 'Document has no head'))
  }
  head.appendChild(script)
}

export function load(key, waitTime: number = 5000):
  Google | Promise<Google> {
  if(googleApi) {
    return Promise.resolve(googleApi)
  }

  return new Promise((resolve, reject) => {
    window[googleApiCallback] = function () {
      googleApi = window.google
      resolve(googleApi)
    }
    loadGoogleMapsApi(
      createGoogleMapsApiSrc(key, googleApiCallback),
    )

    setTimeout(() => {
      if(!window.google) {
        reject(new Error(
          createErrorMessage('load', 'cannot load google-map-api'),
        ))
      }
    }, waitTime)
  })
}
