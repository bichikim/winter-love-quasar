import Cookie from 'cookie'
import {ClientRequest, ServerResponse} from 'http'

export function filterPrivate(target, privatePreFix = '__') {
  return Object.keys(target).reduce((result, key) => {
    if(!key.startsWith(privatePreFix)) {
      result[key] = target[key]
    }
    return result
  }, {})
}

export function getStorageName(key: string, namespace: string) {
  return `${key}/${namespace}`
}

export function saveLocal(key: string, namespace: string, data: Record<string, any>) {
  localStorage.setItem(getStorageName(key, namespace), JSON.stringify(data))
}

export function getLocal(key: string, namespace: string) {
  return forceDefault(() => {
    const rowData = localStorage.getItem(getStorageName(key, namespace))
    if(rowData) {
      return JSON.parse(rowData)
    }
  }, {})
}

export function saveSession(key: string, namespace: string, data: Record<string, any>) {
  sessionStorage.setItem(getStorageName(key, namespace), JSON.stringify(data))
}

export function getCookie(key: string, namespace: string) {
  return forceDefault(() => {
    JSON.parse(Cookie.parse(document.cookie)[getStorageName(key, namespace)])
  }, {})
}

export function saveCookie(
  key: string,
  namespace: string,
  data: Record<string, any>,
  options: any
) {
  document.cookie = Cookie.serialize(getStorageName(key, namespace), JSON.stringify(data), options)
}

export function getServerCookie(req: ClientRequest, key: string, namespace: string) {
  const rawCookie = req.getHeader('cookie')
  if(rawCookie) {
    return forceDefault(
      () => JSON.parse(Cookie.parse(rawCookie)[getStorageName(key, namespace)]),
      {}
    )
  }
}

export function saveServerCookie(
  res: ServerResponse,
  key: string,
  namespace: string,
  data: Record<string, any>,
  options
) {
  res.setHeader(
    'Set-Cookie',
    Cookie.serialize(getStorageName(key, namespace), JSON.stringify(data), options)
  )
}

/**
 * Whether running the client environment
 */
export function isClient() {
  return typeof window === 'object'
}

export function getSession(key: string, namespace: string) {
  return forceDefault(() => {
    const rowData = sessionStorage.getItem(getStorageName(key, namespace))
    if(rowData) {
      return JSON.parse(rowData)
    }
  }, {})
}

export function forceDefault(runner: Function, defaultValue: any) {
  try {
    const result = runner()
    if(result) {
      return result
    }
  } catch(e) {
    // skip
  }
  return defaultValue
}
