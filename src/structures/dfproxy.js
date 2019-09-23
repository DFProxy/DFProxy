const fs = require('fs')
const path = require('path')

const Proxy = require('./proxy.js')
const Client = require('./client.js')

class DFProxy {
  constructor (options) {
    Object.defineProperty(this, 'serverPacketEvents', { value: new Map() })
    Object.defineProperty(this, 'clientPacketEvents', { value: new Map() })

    Object.defineProperty(this, 'commands', { value: new Map() })
    Object.defineProperty(this, 'aliases', { value: new Map() })

    Object.defineProperty(this, 'proxy', { value: new Proxy({ 'online-mode': false,
      encryption: true,
      host: '127.0.0.1',
      port: options.port,
      version: '1.13.2',
      motd: '\u00a7eDF\u00a76Proxy \u00a71- \u00a7bVersion: \u00a731.0.0 \u00a77| \u00a75\u25b6 \u00a7dReady to connect!\u00a7r\n\u00a7cNew Update! \u00a7e/dfproxy \u00a77| \u00a7fNow you can see all the commands!',
      'max-players': 1,
      favicon: 'data:image/png;base64,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'
    }),
    writeable: true })
    this.proxy.on('login', client => this.clientLogin(client))
  }

  clientLogin (client) {
    console.log('Client logging in..')
    this.client = client
    this.proxyClient = new Client({
      host: 'node1.mcdiamondfire.com',
      port: 25565,
      username: 'smack--snack@hotmail.com',
      password: 'santsnack1995',
      version: '1.13.2'
    }).on('packet', (data, meta) => {
      // console.log('PROXY CLIENT PACKET:' + meta.name)

      var serverPacketEvent = this.serverPacketEvents.get(meta.name)
      if (serverPacketEvent && serverPacketEvent.run) {
        serverPacketEvent.run(meta, data, client, this.proxyClient, this.proxy)
        if (serverPacketEvent.canceled === true) {
          return
        }
      }

      this.filterPacketAndSend(data, meta, client)
    })
    client.on('packet', (data, meta) => {
      // console.log('CLIENT PACKET: ' + meta.name)

      var clientPacketEvent = this.clientPacketEvents.get(meta.name)
      if (clientPacketEvent && clientPacketEvent.run) {
        clientPacketEvent.run(meta, data, client, this.proxyClient, this.proxy)
        if (clientPacketEvent.canceled === true) {
          return
        }
      }
      this.filterPacketAndSend(data, meta, this.proxyClient)
    })
  }

  filterPacketAndSend (data, meta, dest) {
    if (meta.name !== 'keep_alive' && meta.name !== 'update_time' && meta.name !== 'encryption_begin' && meta.name !== 'compress' && meta.name !== 'success') {
      dest.write(meta.name, data)
    }
  }

  loadServerPacketsEvents (dir) {
    fs.readdir(path.join(__dirname, `${dir}`), (error, packetEvents) => {
      if (error) {
        return console.log(error)
      }
      console.log(`Loading ${packetEvents.length} server packet events...`)

      packetEvents.forEach(async (packetevent, i) => {
        const start = Date.now()

        const props = new (require(path.join(__dirname, `${dir}/${packetevent}`)))(this)

        if (props.init) await props.init(this)

        this.serverPacketEvents.set(props.name, props)
        console.log(`Loaded server packet event ${props.name} in ${Date.now() - start}ms.`)
      })
    })
  }

  loadClientPacketsEvents (dir) {
    fs.readdir(path.join(__dirname, `${dir}`), (error, packetEvents) => {
      if (error) {
        return console.log(error)
      }
      console.log(`Loading ${packetEvents.length} client packet events...`)

      packetEvents.forEach(async (packetevent, i) => {
        const start = Date.now()

        const props = new (require(path.join(__dirname, `${dir}/${packetevent}`)))(this)

        if (props.init) await props.init(this)

        this.clientPacketEvents.set(props.name, props)
        console.log(`Loaded client packet event ${props.name} in ${Date.now() - start}ms.`)
      })
    })
  }

  loadCommands (dir) {
    fs.readdir(path.join(__dirname, `${dir}`), (error, commands) => {
      if (error) {
        return console.log(error)
      }
      console.log(`Loading ${commands.length} commands...`)

      commands.forEach(async (command, i) => {
        const start = Date.now()

        const props = new (require(path.join(__dirname, `${dir}/${command}`)))(this)

        if (props.init) await props.init(this)

        this.commands.set(props.name, props)
        console.log(`Loaded command ${props.name} in ${Date.now() - start}ms.`)
      })
    })
  }
}
module.exports = DFProxy
