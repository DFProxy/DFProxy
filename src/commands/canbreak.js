const Command = require('../structures/command.js');

module.exports = class CanBreak extends Command {
  constructor (client) {
    super(client, {
      name: 'canbreak',
      description: 'Adds the canbreak tag to your holding item.',
      usage: ''
    });
  }

  async run (args, client, proxyClient, proxy) {
    const item = client.inventory.items().find(x => x.slot === 44 - (8 - client.slot));
    item.nbt.value.display.value.Name.value = '{"text":"§cHi"}';
    console.log(JSON.stringify(item));
    console.log(item.nbt.value.display.value.Name.value);
    proxyClient.write('set_creative_slot', {
      slot: 44 - (8 - client.slot),
      item: this.dfproxy.Item.toNotch(item)
    });
  }
};
