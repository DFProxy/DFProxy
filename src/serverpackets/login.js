const PacketEvent = require('../structures/packetevent.js');

module.exports = class Login extends PacketEvent {
  constructor (client) {
    super(client, {
      name: 'login'
    });
  }

  async run (meta, data, client, proxyClient, proxy) {
    client.entityId = data.entityId;
    client.gamemode = data.gameMode;
    client.dimension = data.dimension;
    client.difficulty = data.difficulty;
    client.maxPlayers = data.maxPlayers;
    client.levelType = data.levelType;
  }
};
