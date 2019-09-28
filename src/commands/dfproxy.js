const Command = require('../structures/command.js');

module.exports = class CommandDFProxy extends Command {
  constructor (client) {
    super(client, {
      name: 'dfproxy',
      description: 'Shows all the commands.',
      usage: ''
    });
  }

  async run (args, client, proxyClient, proxy) {
    console.log('hi');
    this.chat('Full command list coming soon!');
    this.announce('DEBUG: ' + client.health);
    const item = new this.dfproxy.Item(1, 1);
    proxyClient.write('set_creative_slot', {
      slot: 43,
      item: this.dfproxy.Item.toNotch(item)
    });
  }
};
