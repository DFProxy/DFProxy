
const mc = require('minecraft-protocol')

class Client extends mc.createClient {
  constructor (options) {
    super(options)
  }
}
module.exports = Client
