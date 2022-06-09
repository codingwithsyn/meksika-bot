module.exports = (invite) => {
  setTimeout(async () => {
    guildInvites.set(invite.guild.id, await invite.guild.fetchInvites());
  }, 5000)
};
module.exports.app = {
  event: "inviteDelete"
};