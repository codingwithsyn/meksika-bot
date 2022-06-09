module.exports = (oldMessage, newMessage) => {

  let id = oldMessage.author.id;
  if (chatguard.fetch(`kufurkoruma_${newMessage.guild.id}_${app.user.id}`)) {

    if (newMessage.attachments.first() || newMessage.channel.type == `dm` || id === app.user.id || id === oldMessage.guild.ownerID || settings.author.id.some(user => id === user)) return;

    if ((kufurler).some(word => new RegExp("(\\b)+(" + word + ")+(\\b)", "gui").test(newMessage.content))) {
      oldMessage.delete().catch(e => console.error())
      oldMessage.channel.send(`${emojis.no} Sunucuda küfür/argo/hakaret kullanamazsınız! <@${oldMessage.author.id}>`).catch(e => console.error())
    }
  }

};

module.exports.app = {
  event: "messageUpdate"
};