const ASSET_PATH = process.env.ASSET_PATH || '/'
module.exports = {
  themeConfig: {
    nav: [
      {text: 'Components', link: 'please change this url for vue-styleguidist'},
    ],
  },
  base: ASSET_PATH,
}
