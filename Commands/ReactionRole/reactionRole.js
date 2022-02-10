const { CommandInteraction, Client, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const DB = require('../../Models/ReactionDB');

module.exports = {
  name: 'button-roles',
  description: 'Button Roles.',
  permission: 'MANAGE_CHANNELS',
  options: [
    {
      name: "channel",
      description: "channel to send reaction-role",
      type: "CHANNEL",
      channelTypes: ["GUILD_TEXT"],
      required: true,
    },
    {
      name: "role-1",
      description: "1st Role",
      type: "ROLE",
      required: true,
    },
    {
      name: "role-2",
      description: "2nd Role",
      type: "ROLE",
      required: false,
    },
    {
      name: "role-3",
      description: "3rd Role",
      type: "ROLE",
      required: false,
    },
    {
      name: "role-4",
      description: "4th Role",
      type: "ROLE",
      required: false,
    },
    {
      name: "role-5",
      description: "5th Role",
      type: "ROLE",
      required: false,
    },
    {
      name: "description",
      description: "Give A description for the embed",
      type: "STRING",
      required: false,
    },
  ],
  /**
 * @param {CommandInteraction} interaction 
 * @param {Client} client 
 */
  async execute(interaction, client) {

    const { guild, channel, options } = interaction;
    try {
      const Channel = options.getChannel("channel")
      const role1 = options.getRole("role-1")
      const role2 = options.getRole("role-2")
      const role3 = options.getRole("role-3")
      const role4 = options.getRole("role-4")
      const role5 = options.getRole("role-5")
      const embed = options.getRole("description")

      if (Channel.id === interaction.channel.id) {
        return interaction.reply({ embeds: [new MessageEmbed().setColor("#00FFFF").setDescription(` :x: Select Other Channnel `)] })
      }

      if (role1) {

       await DB.findOneAndUpdate({ChannelID: Channel.id}, {GuildID: guild.id, RoleID: role1.id}, {new: true, upsert: true})

          const Embed = new MessageEmbed()
            .setAuthor({ name: guild.name + " | Reaction Role System ", iconURL: guild.iconURL({ dynamic: true }) })
            .setDescription(`React With The Given Buttons To Get/Remove the Roles`)
            .setColor("#00FFFF")

          const Buttons = new MessageActionRow()
            .addComponents(
              new MessageButton()
                .setLabel(`${role1.name}`)
                .setCustomId(`1`)
                .setStyle("SECONDARY")
            )
          interaction.reply({ content: `You Button-Reaction\'s  Has Been Setup In <#${Channel.id}>`, ephemeral: true })

          await guild.channels.cache.get(Channel.id).send({ embeds: [Embed], components: [Buttons] })


   
      }     

    } catch (error) {
      console.error(error);
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
    }

  }
}