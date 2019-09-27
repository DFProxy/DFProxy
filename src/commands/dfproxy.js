const Command = require('../structures/Command.js')

module.exports = class CommandDFProxy extends Command {
  constructor (client) {
    super(client, {
      name: 'dfproxy',
      description: 'Shows all the commands.',
      usage: ''
    })
  }

  async run (args, client, proxyClient, proxy) {
    this.chat('HII')
    this.announce('Welcome Back! ' + client.health)
    const item = new this.dfproxy.Item(1, 1)
    proxyClient.write('set_creative_slot', {
      slot: 43,
      item: this.dfproxy.Item.toNotch(item)
    })
  }
}
