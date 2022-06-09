const { MessageEmbed } = require("discord.js");

module.exports = async (channel) => {

  if (guard.fetch(`kanalKoruma_${channel.guild.id}_${app.user.id}`) == 'on') {
    const audit = await channel.guild.fetchAuditLogs({ type: `CHANNEL_CREATE` }).then(audit => audit.entries.first());
    const user = audit.executor;

    if (user.id == app.user.id || user.id == channel.guild.ownerId || settings.author.id.some(user => user.id == user) || guard.whiteList.some(user => user.id == user)) return;

    channel.delete().catch(e => console.error());
    islemYap(channel.guild.id, user.id, "Sistem", "ban", "Kanal Koruması");

    let log = channel.guild.channels.cache.get(guard.fetch(`kanalKoruma_kanal_${channel.guild.id}_${app.user.id}`));
    if (!log) return;

    const channelGuardEmbed = new MessageEmbed()
      .setAuthor({ name: `${app.user.username} - Kanal Oluşturma Koruması`, iconURL: app.user.avatarURL() || channel.guild.iconURL({ dynamic: true }) })
      .setColor(`RANDOM`)
      .setTimestamp()
      .setDescription(`${user}, adlı kullanıcı bir kanal oluşturdu. Oluşturulan kanalı sildim ve kullanıcıyı uzaklaştırdım.`);

    log.send({ embeds: [channelGuardEmbed] }).catch(e => console.error());

    logs.push(`logs`,
      `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${user.username}#${user.discriminator} (${user.id}), adlı kullanıcı bir kanal oluşturdu. Oluşturulan kanalı sildim ve kullanıcıyı uzaklaştırdım.`
    );
  }
};
module.exports.app = {
  event: "channelCreate"
};