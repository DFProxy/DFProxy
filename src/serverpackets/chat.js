const PacketEvent = require('../structures/packetevent.js')

module.exports = class Chat extends PacketEvent {
  constructor (client) {
    super(client, {
      name: 'chat'
    })
  }

  async run (meta, data, client, proxyClient, proxy) {

  }
}
