<<<<<<< HEAD
const PacketEvent = require('../structures/packetevent.js')
=======
//
// The server-side CHAT class is a
// packet class that handles in-game
// chat on the server side.
//
const Packet = require('../structures/packet.js');
>>>>>>> 57666f6466cc5b8ba7709fbdf527d0ea30b8f131

module.exports = class Chat extends PacketEvent {
  constructor (client) {
    super(client, {
      name: 'chat'
    });
  }

  async run (meta, data, client, proxyClient, proxy) {

  }
}
