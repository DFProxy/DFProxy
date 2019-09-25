
const mc = require('minecraft-protocol')

class Client extends mc.createClient {
  constructor (options) {
    super(options)
    Object.defineProperty(this, 'health', { value: undefined })
    Object.defineProperty(this, 'food', { value: undefined })
    Object.defineProperty(this, 'foodSaturation', { value: undefined })
    Object.defineProperty(this, 'entityId', { value: undefined })
    Object.defineProperty(this, 'gamemode', { value: undefined })
    Object.defineProperty(this, 'dimension', { value: undefined })
    Object.defineProperty(this, 'difficulty', { value: undefined })
    Object.defineProperty(this, 'maxPlayers', { value: undefined })
    Object.defineProperty(this, 'levelType', { value: undefined })
  }
}
module.exports = Client
