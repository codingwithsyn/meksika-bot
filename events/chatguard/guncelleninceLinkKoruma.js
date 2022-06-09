module.exports = (oldMessage, newMessage) => {

  let id = oldMessage.author.id;
  if (newMessage.attachments.first() || oldMessage.channel.type == `dm` || id === app.user.id || id === oldMessage.guild.ownerID || settings.author.id.some(user => id === user)) return;

  if (chatguard.fetch(`linkkoruma_url_${oldMessage.guild.id}_${app.user.id}`)) {

    if (link.test(newMessage.content)) {
      if (newMessage.channel.name.includes("link") || newMessage.channel.name.includes("gif") || newMessage.channel.name.includes("bot")) return;

      oldMessage.delete().catch(e => console.error())
      oldMessage.channel.send(`${emojis.no} Sunucuda izinli kanal dışında link atılmamakta! <@${oldMessage.author.id}>`).catch(e => console.error())
    }
  }

  if (chatguard.fetch(`linkkoruma_invite_${oldMessage.guild.id}_${app.user.id}`)) {
    if (invite.test(newMessage.content)) {

      oldMessage.delete().catch(e => console.error())
      oldMessage.channel.send(`${emojis.no} Sunucuda davet linki paylaşamazsın! <@${oldMessage.author.id}>`).catch(e => console.error())
    }
  }

};
module.exports.app = {
  event: "messageUpdate"
};