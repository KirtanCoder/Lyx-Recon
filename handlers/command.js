const {readdirSync} = require('fs');
const ascii = require('ascii-table')
let table = new ascii("Commands");
table.setHeading('Command', ' Load status');
module.exports= (client) => {
    readdirSync('./commands/').forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        for(let file of commands){
            let pull = require(`../commands/${dir}/${file}`);
            if(pull.name){
                client.command.set(pull.name, pull);
                table.addRow(file,'✅')
            } else {
                table.addRow(file, '❌ -> Missing a help.name, or help.name is not a string.')
                continue;
            }if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
        }
    });
    console.log(table.toString());
    
    readdirSync("./events/").forEach(dir => {
        const events = readdirSync(`./events/${dir}/`).filter(file => file.endsWith('.js'));

    for (let file of events) {
      let pull = require(`../events/${dir}/${file}`);

      if (pull.name) {
        client.events.set(pull.name, pull);
      } else {
        continue;
      }
    }
  });
}