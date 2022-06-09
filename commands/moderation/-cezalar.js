const { MessageEmbed } = require(`discord.js`)

module.exports.configuration = {
    name: 'cezalar',
    aliases: []
};

module.exports.execute = async(client, message, args) => {

        if (!settings.author.id.some(user => message.author.id === user) && !message.member.roles.cache.has(patch.guild.owner))
            return message.reply(`${emojis.no} \`cezalar\` komutunu kullanmak için gerekli izne sahip değilsin!`).catch(e => console.error());

        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if (user) {

            let member = message.guild.member(user);
            let cezaPuan = cezalar.get(`user.${member.id}.puan`) || 0;
            let yasaklanmaSayi = cezalar.get(`user.${member.id}.ban`) || 0;
            let cezalandirilmaSayi = cezalar.get(`user.${member.id}.jail`) || 0;
            let susturulmaSayi = cezalar.get(`user.${member.id}.mute`) || 0;
            let pvnNo = cezalar.get(`user.${member.id}.cezaNo`) || [];

            const userEmbed = new MessageEmbed()
                .setColor('73ffd3')
                .setTimestamp()
                .setAuthor({ name: `${member.user.username}#${member.user.discriminator} - Ceza Bilgileri`, iconURL: member.user.avatarURL({ dynamic: true }) || message.author.avatarURL({ dynamic: true }) || message.guild.iconURL({ dynamic: true }) || app.user.avatarURL() })
                .setThumbnail(member.user.avatarURL({ dynamic: true }) || message.author.avatarURL({ dynamic: true }) || message.guild.iconURL({ dynamic: true }) || app.user.avatarURL())
                .setDescription(`❯ *Kullanıcı;* \`${member.user.username}#${member.user.discriminator}\`\n❯ *Kullanıcı ID;* \`${member.user.id}\`\n\n❯ *Yasaklanma Sayısı;* \`${yasaklanmaSayi}\`\n❯ *Cezalandırılma Sayısı;* \`${cezalandirilmaSayi}\`\n❯ *Susturulma Sayısı;* \`${susturulmaSayi}\`\n❯ *Ceza Puanı;* \`${cezaPuan}\`\n❯ *Cezalar;* \`${pvnNo.length > 0 ? pvnNo.map(m => `#${m.pnvNo}`) : 'Sicil Temiz!'}\``)
 
            message.channel.send({ embeds:[userEmbed] }).catch(e => console.error());

        } else if(cezalar.fetch(`${args[0]}.con`)) {
  
              let ceza = cezalar.get(`${args[0]}.con`);

              const cezalar = new MessageEmbed()
                .setColor('73ffd3')
                .setTimestamp()
                .setAuthor({ name:`#${args[0]} - Ceza Bilgisi`, iconURL: message.guild.iconURL({dynamic:true})||app.user.avatarURL() })
                .setThumbnail(message.guild.iconURL({dynamic:true})||app.user.avatarURL())
                .setDescription(`${ceza.map(value => `❯ *Kullanıcı;* \`${value.member}\`\n❯ *Kullanıcı ID;* \`${value.memberID}\`\n❯ *Yetkili;* \`${value.authorized}\`\n❯ *Yetkili ID;* \`${value.authorizedID}\`\n❯ *Ceza Tip;* \`${value.operation}\`\n❯ *Ceza Sebep;* \`${value.reason}\`\n❯ *Ceza Zamanı;* \`${value.time}\``)}`)
 
            message.channel.send({ embeds:[cezalar] }).catch(e => console.error());

        } else {
  
            message.reply(`${emojis.no} *Bir kullanıcı belirtmelisiniz veya CezaNo kullanarak inceleyiniz!*`).catch(e => console.error());

        }
};