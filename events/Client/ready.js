
const { prefix } = require('../../config.json')
const client = require('../../index')
client.on('ready', async() => {
  
  client.user.setActivity(`Ping Me For Prefix`)
})