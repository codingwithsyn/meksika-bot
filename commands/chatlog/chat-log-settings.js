const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports.configuration = {
    name: 'cl-settings',
    aliases: ['cl-ayarla'],
};

module.exports.execute = async(client, message, args) => {

    if (!settings.author.id.some(user => message.author.id == user))
        return message.reply(`${emojis.no} \`settings\` komutunu kullanmak için gerekli izne sahip değilsiniz!`).catch(e => console.error());

    const secenek = args[0];

    if (secenek == "guncellenen-mesajlar" || secenek == "updated-messages") {

        const guncellenenMesajlar = new MessageEmbed()
            .setColor('73ffd3')
            .setDescription(`${emojis.dikkat} Güncellenen mesajlar geçmişi sistemini ayarlamak için butonları kullanmalısınız!`)

        const guncellenenMesajlarAction = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('updMsg-aktif')
                .setLabel("Aç")
                .setStyle("SUCCESS")
            )
            .addComponents(
                new MessageButton()
                .setCustomId('updMsg-pasif')
                .setLabel("Kapat")
                .setStyle("DANGER")
            )

        message.channel.send({ embeds: [guncellenenMesajlar], components: [guncellenenMesajlarAction] }).catch(e => console.error());

    } else if (secenek == "silinen-mesajlar" || secenek == "deleted-messages") {

        const silinenMesajlar = new MessageEmbed()
            .setColor('73ffd3')
            .setDescription(`${emojis.dikkat} Küfür koruma sistemini ayarlamak için butonları kullanmalısınız!`)

        const silinenMesajlarAction = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('dltMsg-aktif')
                .setLabel("Aç")
                .setStyle("SUCCESS")
            )
            .addComponents(
                new MessageButton()
                .setCustomId('dltMsg-pasif')
                .setLabel("Kapat")
                .setStyle("DANGER")
            )

        message.channel.send({ embeds: [silinenMesajlar], components: [silinenMesajlarAction] }).catch(e => console.error());

    } else {
        message.channel.send(`${emojis.no} Ayarlayacağınız sistemi belirtiniz!\n${emojis.yes} Örnek: \`${settings.app.prefix}cl-ayarla guncellenen-mesajlar/silinen-mesajlar\``).catch(e => console.error());
    }

    app.on('interactionCreate', async interaction => {
        const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });
        collector.on('collect', async i => {
            if (i.customId == 'updMsg-aktif') {
                if (!settings.author.id.some(user => i.user.id == user))
                    return message.channel.send(`${emojis.no} Yetkiniz yeterli değil. <@${i.user.id}>`).catch(e => console.error());

                if (chatlog.get(`guncellenenmesajlar_${message.guild.id}_${app.user.id}`) == true) {
                    await i.reply({ content: `${emojis.no} Güncellenen mesaj geçmişi zaten aktif! <@${i.user.id}>` }).catch(e => console.error())
                } else {
                    await i.reply({ content: `${emojis.yes} Güncellenen mesaj geçmişi başarıyla aktifleştirildi! <@${i.user.id}>` }).catch(e => console.error()).then(e => {
                        chatlog.set(`guncellenenmesajlar_${message.guild.id}_${app.user.id}`, true);

                        logs.push(`logs`,
                            `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${i.user.username} adlı yetkili güncellenen mesaj geçmişini başarıyla aktifleştirdi.`
                        );
                    });
                }
            } else if (i.customId == 'updMsg-pasif') {
                if (!settings.author.id.some(user => i.user.id == user))
                    return message.channel.send(`${emojis.no} Yetkiniz yeterli değil. <@${i.user.id}>`).catch(e => console.error());

                if (chatlog.get(`guncellenenmesajlar_${message.guild.id}_${app.user.id}`) == false) {
                    await i.reply({ content: `${emojis.no} Güncellenen mesaj geçmişi zaten devredışı! <@${i.user.id}>` }).catch(e => console.error())
                } else {
                    await i.reply({ content: `${emojis.yes} Güncellenen mesaj geçmişi başarıyla devredışı bırakıldı! <@${i.user.id}>` }).catch(e => console.error()).then(e => {
                        chatlog.set(`guncellenenmesajlar_${message.guild.id}_${app.user.id}`, false);

                        logs.push(`logs`,
                            `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${i.user.username} adlı yetkili güncellenen mesaj geçmişini başarıyla devredışı bıraktı.`
                        );
                    });
                }
            } else if (i.customId == 'dltMsg-aktif') {
                if (!settings.author.id.some(user => i.user.id == user))
                    return message.channel.send(`${emojis.no} Yetkiniz yeterli değil. <@${i.user.id}>`).catch(e => console.error());

                if (chatlog.get(`silinenmesajlar_${message.guild.id}_${app.user.id}`) == true) {
                    await i.reply({ content: `${emojis.no} Silinen mesaj geçmişi zaten aktif! <@${i.user.id}>` }).catch(e => console.error())
                } else {
                    await i.reply({ content: `${emojis.yes} Silinen mesaj geçmişi başarıyla aktifleştirildi! <@${i.user.id}>` }).catch(e => console.error()).then(e => {
                        chatlog.set(`silinenmesajlar_${message.guild.id}_${app.user.id}`, true);

                        logs.push(`logs`,
                            `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${i.user.username} adlı yetkili silinen mesaj geçmişini başarıyla aktifleştirdi.`
                        );
                    });
                }
            } else if (i.customId == 'dltMsg-pasif') {
                if (!settings.author.id.some(user => i.user.id == user))
                    return message.channel.send(`${emojis.no} Yetkiniz yeterli değil. <@${i.user.id}> <@${i.user.id}>`).catch(e => console.error());

                if (chatlog.get(`silinenmesajlar_${message.guild.id}_${app.user.id}`) == false) {
                    await i.reply({ content: `${emojis.no} Silinen mesaj geçmişi zaten devredışı!` }).catch(e => console.error())
                } else {
                    await i.reply({ content: `${emojis.yes} Silinen mesaj geçmişi devredışı bırakıldı! <@${i.user.id}>` }).catch(e => console.error()).then(e => {
                        chatlog.set(`silinenmesajlar_${message.guild.id}_${app.user.id}`, false);

                        logs.push(`logs`,
                            `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${i.user.username} adlı yetkili silinen mesaj geçmişini başarıyla devredışı bıraktı.`
                        );
                    });
                }
            }
        });
    });
};