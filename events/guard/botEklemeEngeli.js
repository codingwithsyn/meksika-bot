const { MessageEmbed } = require("discord.js");

module.exports = async (kisi) => {

  if (guard.get(`botEklemeEngeli_${kisi.guild.id}_${app.user.id}`) == 'on' && kisi.user.bot) {

    islemYap(kisi.guild.id, kisi.user.id, "Sistem", "ban", "Bot Koruması");
    let log = kisi.guild.channels.cache.get(guard.get(`botEklemeEngeli_kanal_${kisi.guild.id}_${app.user.id}`));
    if (!log) return;

    const botGuardEmbed = new MessageEmbed()
      .setAuthor({ name: `${app.user.username} - Bot Ekleme Koruması`, iconURL: app.user.avatarURL() })
      .setTimestamp()
      .setColor(`RANDOM`)
      .setDescription(`Sunucuya bir bot eklendi, eklenilen botu sunucudan uzaklaştırdım!\nEğer kontrollü bir şekilde bot eklemek istiyorsanız geliştiricime ulaşın!\nBot bilgileri: \`${kisi.user.tag} (${kisi.user.id})\``)
    log.send({ embeds: [botGuardEmbed] }).catch(e => console.error())
    logs.push(`logs`,
      `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${kisi.guild.name} adlı sunucuya bir bot eklendi, eklenilen botu sunucudan uzaklaştırdım! Bot bilgileri: ${kisi.user.tag} (${kisi.user.id})`
    );
  }
};

module.exports.app = {
  event: "guildMemberAdd"
};