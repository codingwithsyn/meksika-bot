const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports.configuration = {
  name: 'blacklist',
  aliases: ['karaliste']
};

module.exports.execute = async (client, message, args) => {

  if (!settings.author.id.some(user => message.author.id == user))
    return message.reply(`${emojis.no} \`blacklist\` komutunu kullanmak için gerekli izne sahip değilsiniz!`).catch(e => console.error());

  if (args[0] == `ekle` || args[0] == `add`) {
    if (!args[1] || (args[1] && isNaN(args[1])) && app.users.cache.get(args[1]))
      return message.channel.send(`${emojis.no} Karalisteye eklenecek bir kullanıcı belirtmelisiniz, lütfen tekrar deneyin.\n${emojis.yes} Örnek: \`${settings.app.prefix}blacklist ekle/sil ID sebep\``).catch(e => console.error());

    // if(settings.author.id.some(blocked => args[1] == blocked) || app.user.id) return message.channel.send(`${emojis.no} Cesaretini tebrik ettim!`).catch(e => console.error());

    if (blacklist.fetch(`${app.user.id}.${args[1]}`)) return message.channel.send(`${emojis.no} Kullanıcı zaten karalisteye alınmış!`).catch(e => console.error());

    let sebep = args.splice(2).join(" ");
    if (!sebep)
      return message.channel.send(`${emojis.no} Kullanıcının engellenme sebebini belirtmelisiniz!\n${emojis.yes} Örnek: \`${settings.app.prefix}blacklist ekle/sil ID sebep\``).catch(e => console.error())

    blacklist.push(`${app.user.id}.${args[1]}`, {
      karaListeyeAlınanID: args[1],
      bot: app.user.id,
      sebep: sebep,
      tarih: moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss"),
      developer: message.author.id
    });

    let user = app.users.cache.get(args[1]);
    message.channel.send(`${emojis.yes} ${user.username}#${user.discriminator} **(${user.id})**, adlı kullanıcının bot erişimi engellendi!`).catch(e => console.error());

    logs.push(`logs`,
      `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${message.author.username} adlı geliştirici, ${user.username}#${user.discriminator} (${user.id}) adlı kullanıcıyı kara listeye aldı.`
    );
  } else if (args[0] == `sil` || args[0] == `delete`) {

    if (!args[1] || (args[1] && isNaN(args[1])) && app.users.cache.get(args[1]))
      return message.channel.send(`${emojis.no} Karalisteden çıkarılacak bir kullanıcı belirtmelisiniz, lütfen tekrar deneyin.\n${emojis.yes} Örnek: \`${settings.app.prefix}blacklist ekle/sil ID sebep\``).catch(e => console.error());

    if (!blacklist.fetch(`${app.user.id}.${args[1]}`)) return message.channel.send(`${emojis.no} Kullanıcı zaten karalisteye alınmamış!`).catch(e => console.error());

    let sebep = args.splice(2).join(" ");
    if (!sebep)
      return message.channel.send(`${emojis.no} Kullanıcının engel kaldırılma sebebini belirtmelisiniz!\n${emojis.yes} Örnek: \`${settings.app.prefix}blacklist ekle/sil ID sebep\``).catch(e => console.error())

    blacklist.delete(`${app.user.id}.${args[1]}`)

    let user = app.users.cache.get(args[1]);
    message.channel.send(`${emojis.yes} ${user.username}#${user.discriminator} **(${user.id})**, adlı kullanıcının bot erişim engeli kaldırıldı!`).catch(e => console.error());

    logs.push(`logs`,
      `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${message.author.username} adlı geliştirici, ${user.username}#${user.discriminator} (${user.id}) adlı kullanıcıyı kara listeden çıkardı.`
    );
  } else if (args[0] == 'sorgula' || args[0] == 'inquire') {
    if (!args[1] || (args[1] && isNaN(args[1])))
      return message.channel.send(`${emojis.no} Durum kontrolu yapılacak kullanıcıyı belirtmelisiniz!`).catch(e => console.error());

    if (blacklist.fetch(`${app.user.id}.${args[1]}`)) {
      var usr = blacklist.get(`${app.user.id}.${args[1]}`);
      const sorgula = new MessageEmbed()
        .setColor('73ffd3')
        .setAuthor({ name: `${app.user.username} - Kara Liste Sistemi`, iconURL: app.user.avatarURL() })
        .setDescription(`${usr.map(index => `**❯ Bloke Kullanıcı ID**\n• \`${index.karaListeyeAlınanID}\`\n**❯ Yasaklandığı Bot**\n• \`${index.bot}\`\n**❯ Yasaklayan Geliştirici**\n• \`${index.developer}\`\n**❯ Yasaklama Sebebi**\n• \`${index.sebep}\`\n**❯ Yasaklama Tarihi**\n• \`${index.tarih}\``)}`)
        .setTimestamp()
        .setFooter({ text: `${app.user.username} - Developed by Syn`, iconURL: app.user.avatarURL() });

      const yasakkaldir = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('yasakkaldir')
            .setLabel("Yasağı Kaldır")
            .setStyle("SUCCESS")
        )

      message.channel.send({ embeds: [sorgula], components: [yasakkaldir] }).catch(e => console.error());

      app.on('interactionCreate', async interaction => {
        const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });
        collector.on('collect', async i => {
          if (i.customId === 'yasakkaldir') {
            await i.reply({ content: `${emojis.no} Kullanıcı kara listeden başarıyla çıkarıldı!` }).catch(e => console.error()).then(e => {
              blacklist.delete(`${app.user.id}.${args[1]}`)
            });
          }
        });
      });

    } else {
      message.channel.send(`${emojis.yes} Bu kullanıcı bot komutlarından ve özelliklerinden mahrum bırakılmamış. **Şanslı biri olduğunu düşünüyorum :)**`).catch(e => console.error());
    }
  } else {
    message.channel.send(`${emojis.no} Karaliste komutunu kullanmak için bir işlem belirtmelisiniz!\n${emojis.yes} Örnek: \`${settings.app.prefix}blacklist ekle/sil ID sebep\``).catch(e => console.error());
  }
};