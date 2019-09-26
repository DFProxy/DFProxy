const PacketEvent = require('../structures/packetevent.js')

module.exports = class SetSlot extends PacketEvent {
  constructor (client) {
    super(client, {
      name: 'set_slot'
    })
  }

  async run (meta, data, client, proxyClient, proxy) {
    // Does not work, needs fix!
    client.inventory.updateSlot(data.slot, this.dfproxy.Item.fromNotch(data.item))
    console.log(client.inventory.items())
    console.log('Updated inventory slot')
  }
}
