
const mc = require('minecraft-protocol')

class Client extends mc.createClient {
  constructor (options) {
    super(options)

    this.somethingshere = 'todo?'
  }
}
module.exports = Client
