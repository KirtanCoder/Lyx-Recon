
const { Message, Client, MessageEmbed} = require("discord.js");
const ms = require('ms')
module.exports = {
    name: "untimeout",
    aliases: ['uto', 'unmute'],
    description: "Untimeout a member from the server!",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        try{
        const aut = message.author;
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) {
          return message.channel.send({embeds: [new MessageEmbed().setDescription(`Provide a Target \n \`\`\`Syntax: untimeout <user> <reason> \`\`\``).setColor("RED")]})
        }


        const reason = args.slice(1).join(" ") || "No reason was provided"
        
        if(!member.communicationDisabledUntilTimestamp){
          return message.channel.send({embeds: [new MessageEmbed().setDescription(`\`❌\` | The User Is Already Untimeouted`).setColor("RED")]})
        }

        await member.timeout(null)
     
        const embed = new MessageEmbed()
        .setTitle(`\`✅\` | Successfully Unmuted The ${member}!`)
        .addField("Moderator :", `${aut}`)
        .addField("Reason :", `${reason}`)
        .setColor("GREEN")
        message.channel.send({ embeds: [embed]})
    } catch(e) {
         message.channel.send({ content: `${e}`})   
         return console.log(e)
    }
} 
}