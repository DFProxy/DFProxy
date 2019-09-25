const PacketEvent = require('../structures/packetevent.js')

module.exports = class SetSlot extends PacketEvent {
  constructor (client) {
    super(client, {
      name: 'set_slot'
    })
  }

  async run (meta, data, client, proxyClient, proxy) {
    // Some test stuff
    var notchitem = this.dfproxy.item.fromNotch(data.item)
    console.log(notchitem)
  }
}
