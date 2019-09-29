module.exports = (err, dfproxy) => {
  console.log(err);
  if (err.message === 'Invalid credentials. Invalid username or password.') {
    dfproxy.client.end('§cUsername or password is invalid! Or you are temporary ip banned on mojang.');
    console.log('Username or password is invalid!\nOr you connected too much and this caused a temporary ip ban!\nProcess exits in 5 seconds...');
    setTimeout(() => process.exit(1), 5000);
  } else if (err.code === 'ECONNREFUSED') {
    dfproxy.client.end('Can\'t make a connection to DF!');
    dfproxy.proxyClient = undefined;
  } else if (err.code === 'ECONNRESET') {
    dfproxy.client.end('§cLost connection!');
    dfproxy.proxyClient = undefined;
  } else {
    dfproxy.client.end('§cUnexpected error!\n§cPlease read console and report.');
  }
};
