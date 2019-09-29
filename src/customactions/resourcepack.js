const CustomAction = require('../structures/customaction.js');

module.exports = class RESOURCEPACK extends CustomAction {
  constructor (client) {
    super(client, {
      name: 'resourcepack',
      description: 'Sends custom resource pack.',
      usage: ''
    });
  }

  async run (args, client, proxyClient, proxy) {
    client.write('resource_pack_send', { url: args[0], hash: 'null' });
    this.chat('§aA custom resource pack was loaded using DFProxy custom action.');
  }
};
