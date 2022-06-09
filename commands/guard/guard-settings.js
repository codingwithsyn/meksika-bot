const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports.configuration = {
  name: 'g-settings',
  aliases: ['g-ayarla'],
};

module.exports.execute = async (client, message, args) => {

  if (!settings.author.id.some(user => message.author.id == user))
    return message.reply(`${emojis.no} \`settings\` komutunu kullanmak için gerekli izne sahip değilsiniz!`).catch(e => console.error());

  const secenek = args[0];
  const secenekiki = args[1];
  const kanal = args[2];

  if(secenek == "liste" || secenek == "list") {
      
    var botEklemeEngeli = guard.get(`botEklemeEngeli_${message.guild.id}_${app.user.id}`) == "on" ? "Aktif" : "Pasif";
    var kanalKorumaEngeli = guard.get(`kanalKoruma_${message.guild.id}_${app.user.id}`) == "on" ? "Aktif" : "Pasif";
    var rolKorumaEngeli = guard.get(`rolKoruma_${message.guild.id}_${app.user.id}`) == "on" ? "Aktif" : "Pasif";
    var sunucuKorumaEngeli = guard.get(`sunucuKoruma_${message.guild.id}_${app.user.id}`) == "on" ? "Aktif" : "Pasif";
    var sagTikKorumaEngeli = guard.get(`sagTikKoruma_${message.guild.id}_${app.user.id}`) == "on" ? "Aktif" : "Pasif";
    
    var botEklemeKanali = message.guild.channels.cache.get(guard.get(`botEklemeEngeli_kanal_${message.guild.id}_${app.user.id}`)) ? message.guild.channels.cache.get(guard.get(`botEklemeEngeli_kanal_${message.guild.id}_${app.user.id}`)).name : "Bulunmamakta";
    var kanalKorumaKanali = message.guild.channels.cache.get(guard.get(`kanalKoruma_kanal_${message.guild.id}_${app.user.id}`)) ? message.guild.channels.cache.get(guard.get(`kanalKoruma_kanal_${message.guild.id}_${app.user.id}`)).name : "Bulunmamakta";
    var rolKorumaKanali = message.guild.channels.cache.get(guard.get(`rolKoruma_kanal_${message.guild.id}_${app.user.id}`)) ? message.guild.channels.cache.get(guard.get(`rolKoruma_kanal_${message.guild.id}_${app.user.id}`)).name : "Bulunmamakta";
    var sunucuKorumaKanali = message.guild.channels.cache.get(guard.get(`sunucuKoruma_kanal_${message.guild.id}_${app.user.id}`)) ? message.guild.channels.cache.get(guard.get(`sunucuKoruma_kanal_${message.guild.id}_${app.user.id}`)).name : "Bulunmamakta";
    var sagTikKorumaKanali = message.guild.channels.cache.get(guard.get(`sagTikKoruma_kanal_${message.guild.id}_${app.user.id}`)) ? message.guild.channels.cache.get(guard.get(`sagTikKoruma_kanal_${message.guild.id}_${app.user.id}`)).name : "Bulunmamakta";

      const liste = new MessageEmbed()
        .setAuthor({ name: `${app.user.username} - Koruma Ayarları`, iconURL:app.user.avatarURL()||message.guild.iconURL({dynamic:true})})
        .setColor('73ffd3')
        .setTimestamp()
        .setFooter({ text: `${message.guild.name} - Developed by Syn`, iconURL: app.user.avatarURL()||message.guild.iconURL({dynamic:true})})
        .addFields(
          { name:`**❯ Sistemler**`, value:`• Bot Koruma: \`${botEklemeEngeli}\`\n• Kanal Koruma: \`${kanalKorumaEngeli}\`\n• Rol Koruma: \`${rolKorumaEngeli}\`\n• Sunucu Koruma: \`${sunucuKorumaEngeli}\`\n• Sağ Tık Koruma: \`${sagTikKorumaEngeli}\``, inline: true},
          { name:`**❯ Kanallar**`, value:`• Bot Koruma Kanalı: \`${botEklemeKanali}\`\n• Kanal Koruma Kanalı: \`${kanalKorumaKanali}\`\n• Rol Koruma Kanalı: \`${rolKorumaKanali}\`\n• Sunucu Koruma Kanalı: \`${sunucuKorumaKanali}\`\n• Sağ Tık Koruma Kanalı: \`${sagTikKorumaKanali}\``, inline: true }
        )
      const listeAction = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel("Meksika Website")
            .setStyle("LINK")
            .setURL("https://codingwithsyn.xyz/meksika-bot")
        )
      message.channel.send({ embeds: [liste], components: [listeAction] })

  } else if (secenek == "bot-koruma" || secenek == "bot-guard") {
    if (secenekiki == "kanal-ayarla") {
      if (message.guild.channels.cache.get(args[2])) {
        guard.set(`botEklemeEngeli_kanal_${message.guild.id}_${app.user.id}`, kanal);
        message.channel.send(`${emojis.yes} Bot ekleme kanalı başarıyla eklendi.\n${emojis.dikkat} Kanal: <#${kanal}>`).catch(e => console.error());
      } else {
        message.channel.send(`${emojis.no} Bu kanal sunucuda bulunmamakta, lütfen id belirttiğinize emin olup tekrar deneyiniz.`).catch(e => console.error());
      }
    } else {
      const botEklemeKoruma = new MessageEmbed()
        .setColor('73ffd3')
        .setDescription(`${emojis.dikkat} Bot koruma sistemini ayarlamak için butonları kullanmalısınız!`)

      const botEklemeKorumaAction = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bot-engeli-aktif')
            .setLabel("Aç")
            .setStyle("SUCCESS")
        )
        .addComponents(
          new MessageButton()
            .setCustomId('bot-engeli-pasif')
            .setLabel("Kapat")
            .setStyle("DANGER")
        )
      message.channel.send({ embeds: [botEklemeKoruma], components: [botEklemeKorumaAction] }).catch(e => console.error());
    }
  } else if (secenek == "kanal-koruma" || secenek == "channel-guard") {
    if (secenekiki == "kanal-ayarla") {
      if (message.guild.channels.cache.get(args[2])) {
        guard.set(`kanalKoruma_kanal_${message.guild.id}_${app.user.id}`, kanal);
        message.channel.send(`${emojis.yes} Kanal koruma kanalı başarıyla eklendi.\n${emojis.dikkat} Kanal: <#${kanal}>`).catch(e => console.error());
      } else {
        message.channel.send(`${emojis.no} Bu kanal sunucuda bulunmamakta, lütfen id belirttiğinize emin olup tekrar deneyiniz.`).catch(e => console.error());
      }
    } else {
      const kanalKoruma = new MessageEmbed()
        .setColor('73ffd3')
        .setDescription(`${emojis.dikkat} Kanal koruma sistemini ayarlamak için butonları kullanmalısınız!`)

      const kanalKorumaAction = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('kanal-engeli-aktif')
            .setLabel("Aç")
            .setStyle("SUCCESS")
        )
        .addComponents(
          new MessageButton()
            .setCustomId('kanal-engeli-pasif')
            .setLabel("Kapat")
            .setStyle("DANGER")
        )
      message.channel.send({ embeds: [kanalKoruma], components: [kanalKorumaAction] }).catch(e => console.error());
    }
  } else if (secenek == "rol-koruma" || secenek == "role-guard") {
    if (secenekiki == "kanal-ayarla") {
      if (message.guild.channels.cache.get(args[2])) {
        guard.set(`rolKoruma_kanal_${message.guild.id}_${app.user.id}`, kanal);
        message.channel.send(`${emojis.yes} Rol koruma kanalı başarıyla eklendi.\n${emojis.dikkat} Kanal: <#${kanal}>`).catch(e => console.error());
      } else {
        message.channel.send(`${emojis.no} Bu kanal sunucuda bulunmamakta, lütfen id belirttiğinize emin olup tekrar deneyiniz.`).catch(e => console.error());
      }
    } else {
      const rolKoruma = new MessageEmbed()
        .setColor('73ffd3')
        .setDescription(`${emojis.dikkat} Rol koruma sistemini ayarlamak için butonları kullanmalısınız!`)

      const rolKorumaAction = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('rol-engeli-aktif')
            .setLabel("Aç")
            .setStyle("SUCCESS")
        )
        .addComponents(
          new MessageButton()
            .setCustomId('rol-engeli-pasif')
            .setLabel("Kapat")
            .setStyle("DANGER")
        )
      message.channel.send({ embeds: [rolKoruma], components: [rolKorumaAction] }).catch(e => console.error());
    }
  } else if (secenek == "sunucu-koruma" || secenek == "server-guard") {
    if (secenekiki == "kanal-ayarla") {
      if (message.guild.channels.cache.get(args[2])) {
        guard.set(`sunucuKoruma_kanal_${message.guild.id}_${app.user.id}`, kanal);
        message.channel.send(`${emojis.yes} Sunucu koruma kanalı başarıyla eklendi.\n${emojis.dikkat} Kanal: <#${kanal}>`).catch(e => console.error());
      } else {
        message.channel.send(`${emojis.no} Bu kanal sunucuda bulunmamakta, lütfen id belirttiğinize emin olup tekrar deneyiniz.`).catch(e => console.error());
      }
    } else {
      const sunucuKoruma = new MessageEmbed()
        .setColor('73ffd3')
        .setDescription(`${emojis.dikkat} Sunucu koruma sistemini ayarlamak için butonları kullanmalısınız!`)

      const sunucuKorumaAction = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('sunucu-engeli-aktif')
            .setLabel("Aç")
            .setStyle("SUCCESS")
        )
        .addComponents(
          new MessageButton()
            .setCustomId('sunucu-engeli-pasif')
            .setLabel("Kapat")
            .setStyle("DANGER")
        )
      message.channel.send({ embeds: [sunucuKoruma], components: [sunucuKorumaAction] }).catch(e => console.error());
    }
  } else if (secenek == "sagtik-koruma" || secenek == "sagtik-guard") {
    if (secenekiki == "kanal-ayarla") {
      if (message.guild.channels.cache.get(args[2])) {
        guard.set(`sagTikKoruma_kanal_${message.guild.id}_${app.user.id}`, kanal);
        message.channel.send(`${emojis.yes} Sağ tık koruma kanalı başarıyla eklendi.\n${emojis.dikkat} Kanal: <#${kanal}>`).catch(e => console.error());
      } else {
        message.channel.send(`${emojis.no} Bu kanal sunucuda bulunmamakta, lütfen id belirttiğinize emin olup tekrar deneyiniz.`).catch(e => console.error());
      }
    } else {
      const sagTikKoruma = new MessageEmbed()
        .setColor('73ffd3')
        .setDescription(`${emojis.dikkat} Sağ tık koruma sistemini ayarlamak için butonları kullanmalısınız!`)

      const sagTikKorumaAction = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('sagtik-engeli-aktif')
            .setLabel("Aç")
            .setStyle("SUCCESS")
        )
        .addComponents(
          new MessageButton()
            .setCustomId('sagtik-engeli-pasif')
            .setLabel("Kapat")
            .setStyle("DANGER")
        )
      message.channel.send({ embeds: [sagTikKoruma], components: [sagTikKorumaAction] }).catch(e => console.error());
    }
  } else {
    message.channel.send(`${emojis.no} Ayarlayacağınız sistemi belirtiniz!\n${emojis.yes} Örnek: \`${settings.app.prefix}g-ayarla <sistem>-koruma kanal-ayarla(opsiyonel)\``).catch(e => console.error());
  }

  app.on('interactionCreate', async interaction => {
    const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });
    collector.on('collect', async i => {
      if (i.customId == 'bot-engeli-aktif') {
        if (!settings.author.id.some(user => i.user.id == user))
          return message.channel.send(`${emojis.no} Yetkiniz yeterli değil. <@${i.user.id}>`).catch(e => console.error());

        if (guard.get(`botEklemeEngeli_${message.guild.id}_${app.user.id}`) == "on") {
          await i.reply({ content: `${emojis.no} Bağlantı koruma zaten aktif! <@${i.user.id}>` }).catch(e => console.error())
        } else {
          await i.reply({ content: `${emojis.yes} Bağlantı koruma başarıyla aktifleştirildi! <@${i.user.id}>` }).catch(e => console.error()).then(e => {
            guard.set(`botEklemeEngeli_${message.guild.id}_${app.user.id}`, "on");

            logs.push(`logs`,
              `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${i.user.username} adlı yetkili bot koruma sistemini aktifleştirdi.`
            );
          });
        }
      } else if (i.customId == 'bot-engeli-pasif') {
        if (!settings.author.id.some(user => i.user.id == user))
          return message.channel.send(`${emojis.no} Yetkiniz yeterli değil. <@${i.user.id}>`).catch(e => console.error());

        if (guard.get(`botEklemeEngeli_${message.guild.id}_${app.user.id}`) == "off") {
          await i.reply({ content: `${emojis.no} Bot koruma zaten devredışı! <@${i.user.id}>` }).catch(e => console.error())
        } else {
          await i.reply({ content: `${emojis.yes} Bot koruma başarıyla devredışı bırakıldı! <@${i.user.id}>` }).catch(e => console.error()).then(e => {
            guard.set(`botEklemeEngeli_${message.guild.id}_${app.user.id}`, "off");

            logs.push(`logs`,
              `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${i.user.username} adlı yetkili bot koruma sistemini devredışı bıraktı.`
            );
          });
        }
      } else if (i.customId == 'kanal-engeli-aktif') {
        if (!settings.author.id.some(user => i.user.id == user))
          return message.channel.send(`${emojis.no} Yetkiniz yeterli değil. <@${i.user.id}>`).catch(e => console.error());

        if (guard.get(`kanalKoruma_${message.guild.id}_${app.user.id}`) == "on") {
          await i.reply({ content: `${emojis.no} Kanal koruma zaten aktif! <@${i.user.id}>` }).catch(e => console.error())
        } else {
          await i.reply({ content: `${emojis.yes} Kanal koruma başarıyla aktifleştirildi! <@${i.user.id}>` }).catch(e => console.error()).then(e => {
            guard.set(`kanalKoruma_${message.guild.id}_${app.user.id}`, "on");

            logs.push(`logs`,
              `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${i.user.username} adlı yetkili kanal koruma sistemini aktifleştirdi.`
            );
          });
        }
      } else if (i.customId == 'kanal-engeli-pasif') {
        if (!settings.author.id.some(user => i.user.id == user))
          return message.channel.send(`${emojis.no} Yetkiniz yeterli değil. <@${i.user.id}>`).catch(e => console.error());

        if (guard.get(`kanalKoruma_${message.guild.id}_${app.user.id}`) == "off") {
          await i.reply({ content: `${emojis.no} Kanal koruma zaten devredışı! <@${i.user.id}>` }).catch(e => console.error())
        } else {
          await i.reply({ content: `${emojis.yes} Kanal koruma başarıyla devredışı bırakıldı! <@${i.user.id}>` }).catch(e => console.error()).then(e => {
            guard.set(`kanalKoruma_${message.guild.id}_${app.user.id}`, "off");

            logs.push(`logs`,
              `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${i.user.username} adlı yetkili kanal koruma sistemini devredışı bıraktı.`
            );
          });
        }
      } else if (i.customId == 'rol-engeli-aktif') {
        if (!settings.author.id.some(user => i.user.id == user))
          return message.channel.send(`${emojis.no} Yetkiniz yeterli değil. <@${i.user.id}>`).catch(e => console.error());

        if (guard.get(`rolKoruma_${message.guild.id}_${app.user.id}`) == "on") {
          await i.reply({ content: `${emojis.no} Rol koruma zaten aktif! <@${i.user.id}>` }).catch(e => console.error())
        } else {
          await i.reply({ content: `${emojis.yes} Rol koruma başarıyla aktifleştirildi! <@${i.user.id}>` }).catch(e => console.error()).then(e => {
            guard.set(`rolKoruma_${message.guild.id}_${app.user.id}`, "on");

            logs.push(`logs`,
              `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${i.user.username} adlı yetkili rol koruma sistemini aktifleştirdi.`
            );
          });
        }
      } else if (i.customId == 'rol-engeli-pasif') {
        if (!settings.author.id.some(user => i.user.id == user))
          return message.channel.send(`${emojis.no} Yetkiniz yeterli değil. <@${i.user.id}>`).catch(e => console.error());

        if (guard.get(`rolKoruma_${message.guild.id}_${app.user.id}`) == "off") {
          await i.reply({ content: `${emojis.no} Rol koruma zaten devredışı! <@${i.user.id}>` }).catch(e => console.error())
        } else {
          await i.reply({ content: `${emojis.yes} Rol koruma başarıyla devredışı bırakıldı! <@${i.user.id}>` }).catch(e => console.error()).then(e => {
            guard.set(`rolKoruma_${message.guild.id}_${app.user.id}`, "off");

            logs.push(`logs`,
              `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${i.user.username} adlı yetkili rol koruma sistemini devredışı bıraktı.`
            );
          });
        }
      } else if (i.customId == 'sunucu-engeli-aktif') {
        if (!settings.author.id.some(user => i.user.id == user))
          return message.channel.send(`${emojis.no} Yetkiniz yeterli değil. <@${i.user.id}>`).catch(e => console.error());

        if (guard.get(`sunucuKoruma_${message.guild.id}_${app.user.id}`) == "on") {
          await i.reply({ content: `${emojis.no} Sunucu koruma zaten aktif! <@${i.user.id}>` }).catch(e => console.error())
        } else {
          await i.reply({ content: `${emojis.yes} Sunucu koruma başarıyla aktifleştirildi! <@${i.user.id}>` }).catch(e => console.error()).then(e => {
            guard.set(`sunucuKoruma_${message.guild.id}_${app.user.id}`, "on");

            logs.push(`logs`,
              `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${i.user.username} adlı yetkili sunucu koruma sistemini aktifleştirdi.`
            );
          });
        }
      } else if (i.customId == 'sunucu-engeli-pasif') {
        if (!settings.author.id.some(user => i.user.id == user))
          return message.channel.send(`${emojis.no} Yetkiniz yeterli değil. <@${i.user.id}>`).catch(e => console.error());

        if (guard.get(`sunucuKoruma_${message.guild.id}_${app.user.id}`) == "off") {
          await i.reply({ content: `${emojis.no} Sunucu koruma zaten devredışı! <@${i.user.id}>` }).catch(e => console.error())
        } else {
          await i.reply({ content: `${emojis.yes} Sunucu koruma başarıyla devredışı bırakıldı! <@${i.user.id}>` }).catch(e => console.error()).then(e => {
            guard.set(`sunucuKoruma_${message.guild.id}_${app.user.id}`, "off");

            logs.push(`logs`,
              `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${i.user.username} adlı yetkili sunucu koruma sistemini devredışı bıraktı.`
            );
          });
        }
      } else if (i.customId == 'sagtik-engeli-aktif') {
        if (!settings.author.id.some(user => i.user.id == user))
          return message.channel.send(`${emojis.no} Yetkiniz yeterli değil. <@${i.user.id}>`).catch(e => console.error());

        if (guard.get(`sagTikKoruma_${message.guild.id}_${app.user.id}`) == "on") {
          await i.reply({ content: `${emojis.no} Sağ tık koruma zaten aktif! <@${i.user.id}>` }).catch(e => console.error())
        } else {
          await i.reply({ content: `${emojis.yes} Sağ tık koruma başarıyla aktifleştirildi! <@${i.user.id}>` }).catch(e => console.error()).then(e => {
            guard.set(`sagTikKoruma_${message.guild.id}_${app.user.id}`, "on");

            logs.push(`logs`,
              `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${i.user.username} adlı yetkili sağ tık koruma sistemini aktifleştirdi.`
            );
          });
        }
      } else if (i.customId == 'sagtik-engeli-pasif') {
        if (!settings.author.id.some(user => i.user.id == user))
          return message.channel.send(`${emojis.no} Yetkiniz yeterli değil. <@${i.user.id}>`).catch(e => console.error());

        if (guard.get(`sagTikKoruma_${message.guild.id}_${app.user.id}`) == "off") {
          await i.reply({ content: `${emojis.no} Sağ tık koruma zaten devredışı! <@${i.user.id}>` }).catch(e => console.error())
        } else {
          await i.reply({ content: `${emojis.yes} Sağ tık koruma başarıyla devredışı bırakıldı! <@${i.user.id}>` }).catch(e => console.error()).then(e => {
            guard.set(`sagTikKoruma_${message.guild.id}_${app.user.id}`, "off");

            logs.push(`logs`,
              `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${i.user.username} adlı yetkili sağ tık koruma sistemini devredışı bıraktı.`
            );
          });
        }
      }
    });
  });
};
