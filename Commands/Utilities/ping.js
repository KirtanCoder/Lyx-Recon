const { CommandInteraction, Client } = require('discord.js')

module.exports = {
    name: "ping",
    description: "ping",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} interaction 
     */
    async execute(interaction, client) {
      await interaction.deferReply({})
        await interaction.editReply({ content: `⏱| **${client.ws.ping}ms** Latency!`})

    }
}