/* tslint:disable:no-require-imports */
const fs = require('fs-extra')
const {resolve} = require('path')
const vuepressConfigPath = 'build/vuepress.config.js'
const distPath = '.vuepress'
const buildConfigPath = `${distPath}/config.js`
const buildReadmePath = `${distPath}/README.md`

const readmePath = 'README.md'
// const buildReadmePath = '.vuepress/README.md'
const work = async () => {
  if(!fs.existsSync(resolve(vuepressConfigPath))){
    console.warn('no vuepress config')
    return
  }
  if(!fs.existsSync(resolve(readmePath))){
    console.warn('no README.md file')
    return
  }
  await fs.ensureDir(resolve(distPath))
  await fs.copyFile(resolve(readmePath), resolve(buildReadmePath))
  return fs.copyFile(resolve(vuepressConfigPath), resolve(buildConfigPath))
}

work().then(() => {
  console.log('Copied config file')
})
