const PacketEvent = require('../structures/packetevent.js');

//
// The server-side CHAT class is a
// packet class that handles in-game
// chat on the server side.
//

module.exports = class Chat extends PacketEvent {
  constructor (client) {
    super(client, {
      name: 'chat'
    });
  }

  async run (meta, data, client, proxyClient, proxy) {
    var fullmessage = JSON.parse(data.message.toString());
    if (!fullmessage.extra) return;
    var message = '';
    for (var i in fullmessage.extra) {
      if (fullmessage.extra[i].text) {
        message = message + fullmessage.extra[i].text.toLowerCase();
      }
    }
    if (message.startsWith('dfproxy')) {
      const args = message.split('|');
      args.shift();
      const command = args.shift();
      const customAction = this.dfproxy.customActions.get(command);
      if (customAction && customAction.run) {
        this.cancelPacket();
        customAction.run(args, client, proxyClient, proxy);
      }
    }
  }
};
