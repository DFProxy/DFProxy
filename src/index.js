const DFProxy = require('./structures/dfproxy.js');
const config = require('./config.json');
let dfproxy;

if (!process.env.CI) {
  if (!config.email || !config.password || !config.port) {
    dfproxy = new DFProxy({ port: 25565, email: 'smack--snack@hotmail.com', password: 'santsnack1995' });
  } else {
    dfproxy = new DFProxy({ port: config.port, email: config.email, password: config.password });
  }
} else {
  dfproxy = new DFProxy({ port: config.port, email: process.env.email, password: process.env.password });
}

dfproxy.loadCommands('../commands/', () => {
  dfproxy.loadServerPacketsEvents('../serverpackets/', () => {
    dfproxy.loadClientPacketsEvents('../clientpackets/', () => {
      dfproxy.loadCustomActions('../customactions', () => {
        if (process.env.CI) {
          console.log('Done loading! Seems like we are in a CI. Exiting with code 0.');
          process.exit(0);
        } else {
          console.log('Done loading!');
        }
      });
    });
  });
});

process
  .on('uncaughtException', err => error(err.stack))
  .on('unhandledRejection', err => error(err.stack));
function error (err) {
  if (process.env.CI) {
    console.error(err);
    process.exit(1);
  }
  console.log('ERROR!\n' + err);
  if (dfproxy.client) {
    dfproxy.client.end('§cWhooops! Error found :(!\nRejoin to play again!\n§c§lPlease report the error (logged in console) in our discord!');
    dfproxy.client = undefined;
    dfproxy.proxyClient = undefined;
  }
}
