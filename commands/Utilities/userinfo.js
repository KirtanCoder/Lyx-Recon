
const { MessageEmbed, MessageActionRow, MessageButton, } = require("discord.js");

module.exports = {
  name: 'userinfo',
  aliases: ['ui'],
  description: 'Info Of The User',
  run: async (client, message, args) => {

    const Targt = message.mentions.users.first() || message.author

    const Target = message.guild.members.cache.get(Targt.id)

    var main = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel(`Main info`)
        .setEmoji(`ℹ`)
        .setCustomId(`main`)
        .setDisabled(true)
        .setStyle(`SECONDARY`),
      new MessageButton()
        .setLabel(`Roles info`)
        .setStyle(`SECONDARY`)
        .setEmoji(`ℹ`)
        .setCustomId(`roles`),
      new MessageButton()
        .setLabel(`Permissions`)
        .setStyle(`SECONDARY`)
        .setEmoji(`ℹ`)
        .setCustomId(`permissions`)

    );

    const Response = new MessageEmbed()
      .setAuthor({ name: `${Target.user.tag}`, iconURL: `${Target.user.displayAvatarURL({ dynamic: true })}` })
      .setThumbnail(`${Target.displayAvatarURL({ dynamic: true })}`)
      .setColor("WHITE")
      .addField("UserID", `${Target.id}`, false)
      .addField("Server Member Since", `<t:${parseInt(Target.joinedTimestamp / 1000)}:R>`, false)
      .addField("Discord User Since", `<t:${parseInt(Target.user.createdTimestamp / 1000)}:R>`, false)
      .addField(`Nickname : `, `**${Target.nickname || `Default`}**`, true)
      .addField(`Presence : `, `**${Target.presence?.status || `offline`}**`, false)
    const Sm = await message.channel.send({ embeds: [Response], components: [main] });

    const collector = Sm.createMessageComponentCollector();

    collector.on('collect', async i => {
      if (i.user.id === message.author.id) {
        if (i.customId === 'main') {
          await i.update({ embeds: [Response], components: [main] })
        }
        if (i.customId === 'roles') {
          var role = new MessageActionRow().addComponents(
            new MessageButton()
              .setLabel(`Main info`)
              .setEmoji(`ℹ`)
              .setCustomId(`main`)
              .setStyle(`SECONDARY`),
            new MessageButton()
              .setLabel(`Roles info`)
              .setStyle(`SECONDARY`)
              .setDisabled(true)
              .setEmoji(`ℹ`)
              .setCustomId(`roles`),
            new MessageButton()
              .setLabel(`Permissions`)
              .setStyle(`SECONDARY`)
              .setEmoji(`ℹ`)
              .setCustomId(`permissions`)

          );
          const rolee = new MessageEmbed()
            .setAuthor({ name: `${Target.user.tag}`, iconURL: `${Target.user.displayAvatarURL({ dynamic: true })}` })
            .addField(`Roles : `, `${Target.roles.cache.map(r => r).sort((first, second) => second.position - first.position).join(` | `)}`, true)
            .addField(`Highest role : `, `${Target.roles.highest}`, false)
            .setColor(`RANDOM`)
            .setThumbnail(`${Target.displayAvatarURL({ size: 1024, dynamic: true })}`)
          await i.update({ embeds: [rolee], components: [role] })
        }
        if (i.customId === `permissions`) {
          var perms = new MessageActionRow().addComponents(
            new MessageButton()
              .setLabel(`Main info`)
              .setEmoji(`ℹ`)
              .setCustomId(`main`)
              .setStyle(`SECONDARY`),
            new MessageButton()
              .setLabel(`Roles info`)
              .setStyle(`SECONDARY`)
              .setEmoji(`ℹ`)
              .setCustomId(`roles`),
            new MessageButton()
              .setLabel(`Permissions`)
              .setStyle(`SECONDARY`)
              .setDisabled(true)
              .setEmoji(`ℹ`)
              .setCustomId(`permissions`)

          );
          var eee2 = new MessageEmbed()
            .setAuthor({ name: `${Target.user.tag}`, iconURL: `${Target.user.displayAvatarURL({ dynamic: true })}` })
            .addField(`Permissions : `, `\`\`\`${Target.permissions.toArray().join(` | `)}\`\`\``, true)
            .setColor(`RANDOM`)
            .setThumbnail(`${Target.displayAvatarURL({ size: 1024, dynamic: true })}`)
          await i.update({ embeds: [eee2], components: [perms] })
        }
      } else {
        i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
      }
    })
  }
}