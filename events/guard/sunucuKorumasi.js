const { MessageEmbed } = require("discord.js");

module.exports = async (oldServer, newServer, server) => {

  if (guard.fetch(`sunucuKoruma_${u.guild.id}_${app.user.id}`) == 'on') {
    const audit = await oldServer.fetchAuditLogs({ type: `GUILD_UPDATE` }).then(audit => audit.entries.first());
    const user = audit.executor;

    if (user.id == app.user.id || user.id == oldServer.ownerId || settings.author.id.some(user => user.id == user) || guard.whiteList.some(user => user.id == user)) return;

    let log = oldServer.channels.cache.get(guard.fetch(`sunucuKoruma_kanal_${u.guild.id}_${app.user.id}`));
    if (!log) return;

    const islemYasakla = function () {
      return islemYap(oldServer.id, user.id, "Sistem", "ban", "Sunucu Koruması");
    };

    const serverGuardEmbed = new MessageEmbed()
      .setAuthor({ name: `${app.user.username} - Sunucu Koruması`, iconURL: app.user.avatarURL() || oldServer.iconURL({ dynamic: true }) })
      .setColor(`RANDOM`)
      .setTimestamp();

    if (oldServer.name != newServer.name) {
      oldServer.edit({
        name: oldServer.name
      }).catch(e => console.error());

      islemYasakla();
      log.send({ embeds: [serverGuardEmbed.setDescription(`${user}, adlı kullanıcı sunucu adını değiştirdi, eski haline getirip kullanıcıyı uzaklaştırdım.`)] }).catch(e => console.error());

      logs.push(`logs`,
        `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${user.username}#${user.discriminator} (${user.id}), adlı kullanıcı sunucu adını değiştirdi, eski haline getirip kullanıcıyı uzaklaştırdım.`
      );
    }

    if (oldServer.icon != newServer.icon) {
      oldServer.edit({
        icon: oldServer.icon
      }).catch(e => console.error());

      islemYasakla();
      log.send({ embeds: [serverGuardEmbed.setDescription(`${user}, adlı kullanıcı sunucu profilini değiştirdi, eski haline getirip kullanıcıyı uzaklaştırdım.`)] }).catch(e => console.error());

      logs.push(`logs`,
        `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${user.username}#${user.discriminator} (${user.id}), adlı kullanıcı sunucu profilini değiştirdi, eski haline getirip kullanıcıyı uzaklaştırdım.`
      );
    }

    if (oldServer.banner != newServer.banner) {
      oldServer.edit({
        banner: oldServer.banner
      }).catch(e => console.error());

      islemYasakla();
      log.send({ embeds: [serverGuardEmbed.setDescription(`${user}, adlı kullanıcı sunucu duvar kağıdını değiştirdi, eski haline getirip kullanıcıyı uzaklaştırdım.`)] }).catch(e => console.error());

      logs.push(`logs`,
        `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${user.username}#${user.discriminator} (${user.id}), adlı kullanıcı sunucu duvar kağıdını değiştirdi, eski haline getirip kullanıcıyı uzaklaştırdım.`
      );
    }

    if (oldServer.description != newServer.description) {
      oldServer.edit({
        description: oldServer.description
      }).catch(e => console.error());

      islemYasakla();
      log.send({ embeds: [serverGuardEmbed.setDescription(`${user}, adlı kullanıcı sunucu açıklamasını değiştirdi, eski haline getirip kullanıcıyı uzaklaştırdım.`)] }).catch(e => console.error());

      logs.push(`logs`,
        `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${user.username}#${user.discriminator} (${user.id}), adlı kullanıcı sunucu açıklamasını değiştirdi, eski haline getirip kullanıcıyı uzaklaştırdım.`
      );
    }

    if (oldServer.vanityURLCode != newServer.vanityURLCode) {
      oldServer.edit({
        vanityURLCode: oldServer.vanityURLCode
      }).catch(e => console.error());

      islemYasakla();
      log.send({ embeds: [serverGuardEmbed.setDescription(`${user}, adlı kullanıcı sunucu özel adresini değiştirdi, eski haline getirip kullanıcıyı uzaklaştırdım.`)] }).catch(e => console.error());

      logs.push(`logs`,
        `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${user.username}#${user.discriminator} (${user.id}), adlı kullanıcı sunucu özel adresini değiştirdi, eski haline getirip kullanıcıyı uzaklaştırdım.`
      );
    }

    if (oldServer.nsfwLevel != newServer.nsfwLevel) {
      oldServer.edit({
        nsfwLevel: oldServer.nsfwLevel
      }).catch(e => console.error());

      islemYasakla();
      log.send({ embeds: [serverGuardEmbed.setDescription(`${user}, adlı kullanıcı sunucu NSFW ayarlarını değiştirdi, eski haline getirip kullanıcıyı uzaklaştırdım.`)] }).catch(e => console.error());

      logs.push(`logs`,
        `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${user.username}#${user.discriminator} (${user.id}), adlı kullanıcı sunucu NSFW ayarlarını değiştirdi, eski haline getirip kullanıcıyı uzaklaştırdım.`
      );
    }

    if (oldServer.afkTimeout != newServer.afkTimeout) {
      oldServer.edit({
        afkTimeout: oldServer.afkTimeout
      }).catch(e => console.error());

      islemYasakla();
      log.send({ embeds: [serverGuardEmbed.setDescription(`${user}, adlı kullanıcı sunucu AFK süresini değiştirdi, eski haline getirip kullanıcıyı uzaklaştırdım.`)] }).catch(e => console.error());

      logs.push(`logs`,
        `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${user.username}#${user.discriminator} (${user.id}), adlı kullanıcı sunucu AFK süresini değiştirdi, eski haline getirip kullanıcıyı uzaklaştırdım.`
      );
    }

    if (oldServer.afkChannelId != newServer.afkChannelId) {
      oldServer.edit({
        afkChannelId: oldServer.afkChannelId
      }).catch(e => console.error());

      islemYasakla();
      log.send({ embeds: [serverGuardEmbed.setDescription(`${user}, adlı kullanıcı sunucu AFK kanalını değiştirdi, eski haline getirip kullanıcıyı uzaklaştırdım.`)] }).catch(e => console.error());

      logs.push(`logs`,
        `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${user.username}#${user.discriminator} (${user.id}), adlı kullanıcı sunucu AFK kanalını değiştirdi, eski haline getirip kullanıcıyı uzaklaştırdım.`
      );
    }
  }
};

module.exports.app = {
  event: "guildUpdate"
};