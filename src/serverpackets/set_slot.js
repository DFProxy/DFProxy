const PacketEvent = require('../structures/packetevent.js')

module.exports = class SetSlot extends PacketEvent {
  constructor (client) {
    super(client, {
      name: 'set_slot'
    })
  }

  async run (meta, data, client, proxyClient, proxy) {
    client.inventory.updateSlot(data.slot, this.dfproxy.Item.fromNotch(data.item))
    // Update Inventory
  }
}
