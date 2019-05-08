import {series, task} from 'gulp'
import shell from 'gulp-shell'
import initVuepress from './gulpfile-init-vuepress'
import postVuepress from './gulpfile-post-vuepress'

const INIT_VUEPRESS = 'init-vuepress'
const POST_VUEPRESS = 'post-vuepress'
const VUEPRESS_RUN_DEV = 'vuepress-run-dev'
const VUEPRESS_RUN_BUILD = 'vuepress-run-dev'
const VUEPRESS_DEV = 'vuepress-dev'
const VUEPRESS_BUILD = 'vuepress-build'

task(INIT_VUEPRESS, initVuepress)
task(POST_VUEPRESS, postVuepress)
task(VUEPRESS_RUN_DEV, shell.task('vuepress dev .vuepress'))
task(VUEPRESS_RUN_BUILD, shell.task('vuepress build .vuepress'))
task(VUEPRESS_DEV, series([INIT_VUEPRESS, VUEPRESS_RUN_DEV]))
task(VUEPRESS_BUILD, series([INIT_VUEPRESS, VUEPRESS_DEV, POST_VUEPRESS]))
