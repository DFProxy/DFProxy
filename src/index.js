const DFProxy = require('./structures/dfproxy.js');
const config = require('./config.json');
const updater = require('./utils/updater.js');
const chalk = require('chalk');
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

if (dfproxy) {
  dfproxy.loadCommands('../commands/', () => {
    dfproxy.loadServerPacketsEvents('../serverpackets/', () => {
      dfproxy.loadClientPacketsEvents('../clientpackets/', () => {
        dfproxy.loadCustomActions('../customactions', () => {
          if (process.env.CI) {
            console.log('Done loading! Seems like we are in a CI. Exiting with code 0.'); // TODO: Create a new mineflayer client and join DFProxy
            process.exit(0);
          } else {
            console.log('Done loading!\n' +
            chalk.white.bold.strikethrough("======================================================\n") +
            chalk.black.bgCyan.bold.underline("WELCOME TO DFPROXY\n") +
            chalk.magenta("DFProxy has started!\n") +
            chalk.blue("The DFProxy proxy client has been successfully created.\nConnect to localhost:25566 (note the port 25566) and you should be tunneled to DiamondFire!\n\n") +
            chalk.white.bgRed.bold.underline("ERROR & BUG REPORTING\n") +
            chalk.blue("Along the way with your experience with DFProxy, you may encounter bugs or errors.\nWe try our best to rid DFProxy of all bugs, but sometimes we miss some, especially with a new patch.\nIf you encounter an error or a bug, simply create an issue on our GitHub repository or DM one of the developers - LittleWhole#1337, Goseale#6992, or SiebeDW#4501 - with the error or bug and your DFProxy version.\nWe will try to push out a fix promptly.\n") +
            chalk.white.bold.strikethrough("======================================================")
            );
          }
        });
      });
    });
  });
}

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
