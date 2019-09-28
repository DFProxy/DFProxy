const PacketEvent = require('../structures/packetevent.js')

module.exports = class BlockPlace extends PacketEvent {
  constructor (client) {
    super(client, {
      name: 'block_place'
    })
  }

  run (meta, data, client, proxyClient, proxy) {
    // test stuff
    if (client.gamemode === 1) {
      setTimeout(() => { // Wait before opening
        proxyClient.write('block_place', {
          location: { x: data.location.x - 1, y: data.location.y + 1, z: data.location.z },
          direction: 4,
          hand: data.hand,
          cursorX: data.cursorX,
          cursorY: data.cursorZY,
          cursorZ: data.cursorZ
        })
      }, 100)
    }
  }

  init () {
    console.log('hi')
  }
}
