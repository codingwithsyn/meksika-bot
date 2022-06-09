const { MessageEmbed } = require(`discord.js`)

module.exports.configuration = {
    name: 'isim',
    aliases: ['nc']
};

module.exports.execute = async(client, message, args) => {

        if (!settings.author.id.some(user => message.author.id === user) && !message.member.roles.cache.has(patch.guild.owner) && !message.member.roles.cache.has(patch.powers.change))
            return message.reply(`${emojis.no} \`isim\`  komutunu kullanmak için gerekli izne sahip değilsin!`).catch(e => console.error())

        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if (!user)
            return message.reply(`${emojis.no} Komut iptal edildi, ismi değiştirelecek kullanıcıyı etiketlemelisiniz!`).catch(e => console.error())

        let member = message.guild.member(user);

        if (settings.author.id.some(user => user.id === user) || user.id === message.guild.ownerID)
            return message.reply(`${emojis.no} Geliştiricimin ismini değiştiremezsiniz!`).catch(e => console.error())

        if (member.id === app.user.id || member.roles.cache.has(patch.roles.guildbot) || member.roles.cache.has(patch.roles.bots))
            return message.reply(`${emojis.no} Botların ismini değiştiremezsiniz!`).catch(e => console.error())

        if (member.permissions.has(`ADMINISTRATOR`) || member.roles.cache.has(patch.guild.ownerRole))
            return message.reply(`${emojis.no} *${member.user.username}#${member.user.discriminator}*, adlı kullanıcının ismini değiştiremezsiniz. **( Yönetim Koruması )**`).catch(e => console.error())

        if (member.roles.cache.has(patch.roles.cezali) || member.roles.cache.has(patch.roles.supheli))
            return message.reply(`${emojis.no} Cezalı olan kullanıcıların ismini değiştiremezsiniz.`).catch(e => console.error())

        let isim = args[1]
        if (!isim)
            return message.reply(`${emojis.no} Komut iptal edildi, kullanıcının ismi belirtilmemiş!`).catch(e => console.error())

        let yas = args[2]
        if (!args[2] || (args[2] && isNaN(args[2])) || Number(args[2]) < 1 || Number(args[2]) > 99)
            return message.reply(`${emojis.no} Komut iptal edildi, kullanıcının yaşı belirtilmemiş!`).catch(e => console.error())

        if (link.test(isim) || invite.test(isim))
            return message.reply(`${emojis.no} Kullanıcının ismine link ekleyemezsiniz!`).catch(e => console.error())

        if ((kufur).some(word => new RegExp("(\\b)+(" + word + ")+(\\b)", "gui").test(isim)))
            return message.reply(`${emojis.no} Kullanıcının ismine küfür ekleyemezsiniz!`).catch(e => console.error())

        var rol;
        if (member.roles.cache.has(patch.roles.erkekrol)) rol = `${patch.roles.erkekrol}`;
        else if (member.roles.cache.has(patch.roles.kadınrol)) rol = `${patch.roles.kadınrol}`;
        else rol = `Bulunamadı!`;

        isimlerDb.push(`user.${member.id}.isimler`, {
            name: isim,
            age: yas,
            role: rol,
            auth: message.author.id
        });

        member.setNickname(`${patch.guild.tag||``} ${isim} '${yas}`).catch(e => console.error())

  const isimDegistirildi = new MessageEmbed()
  .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({dynamic:true})||message.guild.iconURL({dynamic:true})||app.user.avatarURL() })
  .setDescription(`${user} adlı kullanıcının ismi **"${patch.guild.tag||``} ${isim} '${yas}"** olarak değiştirildi.`)
  .setColor(`73ffd3`)
  .setTimestamp()
  .setFooter({ text: `${message.guild.name} - Developed by Syn`, iconURL: message.guild.iconURL({dynamic:true})||app.user.avatarURL() }) 

  message.channel.send({ embeds:[isimDegistirildi] }).catch(e => console.error())

};