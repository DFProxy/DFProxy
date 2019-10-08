const CustomAction = require('../structures/customaction.js');

module.exports = class SENDTOPLOT extends CustomAction {
  constructor (client) {
    super(client, {
      name: 'sendtoplot',
      description: 'Sends player to another plot',
      usage: ''
    });
  }

  async run (args, client, proxyClient, proxy) {
    proxyClient.sendCommand("leave");
    setTimeout(() => {
      proxyClient.sendCommand(`join ${args[0]}`)
    }, 3000)
    this.chat('§aYou were sent to another plot using a DFProxy custom action.');
  }
};
