const { MessageEmbed } = require(`discord.js`);

module.exports = (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  if (chatlog.fetch(`guncellenenmesajlar_${oldMessage.guild.id}_${app.user.id}`)) {
    let log = app.channels.cache.get(patch.channel.chatlog)
    if (!log) return;
    let tarih = moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss");

    const updateMessage = new MessageEmbed()
      .setColor('RANDOM')
      .setTimestamp()
      .setAuthor({ name: `${oldMessage.guild.name} - Mesaj Sistemi`, iconURL: oldMessage.guild.iconURL({ dynamic: true }) || app.user.avatarURL() })
      .setDescription(`❯ *Mesaj Sahibi;* \`${oldMessage.author.tag}\`\n❯ *Mesaj Sahibi ID;* \`${oldMessage.author.id}\`\n❯ *Mesaj Kanalı;* \`#${oldMessage.channel.name}\`\n❯ *Mesaj Kanalı ID;* \`#${oldMessage.channel.id}\`\n❯ *Değiştirme Tarihi;* \`${tarih}\`\n❯ *Eski Mesaj;* \`${oldMessage.content}\`\n❯ *Yeni Mesaj;* \`${newMessage.content}\``)

    log.send({ embeds: [updateMessage] }).catch(e => console.error());
  }

};
module.exports.app = {
  event: "messageUpdate"
};

