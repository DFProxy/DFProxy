const Command = require('../structures/command.js');

module.exports = class DFProxy extends Command {
  constructor (client) {
    super(client, {
      name: 'reload',
      description: 'Reload commands & clientpackets & serverpackets.',
      usage: ''
    });
  }

  async run (args, client, proxyClient, proxy) {
    // W.I.P, reload only loads new files. Old code wont be updated :(
    this.announce('Reloading...');
    this.dfproxy.commands.clear();
    this.dfproxy.serverPacketEvents.clear();
    this.dfproxy.serverPacketEvents.clear();
    this.dfproxy.loadCommands('../commands/', () => {
      this.dfproxy.loadServerPacketsEvents('../serverpackets/', () => {
        this.dfproxy.loadClientPacketsEvents('../clientpackets/', () => {
          this.announce('Reloaded!');
          this.dfproxy.loadCustomActions('../customactions/', () => {
            this.announce('Reloaded!');
          });
        });
      });
    });
  }
};
