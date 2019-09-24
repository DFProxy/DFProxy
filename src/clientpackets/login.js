<<<<<<< HEAD
const PacketEvent = require('../structures/packetevent.js')
=======
//
// The LOGIN class is a packet class
// that handles the event when a player
// logs in to DiamondFire.
//
const Packet = require('../structures/packet.js');
>>>>>>> 57666f6466cc5b8ba7709fbdf527d0ea30b8f131

module.exports = class Login extends PacketEvent {
  constructor (client) {
    super(client, {
      name: 'login'
    });
  }

  run (meta, data, client, proxyClient, proxy) {
    console.log('hi');
    this.announce('Welcome Back!');
  }
}
