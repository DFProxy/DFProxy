const Command = require('../structures/Command.js')

module.exports = class DFProxy extends Command {
  constructor (client) {
    super(client, {
      name: 'dfproxy',
      description: 'Shows all the commands.',
      usage: ''
    })
  }

  async run (args, client, proxyClient, proxy) {
    this.chat('HII')
  }
}
