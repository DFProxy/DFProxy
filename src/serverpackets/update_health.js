const PacketEvent = require('../structures/packetevent.js')

module.exports = class UpdateHealth extends PacketEvent {
  constructor (client) {
    super(client, {
      name: 'update_health'
    })
  }

  async run (meta, data, client, proxyClient, proxy) {
    client.health = data.health
    client.food = data.food
    client.foodSaturation = data.foodSaturation
  }
}
