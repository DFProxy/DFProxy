const PacketEvent = require('../structures/packetevent.js')

module.exports = class Login extends PacketEvent {
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
