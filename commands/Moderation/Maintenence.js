const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "maintenance",
    description: "Only for bot owner.",
    // permission: "ADMINISTRATOR",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction, client) {



        if (client.maintenance === false && interaction.user.id == "744862701720830002") {
            
            client.maintenance = true;
            
            const bot = new MessageEmbed()
                .setColor("GREEN")
                .setTitle("Maintenance mode **enabled** ✅")
                .setDescription(`👷‍♂️ The bot has been put into maintenance mode. 👷‍♂️`)
                .setTimestamp()
                
            return interaction.reply({ embeds: [bot], fetchReply: true })//.then(msg => { setTimeout(() => msg.delete(), 5000) })

        }

        if (client.maintenance && interaction.user.id == "744862701720830002"){
            
            client.maintenance = false;

            const bot = new MessageEmbed()
                .setColor("GREEN")
                .setTitle("Maintenance mode **disabled** ⛔")
                .setDescription(`👷‍♂️ The bot has been taken out of maintenance mode. 👷‍♂️`)
                .setTimestamp()

            return interaction.reply({ embeds: [bot], fetchReply: true })//.then(msg => { setTimeout(() => msg.delete(), 5000) })

        }
        
        
        interaction.reply({ content: "No fuck you.", fetchReply: true }).then(msg => { setTimeout(() => msg.delete(), 5000) })
        
    }
}