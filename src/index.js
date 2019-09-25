const DFProxy = require('./structures/dfproxy.js')
const config = require('./config.json')
let dfproxy
if (!config.email || !config.password || !config.port) {
  dfproxy = new DFProxy({ port: 25565, email: 'smack--snack@hotmail.com', password: 'santsnack1995' })
} else {
  dfproxy = new DFProxy({ port: config.port, email: config.email, password: config.password })
}

dfproxy.loadCommands('../commands/')
dfproxy.loadServerPacketsEvents('../serverpackets/')
dfproxy.loadClientPacketsEvents('../clientpackets/')
