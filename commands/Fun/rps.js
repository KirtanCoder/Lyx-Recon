const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'rps',
  category: 'fun',
  aliases: ['rockpaperscissors', 'rock', 'paper', 'scissors'],
  description: 'Play\'s Rock Paper Scissors',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const Embed = new MessageEmbed()
    .setAuthor({name: message.guild.name + ' - '  + '[RockPaperScissors]',iconURL: message.guild.iconURL({dynamic: true})})
    .setThumbnail('https://facts.net/wp-content/uploads/2020/11/rock-paper-scissors.jpg')

    if(!args[0]) {
      return message.channel.send(`:x: | PICK AN OBJECT TO PLAY RPS WITH! EXAMPLE: ****rps rock**** | :x:`)
    }
if(args[0] === 'rock'){
      let replies = ["YOU CHOSE ***ROCK***, I CHOSE ***PAPER***. ****PAPER**** WINS!", "YOU CHOSE ***ROCK***, I CHOSE ***SCISSORS***. ****ROCK**** WINS!", "YOU CHOSE ***ROCK***, I CHOSE ***ROCK***. IT'S A TIE!"]
      const ac = replies[Math.floor(Math.random() * replies.length) ]
     return message.channel.send({embeds: [Embed.setColor("RANDOM").setDescription(`${ac}`)]})
    }

  if(args[0] === 'paper'){
      let replies = ["YOU CHOSE ***PAPER***, I CHOSE ***ROCK***. ****PAPER**** WINS!", "YOU CHOSE ***PAPER***, I CHOSE ***SCISSORS***. ****SCISSORS**** WIN!", "YOU CHOSE ***PAPER***, I CHOSE ***PAPER***. IT'S A TIE!"]
      const ac = replies[Math.floor(Math.random() * replies.length )]
      return message.channel.send({embeds: [Embed.setColor("RANDOM").setDescription(`${ac}`)]})
    }

    if (args[0] === 'scissors') {
      let replies = ["YOU CHOSE ***SCISSORS***, I CHOSE ***ROCK***. ****ROCK WINS!****", "YOU CHOSE ***SCISSORS***, I CHOSE ***PAPER***. ****SCISSORS WIN!***", "YOU CHOSE ***SCISSORS***, I CHOSE ***SCISSORS***. ****SCISSORS**** WIN!"]
     const ac = replies[Math.floor(Math.random() * replies.length)]
      return message.channel.send({embeds: [Embed.setColor("RANDOM").setDescription(`${ac}`)]})
    }

    if(!args[0] === 'rock' || 'paper' || 'scissors'){
      return message.channel.send({embeds: [Embed.setColor("WHITE").setDescription(`Invalid OBJECT its should be [rock, paper,scissors]`)]})
    }
  }
}