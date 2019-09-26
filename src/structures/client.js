
const mc = require('minecraft-protocol')

class Client extends mc.createClient {
  constructor (options) {
    super(options)

    Object.defineProperty(this, 'inventory', { value: new options.dfproxy.windows.InventoryWindow(0, 'Inventory', 44) }) // BROKEN

    Object.defineProperty(this, 'health', { value: undefined })
    Object.defineProperty(this, 'food', { value: undefined })
    Object.defineProperty(this, 'foodSaturation', { value: undefined })
    Object.defineProperty(this, 'entityId', { value: undefined })
    Object.defineProperty(this, 'gamemode', { value: undefined })
    Object.defineProperty(this, 'dimension', { value: undefined })
    Object.defineProperty(this, 'difficulty', { value: undefined })
    Object.defineProperty(this, 'maxPlayers', { value: undefined })
    Object.defineProperty(this, 'levelType', { value: undefined })
    Object.defineProperty(this, 'heldItemSlot', { value: undefined })
  }
}
module.exports = Client
