const Packet = require('../structures/packet.js')

module.exports = class Login extends Packet {
  constructor (client) {
    super(client, {
      name: 'login'
    })
  }

  run (meta, data, client, proxyClient, proxy) {
    console.log('hi')
    this.announce('Welcome Back!')
  }
}
