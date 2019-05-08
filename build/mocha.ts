import * as globby from 'globby'
import Mocha, {MochaOptions} from 'mocha'
import {join} from 'path'

interface MochaWatchOptions extends MochaOptions {
  cwd?: string
  exclude?: string[]
  include?: string[]
}

export default class MochaWatch {
  readonly testFiles: string[]
  private _mocha: Mocha
  private _options: MochaWatchOptions

  constructor(options: MochaWatchOptions = {}) {
    const {cwd = process.cwd(), exclude = [], include = []} = options
    this.testFiles = globby
      .sync([...include, ...exclude.map((value) => `!${value}`)], {
        cwd,
        ignore: ['node_modules'],
      })
      .map((path: string) => join(cwd, path))
    this._mocha = new Mocha(this._options)
    this._mocha.files = this.testFiles
  }

  rerun(): void {
    this._clean()
    this._mocha.run()
  }

  /**
   * Clean to rerun mocha test
   */
  private _clean() {
    this._mocha.suite.suites = []
    this._mocha.files.forEach((file: string) => {
      delete require.cache[require.resolve(file)]
    })
  }
}
