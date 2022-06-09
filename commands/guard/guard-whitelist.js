const { MessageEmbed } = require(`discord.js`);

module.exports.configuration = {
  name: 'g-whitelist',
  aliases: ['g-guvenliler']
};

module.exports.execute = async (client, message, args) => {

  if (!settings.author.id.some(user => message.author.id == user))
    return message.reply(`${emojis.no} \`server\` komutunu kullanmak için gerekli izne sahip değilsiniz!`).catch(e => console.error());

  let guvenliler = guard.whiteList || [];

  if (args[0] == 'liste' || args[0] == 'list') {

    const whiteList = new MessageEmbed()
      .setAuthor({ name: `${app.user.username} - Güvenli Kullanıcı Liste`, iconURL: app.user.avatarURL() || message.guild.iconURL({ dynamic: true }) })
      .setColor(`RANDOM`)
      .setTimestamp()
      .setDescription(`**Güvenli listede bulunan tüm kullanıcılar aşağı listelenmiştir!**\n\n${guvenliler.length > 0 ? guvenliler.map(u => message.guild.members.cache.get(u) ? `${message.guild.members.cache.get(u)}` : `\`${u}\``).join(', ') : "`Bulunamadı!`"}`)
      .setFooter({ name: message.guild.name + ` - Developed by Syn`, iconURL: app.user.avatarURL() || message.author.avatarURL({ dynamic: true }) || message.guild.iconURL({ dynamic: true }) })

    message.channel.send({ embeds: [whiteList] }).catch(e => console.erorr());

  } else {

    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send(`${emojis.no} Güvenli listeye eklemek/kaldırmak için bir üye belirtmelisiniz!`).catch(e => console.error());
    let uye = message.guild.member(user);

    if (guvenliler.some(u => u.includes(uye.id))) {
      guvenliler = guvenliler.filter(u => !u.includes(uye.id));
      guard.whiteList = guvenliler;
      dosyaGuncelle('./json/guard.json', guard);
      message.channel.send(`${emojis.yes} *${uye.user.username}#${uye.user.discriminator}* (${uye.id}), adlı kullanıcı başarıyla güvenli listeden çıkarıldı!`).catch(e => console.error());
      logs.push(`logs`,
        `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${message.author.username} adlı geliştirici ${uye.user.username}#${uye.user.discriminator} (${uye.id}) adlı kullanıcıyı güvenli listeden çıkardı.`
      );
    } else {
      guard.whiteList.push(`${uye.id}`);
      dosyaGuncelle('./json/guard.json', guard);
      message.channel.send(`${emojis.yes} *${uye.user.username}#${uye.user.discriminator}* (${uye.id}), adlı kullanıcı başarıyla güvenli listeye eklendi!`).catch(e => console.error());
      logs.push(`logs`,
        `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${message.author.username} adlı geliştirici ${uye.user.username}#${uye.user.discriminator} (${uye.id}) adlı kullanıcıyı güvenli listeye ekledi.`
      );
    };
  };

};
