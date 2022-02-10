const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const DB = require('../../Models/PrefixSchema')
const { prefix } = require('../../config.json')

module.exports = {
  name: 'help',
  category: 'info',
  aliases: ['help'],
  description: 'Help Command',

  run: async (client, message, args) => {


    //------------------------DB------------------------
    DB.findOne({ Guild: message.guild.id }, async (err, data) => {
      if(err) throw err;
      if(!data) data = DB.create({Guild: message.guild.id, Prefix: "."})

      //------------------MENUS------------------------
      const row = new MessageActionRow()
        .addComponents(
          new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('Select For More Options')
            .addOptions([
              {
                label: '👷‍♂️ | Moderation | 👷‍♂️',
                description: 'Moderation',
                value: 'f',
              },
              {
                label: '🏭 | Fun | 🏭',
                description: 'Fun',
                value: 's',
              },
              {
                label: '🔍 | Main | 🔍',
                description: 'Main',
                value: 't',
              },
                {
                label: '🧬 | Utilities | 🧬',
                description: 'Utilities',
                value: 'fo',
              },
            ]),
        );
      const p = data.Prefix

      //----------------------ARGS------------------------
      if (args[0] == "purge") {
        const pembed = new MessageEmbed()
        .setAuthor({name: "Purge Help", iconURL:client.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`\`\`\`Elm\n Syntax: ${p}purge [messages]\n Aliases: clear \n\`\`\` \n\n  **Delete the last X messages.**\nExample:\n\`${p}clear 26 Permissions\` \n**Permissions** \nUser: \n Moderator or \`MANAGE_MESSAGES\``)
        return message.channel.send({embeds: [pembed]})
      }

       if (args[0] == "purge") {
        const pembed = new MessageEmbed()
        .setAuthor({name: "Purge Help", iconURL:client.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`\`\`\`Elm\n Syntax: ${p}purge [messages]\n Aliases: clear \n\`\`\` \n\n  **Delete the last X messages.**\nExample:\n\`${p}clear 26 Permissions\` \n**Permissions** \nUser: \n Moderator or \`MANAGE_MESSAGES\``)
        return message.channel.send({embeds: [pembed]})
      }


      //----------------------Main Embed-----------------------

      const Embed = new MessageEmbed()
        .setAuthor({ name: " 🌺 " + client.user.username + " Help ", iconURL: client.user.displayAvatarURL({ dynamic: true }) })

        .setColor(`#00ffee`)
        .setDescription(`°•*➷ The prefix for this server is \`${p}\` \nType \`${p}prefix <prefix>\` to change the prefix.
        Type \`${p}<command>\`to get info about a specific command. 
Type \`${p}<command> <subcommand>\` to get info about a specific subcommand.`)
.setImage("https://cdn.discordapp.com/attachments/935787080087375892/938005290002026566/unknown.png")
      const msg = await message.channel.send({ embeds: [Embed], components: [row] });

      //------------------SUB EMBED---------------------------
      const Mod = new MessageEmbed()
        .setAuthor({ name: " 🌺 " + client.user.username + " Help ", iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setColor("#00ffee")
        .addFields(
          { name: "purge", value: `\`${p}help purge\`` },
          { name: "ban", value: `\`${p}help ban\`` },
          { name: "kick", value: `\`${p}help kick\`` },
          { name: "timeout", value: `\`${p}help timeout\`` },
           { name: "untimeout", value: `\`${p}help untimeout\`` },
        )

      const Fun = new MessageEmbed()
        .setAuthor({ name: " 🌺 " + client.user.username + " Help ", iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setColor("#00ffee")
         .addFields(
          { name: "rps", value: `\`${p}help rps\`` })

 const Utilities = new MessageEmbed()
        .setAuthor({ name: " 🌺 " + client.user.username + " Help ", iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setColor('#00ffee')
        .addFields(
          {name: "ping", value: `\`${p}ping\`` } 
          )
      //-------------------------COLLECTOR--------------------------------
      const collector = msg.createMessageComponentCollector({ componentType: "SELECT_MENU" })

      collector.on("collect", async (collected) => {
        const value = collected.values[0]

        if (value === 'f') {
          msg.edit({ embeds: [Mod] })
          collected.reply({ content: "You Choosed \`👷‍♂️ | Moderation | 👷‍♂️\` || :arrow_up:", ephemeral: true })
        }
          if (value === 's') {
          msg.edit({ embeds: [Fun] })
          collected.reply({ content: "You Choosed \`🏭 | Fun | 🏭` || :arrow_up:", ephemeral: true })
        }
        if(value === 't'){
          msg.edit({embeds: [Embed]})
           collected.reply({ content: "Back To Main\`🔍 | Main | 🔍\`", ephemeral: true })
        }
             if(value === 'fo'){
          msg.edit({embeds: [Utilities]})
           collected.reply({ content: "You Choosed \`🧬 | Utilities | 🧬\` || :arrow_up:", ephemeral: true })
        }
      })
    })
  }
}
