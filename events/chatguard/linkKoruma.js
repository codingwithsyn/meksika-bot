module.exports = (message) => {

  let id = message.author.id;
  if (message.attachments.first() || message.channel.type == `dm` || id === app.user.id || message.member.permissions.has("ADMINISTRATOR") || id === message.guild.ownerID || settings.author.id.some(user => id === user)) return;

  if (chatguard.fetch(`linkkoruma_url_${message.guild.id}_${app.user.id}`)) {

    if (link.test(message.content)) {
      if (message.channel.name.includes("link") || message.channel.name.includes("gif") || message.channel.name.includes("bot")) return;

      message.delete().catch(e => console.error())
      message.channel.send(`${emojis.no} Sunucuda izinli kanal dışında link atılmamakta! <@${message.author.id}>`).catch(e => console.error())
    }
  }

  if (chatguard.fetch(`linkkoruma_invite_${message.guild.id}_${app.user.id}`)) {
    if (invite.test(message.content)) {

      message.delete().catch(e => console.error())
      message.channel.send(`${emojis.no} Sunucuda davet linki paylaşamazsın! <@${message.author.id}>`).catch(e => console.error())
    }
  }

};
module.exports.app = {
  event: "messageCreate"
};