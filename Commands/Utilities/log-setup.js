const { Client, MessageEmbed, MessageActionRow, MessageButton, CommandInteraction } = require("discord.js");
const DB = require('../../Models/LogDB')

module.exports = {
  name: "log-setup",
  description: "Log Setup",
  options: [
    {
      name: "channel",
      description: "Select a Channel.",
      type: "CHANNEL",
      required: true,
channelTypes: ["GUILD_TEXT"],
    },
  ],
  /**
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   */
  async execute(interaction, client) {
const { guild } = interaction;
    const Channel = interaction.options.getChannel('channel')

    const main = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel(`Agree`)
        .setCustomId(`la`)
        .setStyle(`DANGER`),
      new MessageButton()
        .setLabel(`Cancel`)
        .setStyle(`SECONDARY`)
        .setCustomId(`lc`)
    );

  const msg = await interaction.reply({ embeds: [new MessageEmbed().setDescription(`Are You Sure You Want To Set Channel For Logs ${Channel}`)], components: [main], fetchReply:true });


const collector = msg.createMessageComponentCollector({ componentType: 'BUTTON', time: 15000 });

collector.on('collect', async(i) => {
	if (i.user.id === interaction.user.id) {
		if(i.customId === "la"){

const embed = new MessageEmbed()
.setDescription(`Succesfully Set ${Channel} as Logs`)
msg.edit({embeds: [embed],components: []})

await DB.findOneAndUpdate({GuildID: guild.id}, {LogsChannel: Channel.id}, {new: true, upsert: true})

}
		if(i.customId === "lc"){

const emed = new MessageEmbed()
.setDescription(`Cancelled`)

msg.edit({embeds: [embd], components: []})
        }
	} else {
		i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
	}
 })
}
}