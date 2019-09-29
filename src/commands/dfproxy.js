const Command = require('../structures/command.js');

module.exports = class DFProxy extends Command {
  constructor (client) {
    super(client, {
      name: 'dfproxy',
      description: 'Shows all the commands.',
      usage: ''
    });
  }

  async run (args, client, proxyClient, proxy) {
    this.chat('Full command list coming soon!');
    this.announce('DEBUG: ' + client.health);
    const item = new this.dfproxy.Item(1, 1);
    proxyClient.write('set_creative_slot', {
      slot: 43,
      item: this.dfproxy.Item.toNotch(item)
    });
    client.write('abilities', {
      flags: 4,
      flyingSpeed: 0.05000000074505806,
      walkingSpeed: 0.10000000149011612
    });
  }
};
