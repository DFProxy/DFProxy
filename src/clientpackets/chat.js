//
// The CHAT class is a packet class
// that handles in-game Minecraft
// chat.
//
const Packet = require('../structures/packet.js')

module.exports = class Chat extends Packet {
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
