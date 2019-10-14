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
    this.execute('leave');
    if (args[1] && args[1] === "beta") this.execute('server beta');
    await new Promise(resolve => {
      setTimeout(() => {
        resolve(this.execute(`join ${args[0]}`));
      }, 3000);
    }).then(() => { this.chat('§aYou were sent to another plot using a DFProxy custom action.'); });
  }
};
