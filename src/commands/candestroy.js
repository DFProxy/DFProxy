const Command = require('../structures/command.js');

module.exports = class CanDestroy extends Command {
  constructor (client) {
    super(client, {
      name: 'candestroy',
      description: 'Adds the canbreak tag to your holding item.',
      usage: ''
    });
  }

  async run (args, client, proxyClient, proxy) {
    // Still W.I.P
    const item = client.inventory.items().find(x => x.slot === 44 - (8 - client.slot));
    console.log(item);
    if (!item) {
      return this.chat('Please hold an item!');
    }
    item.nbt.value.display.value.Name.value = '{"text":"§cHi"}';
    item.nbt.value.CanDestroy = { type: 'list', value: { type: 'string', value: ['minecraft:stone'] } };
    console.log(JSON.stringify(item));
    console.log(item.nbt.value.display.value.Name.value);
    proxyClient.write('set_creative_slot', {
      slot: 44 - (8 - client.slot),
      item: this.dfproxy.Item.toNotch(item)
    });
  }
};
