const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'guild',
  aliases: ['list'],
  description: 'Guild List ',
  run: async (client, message, args) => {

    const Response = new MessageEmbed()
      .setColor('PURPLE')
      .setTitle('Guilds')
      .setDescription(`**Total Guilds**: \`${client.guilds.cache.size}\`\n**Total Guilds Names**: \`${client.guilds.cache.map(g => g.name).join(', ')}\``)
      .setFooter(`Requested by ${message.member.user.tag}`, message.member.user.displayAvatarURL())
      .setTimestamp()

    message.channel.send({ embeds: [Response], ephermeral: true });
  }
}