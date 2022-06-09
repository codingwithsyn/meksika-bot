const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports.configuration = {
  name: 'cg-settings',
  aliases: ['cg-ayarla'],
};

module.exports.execute = async (client, message, args) => {

  if (!settings.author.id.some(user => message.author.id == user))
    return message.reply(`${emojis.no} \`settings\` komutunu kullanmak için gerekli izne sahip değilsiniz!`).catch(e => console.error());

  const secenek = args[0];

  if (secenek == "baglanti-koruma" || secenek == "link-guard") {

    const baglantiKoruma = new MessageEmbed()
      .setColor('73ffd3')
      .setDescription(`${emojis.dikkat} Link koruma sistemini ayarlamak için butonları kullanmalısınız!`)

    const baglantiKorumaAction = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('baglanti-aktif')
          .setLabel("Aç")
          .setStyle("SUCCESS")
      )
      .addComponents(
        new MessageButton()
          .setCustomId('baglanti-pasif')
          .setLabel("Kapat")
          .setStyle("DANGER")
      )

    message.channel.send({ embeds: [baglantiKoruma], components: [baglantiKorumaAction] }).catch(e => console.error());

  } else if (secenek == "küfür-koruma" || secenek == "swearing-guard") {

    const kufurKoruma = new MessageEmbed()
      .setColor('73ffd3')
      .setDescription(`${emojis.dikkat} Küfür koruma sistemini ayarlamak için butonları kullanmalısınız!`)

    const kufurKorumaAction = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('kufur-aktif')
          .setLabel("Aç")
          .setStyle("SUCCESS")
      )
      .addComponents(
        new MessageButton()
          .setCustomId('kufur-pasif')
          .setLabel("Kapat")
          .setStyle("DANGER")
      )

    message.channel.send({ embeds: [kufurKoruma], components: [kufurKorumaAction] }).catch(e => console.error());

  } else if (secenek == "davet-koruma" || secenek == "invite-guard") {

    const davetKoruma = new MessageEmbed()
      .setColor('73ffd3')
      .setDescription(`${emojis.dikkat} Davet koruma sistemini ayarlamak için butonları kullanmalısınız!`)

    const davetKorumaAction = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('davet-aktif')
          .setLabel("Aç")
          .setStyle("SUCCESS")
      )
      .addComponents(
        new MessageButton()
          .setCustomId('davet-pasif')
          .setLabel("Kapat")
          .setStyle("DANGER")
      )

    message.channel.send({ embeds: [davetKoruma], components: [davetKorumaAction] }).catch(e => console.error());

  } else {
    message.channel.send(`${emojis.no} Ayarlayacağınız sistemi belirtiniz!\n${emojis.yes} Örnek: \`${settings.app.prefix}cg-ayarla baglanti-koruma/küfür-koruma/davet-koruma\``).catch(e => console.error());
  }

  app.on('interactionCreate', async interaction => {
    const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });
    collector.on('collect', async i => {
      if (i.customId == 'baglanti-aktif') {
        if (!settings.author.id.some(user => i.user.id == user))
          return message.channel.send(`${emojis.no} Yetkiniz yeterli değil. <@${i.user.id}>`).catch(e => console.error());

        if (chatguard.get(`linkkoruma_url_${message.guild.id}_${app.user.id}`) == true) {
          await i.reply({ content: `${emojis.no} Bağlantı koruma zaten aktif! <@${i.user.id}>` }).catch(e => console.error())
        } else {
          await i.reply({ content: `${emojis.yes} Bağlantı koruma başarıyla aktifleştirildi! <@${i.user.id}>` }).catch(e => console.error()).then(e => {
            chatguard.set(`linkkoruma_url_${message.guild.id}_${app.user.id}`, true);

            logs.push(`logs`,
              `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${i.user.username} adlı yetkili bağlantı koruma sistemini aktifleştirdi.`
            );
          });
        }
      } else if (i.customId == 'baglanti-pasif') {
        if (!settings.author.id.some(user => i.user.id == user))
          return message.channel.send(`${emojis.no} Yetkiniz yeterli değil. <@${i.user.id}>`).catch(e => console.error());

        if (chatguard.get(`linkkoruma_url_${message.guild.id}_${app.user.id}`) == false) {
          await i.reply({ content: `${emojis.no} Bağlantı koruma zaten devredışı! <@${i.user.id}>` }).catch(e => console.error())
        } else {
          await i.reply({ content: `${emojis.yes} Bağlantı koruma başarıyla devredışı bırakıldı! <@${i.user.id}>` }).catch(e => console.error()).then(e => {
            chatguard.set(`linkkoruma_url_${message.guild.id}_${app.user.id}`, false);

            logs.push(`logs`,
              `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${i.user.username} adlı yetkili bağlantı koruma sistemini devredışı bıraktı.`
            );
          });
        }
      } else if (i.customId == 'kufur-aktif') {
        if (!settings.author.id.some(user => i.user.id == user))
          return message.channel.send(`${emojis.no} Yetkiniz yeterli değil. <@${i.user.id}>`).catch(e => console.error());

        if (chatguard.get(`kufurkoruma_${message.guild.id}_${app.user.id}`) == true) {
          await i.reply({ content: `${emojis.no} Küfür koruma zaten aktif! <@${i.user.id}>` }).catch(e => console.error())
        } else {
          await i.reply({ content: `${emojis.yes} Küfür koruma başarıyla aktifleştirildi! <@${i.user.id}>` }).catch(e => console.error()).then(e => {
            chatguard.set(`kufurkoruma_${message.guild.id}_${app.user.id}`, true);

            logs.push(`logs`,
              `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${i.user.username} adlı yetkili küfür koruma sistemini aktifleştirdi.`
            );
          });
        }
      } else if (i.customId == 'kufur-pasif') {
        if (!settings.author.id.some(user => i.user.id == user))
          return message.channel.send(`${emojis.no} Yetkiniz yeterli değil. <@${i.user.id}> <@${i.user.id}>`).catch(e => console.error());

        if (chatguard.get(`kufurkoruma_${message.guild.id}_${app.user.id}`) == false) {
          await i.reply({ content: `${emojis.no} Küfür koruma zaten devredışı!` }).catch(e => console.error())
        } else {
          await i.reply({ content: `${emojis.yes} Küfür koruma başarıyla devredışı bırakıldı! <@${i.user.id}>` }).catch(e => console.error()).then(e => {
            chatguard.set(`kufurkoruma_${message.guild.id}_${app.user.id}`, false);

            logs.push(`logs`,
              `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${i.user.username} adlı yetkili küfür koruma sistemini devredışı bıraktı.`
            );
          });
        }
      } else if (i.customId == 'davet-aktif') {
        if (!settings.author.id.some(user => i.user.id == user))
          return message.channel.send(`${emojis.no} Yetkiniz yeterli değil. <@${i.user.id}> <@${i.user.id}>`).catch(e => console.error());

        if (chatguard.get(`linkkoruma_invite_${message.guild.id}_${app.user.id}`) == true) {
          await i.reply({ content: `${emojis.no} Davet koruma zaten aktif!` }).catch(e => console.error())
        } else {
          await i.reply({ content: `${emojis.yes} Davet koruma başarıyla aktifleştirildi! <@${i.user.id}>` }).catch(e => console.error()).then(e => {
            chatguard.set(`linkkoruma_invite_${message.guild.id}_${app.user.id}`, true);
            logs.push(`logs`,
              `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${i.user.username} adlı yetkili davet koruma sistemini aktifleştirdi.`
            );
          });
        }
      } else if (i.customId == 'davet-pasif') {
        if (!settings.author.id.some(user => i.user.id == user))
          return message.channel.send(`${emojis.no} Yetkiniz yeterli değil. <@${i.user.id}>`).catch(e => console.error());

        if (chatguard.get(`linkkoruma_invite_${message.guild.id}_${app.user.id}`) == false) {
          await i.reply({ content: `${emojis.no} Davet koruma zaten devredışı! <@${i.user.id}>` }).catch(e => console.error())
        } else {
          await i.reply({ content: `${emojis.yes} Davet koruma başarıyla devredışı bırakıldı! <@${i.user.id}>` }).catch(e => console.error()).then(e => {
            chatguard.set(`linkkoruma_invite_${message.guild.id}_${app.user.id}`, false);

            logs.push(`logs`,
              `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${i.user.username} adlı yetkili davet koruma sistemini devredışı bıraktı.`
            );
          });
        }
      }
    });
  });
};
