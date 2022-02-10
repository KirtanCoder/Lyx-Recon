const mongoose = require('mongoose')
const client = require('../../index')
const { MANGODB, prefix } = require('../../config.json')
module.exports = {
  name: "ready",
  async execute(client) {
      const p = await client.prefix
    console.log('The Client is Now Ready 💚')
    if (!MANGODB) return;
    mongoose.connect(MANGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      console.log('The Client Is Now Connected to the DataBase 💚')
    }).catch((err) => {
      console.log(err)
    });

    require('../../Systems/ChatFilter')(client);
  }
}
