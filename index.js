
const mc = require('minecraft-protocol')
let proxyClient

const info = { login: '', slot: 0, recipes: '', tags: '', abilities: '', commands: '', unlockrecipes: '', players: [], chunks: [] }

var client = mc.createClient({
  host: 'goseale.aternos.me',
  port: 25565,
  username: 'smack--snack@hotmail.com',
  password: 'santsnack1995',
  version: '1.13.2'
})
client.on('packet', (data, meta) => {
  console.log('PACKET: ' + meta.name)
  if (meta.name === 'game_state_change') {
    console.log(data)
  }
  if (meta.name === 'login') {
    console.log('Setted login info.')
    info.login = data
  }
  if (meta.name === 'map_chunk') {
    info.chunks.push(data)
  }
  if (meta.name === 'declare_recipes') {
    console.log('Setted recipes.')
    info.recipes = data
  }
  if (meta.name === 'tags') {
    console.log('Setted tags.')
    info.tags = data
  }
  if (meta.name === 'held_item_slot') {
    console.log('Setted item slot.')
    info.slot = data
  }
  if (meta.name === 'abilities') {
    console.log('Setted abilities')
    info.abilities = data
  }
  if (meta.name === 'declare_commands') {
    console.log('Setted commands')
    info.commands = data
  }
  if (meta.name === 'unlock_recipes') {
    console.log('Setted unlocked recipes')
    info.unlockrecipes = data
  }
  if (meta.name === 'player_info') {
    info.players.push(data)
  }
  if (meta.name === 'kick_disconnect') {
    console.log(data)
    setTimeout(() => {
      client = mc.createClient({
        host: 'goseale.aternos.me',
        port: 25565,
        username: 'smack--snack@hotmail.com',
        password: 'santsnack1995',
        version: '1.13.2'
      })
    }, 3000)
    return
  }
  if (proxyClient) {
    filterPacketAndSend(data, meta, proxyClient)
  }
})

client.on('end', () => {
  if (proxyClient) {
    proxyClient.end('Connection reset by server.\nReconnecting...')
    proxyClient = null
  }
  stop()
})

client.on('error', (err) => {
  if (proxyClient) {
    proxyClient.end(`Connection error by server.\n Error message: ${err}\nReconnecting...`)
    proxyClient = null
  }
  console.log('err', err)
  stop()
})

const server = mc.createServer({
  'online-mode': false,
  encryption: true,
  host: '0.0.0.0',
  port: 25566,
  version: '1.13.2',
  motd: 'Free Overlord Proxy\nWhoop whoop xD',
  'max-players': 1
})

server.on('login', (newProxyClient) => {
  newProxyClient.write('login', info.login)
  newProxyClient.write('position', {
    x: 0,
    y: 50,
    z: 0,
    yaw: 0,
    pitch: 0,
    flags: 0x00
  })
  newProxyClient.write('abilities', info.abilities)
  newProxyClient.write('held_item_slot', info.slot)
  newProxyClient.write('declare_recipes', info.recipes)
  newProxyClient.write('tags', info.tags)
  newProxyClient.write('declare_commands', info.commands)
  newProxyClient.write('unlock_recipes', info.unlockrecipes)
  newProxyClient.write('chat', { message: '{"extra":[{"color":"yellow","text":"Welcome to DFProxy! This is a WIP proxy to DiamondFire.\nUse /dfproxy to see all commands (WIP)!\nWARNING FOR BEST EXPERIENCE SWITCH NODE FIRST! WITH /server <node>"}],"text":""}', position: 1 })
  setTimeout(() => {
    newProxyClient.write('title', { action: 0, text: '{"extra":[{"color":"gray","text":"["},{"color":"green","text":"DFProxy"},{"color":"gray","text":"]"}],"text":""}' })
    newProxyClient.write('title', { action: 1, text: '{"extra":[{"color":"aqua","text":"Loaded!"}],"text":""}' })
  }, 5000)
  info.chunks.forEach(chunk => {
    newProxyClient.write('map_chunk', chunk)
  })
  info.players.forEach(player => {
    newProxyClient.write('player_info', player)
  })

  newProxyClient.on('packet', (data, meta) => {
    if (meta.name === 'chat') {
      var message = data.message
      if (message.startsWith('/')) {
        const args = message.split(/\s+/g)
        const command = args.shift().substr(1)
        console.log(command)
        /*
        if (command === 'dfproxy') {
          chat(newProxyClient, 'DF Proxy is a project made by SiebeDW#4501 to make DF gameplay even BETTER!')
          newProxyClient.write('game_state_change', { reason: 3, gameMode: 3 })
          return
        }
        */
        if (command === 'dfproxy_TP') {
          newProxyClient.write('position', {
            x: args[0],
            y: args[1],
            z: args[2],
            yaw: 0,
            pitch: 0,
            flags: 0x00
          })
        }
        return
      }
    }
    filterPacketAndSend(data, meta, client)
  })

  proxyClient = newProxyClient
})
// function chat (client, text) {
//   client.write('chat', { message: `{"extra":[{"text":"${text}"}],"text":""}`, position: 1 })
// }
function filterPacketAndSend (data, meta, dest) {
  if (meta.name !== 'keep_alive' && meta.name !== 'update_time') {
    dest.write(meta.name, data)
  }
}
function stop () {

}
console.log('Loaded.')
