const { MessageEmbed } = require("discord.js");

module.exports = async (u) => {

  if (guard.fetch(`sagTikKoruma_${u.guild.id}_${app.user.id}`) == 'on') {
    const audit = await u.fetchAuditLogs({ type: `MEMBER_BAN_ADD` }).then(audit => audit.entries.first());
    const user = audit.executor;

    if (user.id == app.user.id || user.id == u.guild.ownerId || settings.author.id.some(user => user.id == user) || guard.whiteList.some(user => user.id == user)) return;

    islemYap(u.guild.id, user.id, "Sistem", "ban", "Sağ Tık Koruması");

    let log = u.channels.cache.get(guard.fetch(`sagTikKoruma_kanal_${u.guild.id}_${app.user.id}`));
    if (!log) return;

    const clickGuardEmbed = new MessageEmbed()
      .setAuthor({ name: `${app.user.username} - Sağ Tık Ban Koruması`, iconURL: app.user.avatarURL() || u.guild.iconURL({ dynamic: true }) })
      .setColor(`RANDOM`)
      .setTimestamp()
      .setDescription(`${user}, adlı kullanıcı sağ tık ban kullandığı için, sunucudan uzaklaştırdım.`);

    log.send({ embeds: [clickGuardEmbedi] }).catch(e => console.error());

    logs.push(`logs`,
      `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${user.username}#${user.discriminator} (${user.id}), adlı kullanıcı sağ tık ban kullandığı için, sunucudan uzaklaştırdım`
    );
  }
};
module.exports.app = {
  event: "guildBanAdd"
};