const prefixSchema = require('../../Models/PrefixSchema')
const { Message, MessageEmbed } = require('discord.js')
module.exports = {
    name : 'prefix',
    /**
     * @param {Message} message
     */
    run : async(client, message, args)  => {
        const res = await args.join(" ")
        if(!res) return message.channel.send('Please specify a prefix to change to.')
         await prefixSchema.findOneAndUpdate(
     {Guild: message.guild.id}, 
     { 
     Prefix: res
     },
     {
       new: true,
       upsert: true
     }
     );
       message.channel.send({embeds:[new MessageEmbed().setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})}).setDescription(`Your Prefix Has Been Updated To \`${res}\``)]})
    
        }
    }
