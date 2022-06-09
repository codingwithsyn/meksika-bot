module.exports = (message) => {

  let id = message.author.id;
  if (chatguard.fetch(`kufurkoruma_${message.guild.id}_${app.user.id}`)) {

    if (message.attachments.first() || message.channel.type == `dm` || id === app.user.id || message.member.permissions.has("ADMINISTRATOR") || id === message.guild.ownerID || settings.author.id.some(user => id === user)) return;

    if ((kufurler).some(word => new RegExp("(\\b)+(" + word + ")+(\\b)", "gui").test(message.content))) {
      message.delete().catch(e => console.error())
      message.channel.send(`${emojis.no} Sunucuda küfür/argo/hakaret kullanamazsınız! <@${message.author.id}>`).catch(e => console.error())
    }
  }

};
module.exports.app = {
  event: "messageCreate"
};