const { MessageEmbed } = require("discord.js");

module.exports = async (roleOld, roleNew, role) => {

  if (guard.fetch(`rolKoruma_${roleOld.guild.id}_${app.user.id}`) == 'on') {
    const audit = await roleOld.guild.fetchAuditLogs({ type: `ROLE_UPDATE` }).then(audit => audit.entries.first());
    const user = audit.executor;

    if (user.id == app.user.id || user.id == roleOld.guild.ownerId || settings.author.id.some(user => user.id == user) || guard.whiteList.some(user => user.id == user)) return;

    let log = roleOld.guild.channels.cache.get(guard.fetch(`rolKoruma_kanal_${roleOld.guild.id}_${app.user.id}`));
    if (!log) return;

    const rolGuardEmbed = new MessageEmbed()
      .setAuthor({ name: `${app.user.username} - Rol Güncelleme Koruması`, iconURL: app.user.avatarURL() || roleOld.guild.iconURL({ dynamic: true }) })
      .setColor(`RANDOM`)
      .setTimestamp()
      .setDescription(`${user}, adlı kullanıcı rol ayarlarını değiştirdi! Eski haline getirdim ve kullanıcıyı uzaklaştırdım.`);

    roleNew.edit({
      name: roleOld.name,
      color: roleOld.hexColor,
      hoist: roleOld.hoist,
      permissions: roleOld.permissions,
      mentionable: roleOld.mentionable
    }).catch(e => console.error());

    log.send({ embeds: [rolGuardEmbed] }).catch(e => console.error());

    logs.push(`logs`,
      `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${user.username}#${user.discriminator} (${user.id}), adlı kullanıcı rol ayarlarını değiştirdi! Eski haline getirdim ve kullanıcıyı uzaklaştırdım.`
    );
  }
};
module.exports.app = {
  event: "roleUpdate"
};