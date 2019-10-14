const PacketEvent = require('../structures/packetevent.js');

//
// The server-side CHAT class is a
// packet class that handles in-game
// chat on the server side.
//

module.exports = class Chat extends PacketEvent {
  constructor (client) {
    super(client, {
      name: 'chat'
    });
  }

  async run (meta, data, client, proxyClient, proxy) {
    var fullmessage = JSON.parse(data.message.toString());
    if (!fullmessage.extra) return;
    var message = '';
    var messageNorm = '';
    for (var i in fullmessage.extra) {
      if (fullmessage.extra[i].text) {
        messageNorm = message + fullmessage.extra[i].text;
        message = message + fullmessage.extra[i].text.toLowerCase();
      }
    }
    if (message.startsWith('dfproxy')) {
      const args = message.split('|');
      args.shift();
      const command = args.shift();
      const customAction = this.dfproxy.customActions.get(command);
      if (customAction && customAction.run) {
        this.cancelPacket();
        customAction.run(args, client, proxyClient, proxy);
      }
    }
    
    if (messageNorm.includes(`${proxyClient.username}`) && (!message.includes(`${proxyClient.username}:`))) {
      client.write('sound_effect', {
        soundId: 163,
        soundCategory: 0,
        x: Math.round(client.position.x),
        y: Math.round(client.position.y),
        z: Math.round(client.position.z),
        volume: 5.0,
        pitch: 1.0
       });
       client.write('chat', { message: `{"extra":[{"text":"§7[§6DF§bproxy§7] §a§lYou got a mention below ${Math.round(client.position.x)}"}],"text":""}`, position: 1 });
      }
    }
    
};
