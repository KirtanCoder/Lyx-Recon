
const { CommandInteraction, Client } = require('discord.js')

module.exports = {
    name: "invite",
    description: "invite the bot",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} interaction 
     */
    async execute(interaction, client) {
      await interaction.deferReply({})
        await interaction.editReply({ content: `[Click Me To Invite The Bot](https://discord.com/api/oauth2/authorize?client_id=934352971951669248&permissions=8&scope=bot%20applications.commands
)`})

    }
}