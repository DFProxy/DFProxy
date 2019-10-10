
const PacketEvent = require('../structures/packetevent.js');

//
// The LOGIN class is a packet class
// that handles the event when a player
// logs in to DiamondFire.
//

module.exports = class Login extends PacketEvent {
  constructor (client) {
    super(client, {
      name: 'login'
    });
  }

  run (meta, data, client, proxyClient, proxy) {
    client.write('title', { action: 0, text: '{"extra":[{"color":"gray","text":"["},{"color":"green","text":"DFProxy"},{"color":"gray","text":"]"}],"text":""}' });
    client.write('title', { action: 1, text: '{"extra":[{"color":"aqua","text":"Your connection is tunneled!"}],"text":""}' });
  }
};
