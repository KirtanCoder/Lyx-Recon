const { prefix } = require('../../config.json')
const client = require('../../index')
client.on('messageCreate', async message => {
    const p = await client.prefix(message)
    if(message.mentions.users.first()) {
        if(message.mentions.users.first().id === '934352971951669248') return message.channel.send({embeds: [new MessageEmbed().setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})}).setDescription(`Prefix Is This Server Is \`${p}\``)]})
    }
    if (!message.content.startsWith(p)) return;
    if (!message.guild) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(p.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.command.get(cmd)
    if (!command) command = client.command.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args)
})