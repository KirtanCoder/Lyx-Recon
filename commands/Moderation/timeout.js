const { Message, MessageEmbed, Client } = require("discord.js");
const ms = require('ms')
module.exports = {
  name: "timeout",
  perms: ["BAN_MEMBERS"],
  bperms: ["MODERATE_MEMBERS"],
  description: 'Give the e=mentioned member timeout',
  useage: '<Mention Member> <Time> [reason]',
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {

    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!user) {
      return message.channel.send({ embeds: [new MessageEmbed().setDescription(`Provide a Target \n \`\`\`Syntax: timeout <user> <time> <reason> \`\`\``).setColor("RED")] })
    }

    const length = args[1]
    const reason = args.slice(2).join(' ') || 'No reason was provided';
    if (!length) {
      return message.channel.send({ embeds: [new MessageEmbed().setDescription(`Provide a time   5s/ 5m / 5hr \n \`\`\`Syntax: timeout <user> <time> <reason> \`\`\``).setColor("RED")] })
    };

    const timer = ms(length);

    if (user.id === client.user.id) {return message.channel.send({ embeds: [new MessageEmbed().setDescription(`\`❌\` | I Cannot Timeout my self`)] })}

    if (user.id === message.author.id) { return message.channel.send({ embeds: [new MessageEmbed().setDescription(`\`❌\` | You Cannot Timeout Yourself`)] }) }

    if (user.roles.highest.position >= message.member.roles.highest.position) return message.channel.send({ embeds: [new MessageEmbed().setDescription(`\`❌\` | You Cannout Timeout A User **Higher** Than Your Role Or **Equal** To Your Role`)] })




    const Tembed = new MessageEmbed()
      .setTitle(`\`✅\` | Successfully Member has been Timeouted!`)
      .setColor("RED")
      .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${user} has been Timeouted by ${message.author}`)
      .addField(`Reason:`, `${reason}`)
      .addField(`Duration:`, `${length.toString()}`)
      .addField(`Date:`, `<t:${parseInt(message.createdTimestamp / 1000)}:F>`)
      .setFooter({ text: `Member ID: ${user.id}` })
      .setTimestamp()

    user.timeout(timer, reason);
    message.channel.send(
      {
        embeds: [Tembed]
      }
    )
  }
}
