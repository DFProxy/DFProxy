const DFProxy = require('./structures/dfproxy.js');
const config = require('./config.json');
const updater = require('./utils/updater.js')
let dfproxy;

if (!process.env.CI) {
  if (!config.email || !config.password || !config.port) {
    console.log('There is no username/password/port in the config! Exiting in 15 seconds...');
    setTimeout(() => { process.exit(1); }, 15000);
  } else {
    dfproxy = new DFProxy({ port: config.port, email: config.email, password: config.password });
    updater(dfproxy);
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
    dfproxy.client.end('§cWhooops! Error found :(!\nRejoin to play again (Might not be possible)!\n§c§lPlease report the error (logged in console) in our discord!');
    dfproxy.client = undefined;
    dfproxy.proxyClient = undefined;
  }
}
