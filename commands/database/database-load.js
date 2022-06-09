const { MessageEmbed } = require(`discord.js`)

module.exports.configuration = {
  name: 'db-load',
  aliases: ['db-yukle']
};

module.exports.execute = async (client, message, args) => {

  if (!settings.author.id.some(user => message.author.id == user))
    return message.reply(`${emojis.no} \`load\` komutunu kullanmak için gerekli izne sahip değilsiniz!`).catch(e => console.error());

  roleSql.findOne({ guildID: message.guild.id, roleID: args[0] }, async (error, roleData) => {

    if (!roleData)
      return message.channel.send(`${emojis.no} Belirtilen rol yedeklerimde bulunamadı!`).catch(e => console.error());

    message.react(emojis.yes).catch(e => console.error());

    let yeniRol = await message.guild.roles.create({
      name: roleData.name,
      color: roleData.color,
      hoist: roleData.hoist,
      permissions: role.permissions,
      position: roleData.position,
      mentionable: roleData.mentionable
    }).catch(e => console.error());

    let roleMembers = roleData.members;
    roleMembers.forEach((member, index) => {

      let uye = message.guild.members.cache.get(member);
      if (!uye || uye.roles.cache.has(yeniRol.id)) return;

      setTimeout(() => {
        uye.roles.add(yeniRol.id).catch(e => console.error());
      }, index * 3000);
    });

    const backup = new MessageEmbed()
      .setAuthor({ name: `${app.user.username} - Load Backup`, iconURL: app.user.avatarURL() || message.guild.iconURL({ dynamic: true }) })
      .setColor(`RANDOM`)
      .setTimestamp()
      .setDescription(`${emojis.dikkat} \`${roleData.name} - (${roleData.roleID})\`, rolünün yedeği kurulmaya başlandı!\n${emojis.yes} Rol tekrar oluşturularak, üyelerine dağıtılmaya başlandı..`)

    message.channel.send({ embeds: [backup] }).catch(e => console.error());
    logs.push(`logs`,
      `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${message.author.username} adlı geliştirici ${message.guild.name} sunucusunda ${args[0]} rolünün yedeğini yükledi.`
    );
  });
};