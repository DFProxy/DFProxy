const PacketEvent = require('../structures/packetevent.js');

module.exports = class HeldItemSlot extends PacketEvent {
  constructor (client) {
    super(client, {
      name: 'held_item_slot'
    });
  }

  async run (meta, data, client, proxyClient, proxy) {
    client.slot = data.slot;
  }
};
