const simpleGit = require('simple-git/promise')(process.cwd())
const pkg = require('../package.json')

async function versionUp() {
  const {version} = pkg
  await simpleGit.addTag(`v${version}`)
  // try{
  //   await simpleGit.pushTags('origin')
  // }catch(e){
  //   await simpleGit.tag(['-d', `v${version}`])
  //   throw e
  // }

  return simpleGit.tags()
}

versionUp().then((m) => {
  console.log(m)
})
