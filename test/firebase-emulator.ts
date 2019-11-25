import spawn from 'cross-spawn'
import * as childProcess from 'child_process'
import kill from 'tree-kill'

let _firestore: boolean = false
let _database: boolean = false

export default class FirebaseEmulator {

  private _child: childProcess.ChildProcess | null

  get isFinishLoad() {
    return _firestore && _database
  }

  start(): Promise<void> {

    // waiting child
    if(this.isFinishLoad) {
      return Promise.resolve()
    } else if(_firestore || _database) {
      return new Promise((resolve, reject) => {
        let count = 0
        const interval = setInterval(() => {
          if(_firestore && _database) {
            clearInterval(interval)
            resolve()
          }
          if(count > 10) {
            clearInterval(interval)
            reject()
          }
          count +=1
        }, 500)
      })
    }

    this._child = spawn('firebase', ['serve', '--only', 'firestore,database'])

    const {_child} = this
    const {stdout} = _child

    if(!stdout) {
      _child.kill()
      return Promise.reject()
    }
    return new Promise((resolve, reject) => {
      stdout.on('data', (data?: Buffer) => {
        if(!data) {
          return
        }
        const message = data.toString()
        if(/\+\s\sdatabase/.test(message)) {
          _database = true
        } else if(/\+\s\sfirestore/.test(message)) {
          _firestore = true
        }
        if(_firestore && _database) {
          resolve()
        }
      })
      _child.on('error', () => {
        reject()
      })
    })
  }

  stop() {
    const {_child} = this
    _firestore = false
    _database = false
    if(!_child) {
      return Promise.resolve()
    }
    return new Promise((resolve) => {
      _child.on('exit', () => {
        this._child = null
        resolve()
      })
      kill(_child.pid)
    })
  }
}


