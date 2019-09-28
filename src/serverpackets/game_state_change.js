const PacketEvent = require('../structures/packetevent.js');

module.exports = class GameStateChange extends PacketEvent {
  constructor (client) {
    super(client, {
      name: 'game_state_change'
    });
  }

  async run (meta, data, client, proxyClient, proxy) {
    client.gamemode = data.gameMode;
  }
};
