import fs from 'fs-extra'
import globby from 'globby'
import {resolve} from 'path'

const distPath = '.vuepress'
const buildPath = '.vuepress/.vuepress'
export default async () => {
  if(!fs.existsSync(resolve(buildPath))){
    console.warn('no vuepress')
    return
  }
  // if(fs.existsSync(resolve(distPath))){
  //   await fs.remove(resolve(distPath))
  // }
  // await fs.mkdir(distPath)
  const files = await globby(`./${buildPath}/**/*`, {})
  const toFiles = files.map((path) => {
    return distPath + path.replace(/^\.\/\.vuepress\/\.vuepress\/dist/, '')
  })

  let wait: Array<Promise<any>> = []

  toFiles.forEach((path) => {
    wait.push(fs.ensureFile(resolve(path)))
  })

  await Promise.all(wait)
  wait = []

  files.forEach((path, index) => {
    wait.push(fs.copyFile(resolve(path), resolve(toFiles[index])))
  })
  await Promise.all(wait)

  return fs.remove(buildPath)
}
