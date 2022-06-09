module.exports = async (invite) => {
  guildInvites.set(invite.guild.id, await invite.guild.fetchInvites());
};
module.exports.app = {
  event: "inviteCreate"
};