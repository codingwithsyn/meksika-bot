const { MessageEmbed } = require(`discord.js`);

module.exports = (message) => {
  if (message.author.bot) return;
  if (chatlog.fetch(`silinenmesajlar_${message.guild.id}_${app.user.id}`)) {
    let log = app.channels.cache.get(patch.channel.chatlog)
    if (!log) return;
    let tarih = moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss");

    const deletedMessage = new MessageEmbed()
      .setColor('RANDOM')
      .setTimestamp()
      .setAuthor({ name: `${message.guild.name} - Mesaj Sistemi`, iconURL: message.guild.iconURL({ dynamic: true }) || app.user.avatarURL() })
      .setDescription(`❯ *Mesaj Sahibi;* \`${message.author.tag}\`\n❯ *Mesaj Sahibi ID;* \`${message.author.id}\`\n❯ *Mesaj Kanalı;* \`#${message.channel.name}\`\n❯ *Mesaj Kanalı ID;* \`#${message.channel.id}\`\n❯ *Silme Tarihi;* \`${tarih}\`\n❯ *Silinen Mesaj;* \`${message.content}\``)

    log.send({ embeds: [deletedMessage] }).catch(e => console.error());
  }

};
module.exports.app = {
  event: "messageDelete"
};