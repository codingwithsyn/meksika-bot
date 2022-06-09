const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports.configuration = {
    name: 'src-settings',
    aliases: ['src-ayarla'],
};

module.exports.execute = async(client, message, args) => {

    if (!settings.author.id.some(user => message.author.id == user))
        return message.reply(`${emojis.no} \`settings\` komutunu kullanmak için gerekli izne sahip değilsiniz!`).catch(e => console.error());

    const secenek = args[0];
    const secenekiki = args[1];

    if (secenek == "src") {
        if (secenekiki == "kanal-ayarla") {
            if (message.guild.channels.cache.get(args[2])) {
                src.set(`src_kanal_${message.guild.id}_${app.user.id}`, kanal);
                message.channel.send(`${emojis.yes} SRC kanalı başarıyla eklendi.\n${emojis.dikkat} Kanal: <#${kanal}>`).catch(e => console.error());
            } else {
                message.channel.send(`${emojis.no} Bu kanal sunucuda bulunmamakta, lütfen id belirttiğinize emin olup tekrar deneyiniz.`).catch(e => console.error());
            }
        } else if (secenekiki == "log-kanal-ayarla") {
            if (message.guild.channels.cache.get(args[2])) {
                src.set(`src_kanal_log_${message.guild.id}_${app.user.id}`, kanal);
                message.channel.send(`${emojis.yes} SRC log kanalı başarıyla eklendi.\n${emojis.dikkat} Kanal: <#${kanal}>`).catch(e => console.error());
            } else {
                message.channel.send(`${emojis.no} Bu kanal sunucuda bulunmamakta, lütfen id belirttiğinize emin olup tekrar deneyiniz.`).catch(e => console.error());
            }
        } else {
            const src = new MessageEmbed()
                .setColor('73ffd3')
                .setDescription(`${emojis.dikkat} SRC sistemini ayarlamak için butonları kullanmalısınız!`)

            const srcAction = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('src-aktif')
                    .setLabel("Aç")
                    .setStyle("SUCCESS")
                )
                .addComponents(
                    new MessageButton()
                    .setCustomId('src-pasif')
                    .setLabel("Kapat")
                    .setStyle("DANGER")
                )
        }
        message.channel.send({ embeds: [src], components: [srcAction] }).catch(e => console.error());
    } else {
        message.channel.send(`${emojis.no} Ayarlayacağınız sistemi belirtiniz!\n${emojis.yes} Örnek: \`${settings.app.prefix}src-ayarla src log-kanal-ayarla/kanal-ayarla(opsiyonel)\``).catch(e => console.error());
    }

    app.on('interactionCreate', async interaction => {
        const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });
        collector.on('collect', async i => {
            if (i.customId == 'src-aktif') {
                if (!settings.author.id.some(user => i.user.id == user))
                    return message.channel.send(`${emojis.no} Yetkiniz yeterli değil. <@${i.user.id}>`).catch(e => console.error());

                if (src.get(`src_${message.guild.id}_${app.user.id}`) == true) {
                    await i.reply({ content: `${emojis.no} SRC zaten aktif! <@${i.user.id}>` }).catch(e => console.error())
                } else {
                    await i.reply({ content: `${emojis.yes} SRC başarıyla aktifleştirildi! <@${i.user.id}>` }).catch(e => console.error()).then(e => {
                        src.set(`src_${message.guild.id}_${app.user.id}`, true);

                        logs.push(`logs`,
                            `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${i.user.username} adlı yetkili SRC sistemini aktifleştirdi.`
                        );
                    });
                }
            } else if (i.customId == 'src-pasif') {
                if (!settings.author.id.some(user => i.user.id == user))
                    return message.channel.send(`${emojis.no} Yetkiniz yeterli değil. <@${i.user.id}>`).catch(e => console.error());

                if (src.get(`src_${message.guild.id}_${app.user.id}`) == false) {
                    await i.reply({ content: `${emojis.no} SRC zaten devredışı! <@${i.user.id}>` }).catch(e => console.error())
                } else {
                    await i.reply({ content: `${emojis.yes} SRC başarıyla devredışı bırakıldı! <@${i.user.id}>` }).catch(e => console.error()).then(e => {
                        src.set(`src_${message.guild.id}_${app.user.id}`, false);

                        logs.push(`logs`,
                            `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${i.user.username} adlı yetkili SRC sistemini devredışı bıraktı.`
                        );
                    });
                }
            }
        });
    });
};