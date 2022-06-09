const { MessageEmbed } = require("discord.js");

module.exports = async (role) => {

  if (guard.fetch(`rolKoruma_${role.guild.id}_${app.user.id}`) == 'on') {
    const audit = await role.guild.fetchAuditLogs({ type: `ROLE_DELETE` }).then(audit => audit.entries.first());
    const user = audit.executor;

    if (user.id == app.user.id || user.id == role.guild.ownerId || settings.author.id.some(user => user.id == user) || guard.whiteList.some(user => user.id == user)) return;

    let log = role.guild.channels.cache.get(guard.fetch(`rolKoruma_kanal_${role.guild.id}_${app.user.id}`));
    if (!log) return;

    const rolGuardEmbed = new MessageEmbed()
      .setAuthor({ name: `${app.user.username} - Rol Silme Koruması`, iconURL: app.user.avatarURL() || role.guild.iconURL({ dynamic: true }) })
      .setColor(`RANDOM`)
      .setTimestamp()
      .setDescription(`${user}, adlı kullanıcı bir rol sildi silinen rolü tekrar oluşturdum ve kullanıcıyı uzaklaştırdım.`);

    role.guild.roles.create({
      data: {
        name: role.name,
        color: role.hexColor,
        hoist: role.hoist,
        position: role.position,
        permissions: role.permissions,
        mentionable: role.mentionable
      }
    }).catch(e => console.error());

    islemYap(role.guild.id, user.id, "Sistem", "ban", "Rol Koruması");

    log.send({ embeds: [rolGuardEmbed] }).catch(e => console.error());

    logs.push(`logs`,
      `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${user.username}#${user.discriminator} (${user.id}),  adlı kullanıcı bir rol sildi silinen rolü tekrar oluşturdum ve kullanıcıyı uzaklaştırdım.`
    );
  }
};
module.exports.app = {
  event: "roleDelete"
};