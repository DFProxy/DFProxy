
const mc = require('minecraft-protocol')

class Proxy extends mc.createServer {
  constructor (options) {
    super(options)

    this.somethingshere = 'todo?'
  }
}
module.exports = Proxy
