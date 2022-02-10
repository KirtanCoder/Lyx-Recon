const DB = require('../../Models/PrefixSchema')
const client = require('../../index')
client.on('guildCreate', async (guild) => {
    DB.create({ Guild: guild.id , Prefix: '.'})
})