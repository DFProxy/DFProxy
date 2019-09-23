
const mc = require('minecraft-protocol')

class Proxy extends mc.createServer {
  constructor (options) {
    super(options)
  }
}
module.exports = Proxy
