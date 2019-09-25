const PacketEvent = require('../structures/packetevent.js')

module.exports = class Respawn extends PacketEvent {
  constructor (client) {
    super(client, {
      name: 'respawn'
    })
  }

  async run (meta, data, client, proxyClient, proxy) {
    client.dimension = data.dimension
    client.difficulty = data.difficulty
    client.gamemode = data.gamemode
  }
}
