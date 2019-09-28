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

  }
};
