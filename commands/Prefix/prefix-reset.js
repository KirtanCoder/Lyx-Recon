const prefixSchema = require('../../Models/PrefixSchema')
const prefix = require('../../config.json').prefix

module.exports = {
  name: 'prefix-reset',
  aliases: ['pr', 'prefix-r'],
  run: async (client, message, args) => {
    const msg = await message.channel.send("Are you sure you want to reset the prefix?")
      await msg.react('✅')
      await msg.react('❌')

    const filter = (reaction, user) => {
            return reaction.emoji.name === '✅', '❌' && user.id === message.user.id;
        };
        const c = msg.createReactionCollector({ filter });

        c.on('collect', (reaction, user) => {

            if (['✅', '❌'].includes(reaction.emoji.name)) {
                const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));

                for (const userReaction of userReactions.values()) {
                    if (userReaction.emoji.name !== reaction.emoji.name || reaction.emoji.name === '✅', '❌') {
                        userReaction.users.remove(user.id);
                        userReaction.users.remove(user)
                    }
                }
            } else {
                reaction.remove();
            }

            if (reaction.emoji.name === '✅') {
DB.findOneAndUpdate({Guild: message.guild.id}, {Prefix:'.'}, {new: true, upsert: true})

message.channel.send({embeds: [new MessageEmbed().setTitle]})
            }
            if (reaction.emoji.name === '❌') {

            }
        });
  }
}