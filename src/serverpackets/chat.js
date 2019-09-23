const Packet = require('../structures/packet.js')

module.exports = class Chat extends Packet {
  constructor (client) {
    super(client, {
      name: 'chat'
    })
  }

  async run (meta, data, client, proxyClient, proxy) {

  }
}
