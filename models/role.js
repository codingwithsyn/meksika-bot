const role = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  roleID: String,
  name: String,
  color: String,
  hoist: Boolean,
  position: Number,
  mentionable: Boolean,
  time: Number,
  members: Array
});

module.exports = mongoose.model("roles", role);