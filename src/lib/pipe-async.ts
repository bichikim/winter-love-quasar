type MayAsync = (...args: any[]) => any | PromiseLike<any>

export const pipeAsync = <ARGS extends Array<any>>(...functions: MayAsync[]) => (...args: any[]) =>
  functions.reduce((promise, func: MayAsync) => promise.then(func), Promise.resolve(args))

export default pipeAsync
