module.exports = (err, dfproxy) => {
  console.log(err);
  if (err.message === 'Invalid credentials. Invalid username or password.') {
    dfproxy.client.end('§cUsername or password is invalid! Or you are temporary ip banned on mojang.');
    console.log('Username or password is invalid!\nOr you connected too much and this caused a temporary ip ban!\nProcess exits in 5 seconds...');
    setTimeout(() => process.exit(1), 5000);
    return;
  }
  if (err.code === 'ECONNREFUSED') {
    if (dfproxy.reconnecting) return;
    dfproxy.client.end('Can\'t make a connection to DF!');
    dfproxy.proxyClient = undefined;
  }
  if (err.code === 'ECONNRESET') {
    dfproxy.client.end('Lost connection!');
    dfproxy.proxyClient = undefined;
  }
};
