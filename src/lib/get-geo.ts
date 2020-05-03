export const getGeo = (): Promise<Position> => {
  if(!navigator.geolocation) {
    return Promise.reject('cannot use geolocation')
  }
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position)
      },
      (error) => {
        reject(error)
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5,
        timeout: 30,
      }
    )
  })
}

export default getGeo
