<<<<<<< HEAD
const PacketEvent = require('../structures/packetevent.js')
=======
//
// The client CHAT class is a packet class
// that handles in-game Minecraft chat routed 
// through the client.
//
const Packet = require('../structures/packet.js');
>>>>>>> 57666f6466cc5b8ba7709fbdf527d0ea30b8f131

module.exports = class Chat extends PacketEvent {
  constructor (client) {
    super(client, {
      name: 'chat'
    });
  }

  run (meta, data, client, proxyClient, proxy) {
    var message = data.message;
    if (message.startsWith('/')) {
      const args = message.split(/\s+/g);
      const command = args.shift().substr(1);
      const cmd = this.dfproxy.commands.get(command);
      if (cmd && cmd.run) {
        this.cancelPacket();
        cmd.run();
      }
    }
  }
}
