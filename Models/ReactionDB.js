const { model, Schema } = require("mongoose");

module.exports = model(
  "ReactionDB",
  new Schema({
    GuildID: String,
    ChannelID: String,
    Roles: [String]
  })
);
