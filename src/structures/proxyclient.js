
const mc = require('minecraft-protocol')

class ProxyClient extends mc.createClient {
  constructor (options) {
    super(options)
  }
}
module.exports = ProxyClient
