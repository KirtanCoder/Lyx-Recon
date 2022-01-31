const prefixSchema = require('../../Models/PrefixSchema')
const prefix = require('../../config.json').prefix

module.exports = {
  name: 'prefix-reset',
  run: async (client, message, args) => {
    const msg = await message.channel.send("Are you sure you want to reset the prefix?")
      await msg.react('✅')
      await msg.react('❌')

      const filter = (reaction, user) => {
        return (
          reaction.emoji.name === "✅",
          "❌"
        );
      };

      const c = msg.createReactionCollector({ filter });

      c.on("collect", async (reaction, user) => {
        if (['✅', '❌'].includes(reaction.emoji.name)) {
          if (reaction.emoji.name === '✅') {
            msg.delete()
            await prefixSchema.findOneAndDelete({ Guild: message.guild.id })
            message.channel.send(`The prefix has been reset to \`${prefix}\``)
          }
          if (reaction.emoji.name === '❌') {
            msg.delete()
            message.channel.send('reset prefix has been cancelled.')
          }
        }
      })
  }
}