module.exports = (err, dfproxy) => {
  if (err.message === 'Invalid credentials. Invalid username or password.') {
    console.log(`Username or password is invalid!\nOr you connected too much and this caused a temporary ip ban!\nProcess exits in 5 seconds...`)
    setTimeout(() => process.exit(), 5000)
    return
  }
  if (err.code === 'ECONNREFUSED') {
    if (dfproxy.reconnecting) return
    dfproxy.client.end('Can\'t make a connection to DF!')
    dfproxy.proxyClient = undefined
  }
  if (err.code === 'ECONNRESET') {
    console.log('Lost connection. Reconnecting in 10 seconds...')
    setTimeout(() => tryreconnect(5, dfproxy), 10000)
  }
}
// W.I.P Reconnect
function tryreconnect (tries, dfproxy) {
  dfproxy.proxyClient = undefined
  if (dfproxy.proxyClient) {
    console.log('Reconnected!')
    dfproxy.reconnecting = false
    return
  }
  dfproxy.reconnecting = true
  if (tries === 0) {
    console.log('0 tries left. Ending connection.')
    return
  }
  console.log(`Trying again... (${tries} left)`)

  dfproxy.loginProxyClient()
  setTimeout(() => tryreconnect(tries - 1, dfproxy), 10000)
}
