const { Client, Collection, MessageEmbed } = require('discord.js');
const client = new Client({ intents: 32767 });
module.exports = client;
const { glob } = require('glob');
const { promisify } = require('util');
const PG = promisify(glob)
const Ascii = require("ascii-table")
const fs = require('fs')


const { Token, prefix } = require('./config.json')

client.commands = new Collection();

client.filters = new Collection();
client.filtersLog = new Collection();

["Events", "Commands"].forEach(handler => {
  require(`./Handlers/${handler}`)(client, PG, Ascii);
});

client.maintenance = false;
client.cooldown = new Collection();


client.command = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 

const prefixSchema = require('./Models/PrefixSchema')

client.prefix = async function(message) {
  let custom;

  const data = await prefixSchema.findOne({ Guild: message.guild.id })
    .catch(err => console.log(err))

  if (data) {
    custom = data.Prefix;
  } else {
    custom = prefix;
  }
  return custom;
}


client.login(Token);