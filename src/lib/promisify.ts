export const promisify = (func) => (...args: any[]) => {
  return new Promise((resolve, reject) => {
    func(...args, (error, result) => (error ? reject(error) : resolve(result)))
  })
}


export default promisify
