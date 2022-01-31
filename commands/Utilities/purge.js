const { MessageEmbed } = require('discord.js');
const wait = require('util').promisify(setTimeout);
module.exports = {
    name : 'clear',
    aliases : ['purge'],
    run : async(client, message, args) => {
      const Embed = new MessageEmbed()
      .setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})})


        if(!args[0]) return message.channel.send({embeds: [Embed.setDescription(`Please specify a number of messages to delete ranging from 1 - 99`)]})

        if(isNaN(args[0])) return message.channel.send({embeds: [Embed.setDescription(`Numbers are only allowed`)]})



        if(parseInt(args[0]) > 99) return message.channel.send({embeds: [Embed.setDescription(`The max amount of messages that I can delete is 99`)]})

        await message.channel.bulkDelete(parseInt(args[0]) + 1)
            .catch(err => console.log(err))
       const msg = await message.channel.send({embeds: [Embed.setDescription(`Deleted ${args[0]}  messages in this channel`)]})
       await wait(1000)
       await msg.delete()
    }
}