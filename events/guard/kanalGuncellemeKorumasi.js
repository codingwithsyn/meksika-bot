const { MessageEmbed } = require("discord.js");

module.exports = async (oldChannel, newChannel, channel) => {

  if (guard.get(`kanalKoruma_${oldChannel.guild.id}_${app.user.id}`) == 'on') {
    const audit = await oldChannel.guild.fetchAuditLogs({ type: `CHANNEL_UPDATE` }).then(audit => audit.entries.first());
    const user = audit.executor;

    if (user.id == app.user.id || user.id == oldChannel.guild.ownerId || settings.author.id.some(user => user.id == user) || guard.whiteList.some(user => user.id == user)) return;

    islemYap(oldChannel.guild.id, user.id, "Sistem", "ban", "Kanal Koruması");

    let log = oldChannel.guild.channels.cache.get(guard.fetch(`kanalKoruma_kanal_${oldChannel.guild.id}_${app.user.id}`));
    if (!log) return;

    const channelGuardEmbed = new MessageEmbed()
      .setAuthor({ name: `${app.user.username} - Kanal Güncelleme Koruması`, iconURL: app.user.avatarURL() || oldChannel.guild.iconURL({ dynamic: true }) })
      .setColor(`RANDOM`)
      .setTimestamp()
      .setDescription(`${user}, adlı kullanıcı bir kanalın ayarlarını değiştirdi, eski haline getirdim ve kullanıcıyı uzaklaştırdım.`);

    if (newChannel.type !== "GUILD_CATEGORY" && newChannel.parentID !== oldChannel.parentID) newChannel.setParent(oldChannel.parentID);

    if (newChannel.type === "GUILD_CATEGORY") {

      newChannel.edit({
        name: oldChannel.name,
      }).catch(e => console.error());

    } else if (newChannel.type === "GUILD_TEXT") {

      newChannel.edit({
        name: oldChannel.name,
        topic: oldChannel.topic,
        nsfw: oldChannel.nsfw,
        rateLimitPerUser: oldChannel.rateLimitPerUser
      }).catch(e => console.error());

    } else if (newChannel.type === "GUILD_VOICE") {

      newChannel.edit({
        name: oldChannel.name,
        bitrate: oldChannel.bitrate,
        userLimit: oldChannel.userLimit,
      }).catch(e => console.error());
    };

    log.send({ embeds: [channelGuardEmbed] }).catch(e => console.error());

    logs.push(`logs`,
      `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${user.username}#${user.discriminator} (${user.id}), adlı kullanıcı bir kanalın ayarlarını değiştirdi, eski haline getirdim ve kullanıcıyı uzaklaştırdım.`
    );
  }
};
module.exports.app = {
  event: "channelUpdate"
};