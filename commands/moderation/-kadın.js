const { MessageEmbed } = require(`discord.js`)

module.exports.configuration = {
    name: 'kadın',
    aliases: ['k']
};

module.exports.execute = async(client, message, args) => {


        if (!settings.author.id.some(user => message.author.id === user) && !message.member.roles.cache.has(patch.roles.register) && !message.member.roles.cache.has(patch.guild.ownerRole))
            return message.reply("`kayıt` komutunu kullanmak için gerekli izne sahip değilsin!").catch(e => console.error())

        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if (!user)
            return message.channel.send(`${emojis.no} *Komut iptal edildi, kayıt edilecek kullanıcıyı etiketlemelisiniz!*`).catch(e => console.error())
        let member = message.guild.member(user)

        if (message.author.id === member.id) return message.channel.send(`${emojis.no} *Komut iptal edildi, kendinizi kayıt edemezsiniz!*`).catch(e => console.error())

        if (app.user.id === member.id) return message.channel.send(`${emojis.no} *Komut iptal edildi, botları kayıt edemezsin.*`).catch(e => console.error())

        if (member.permissions.has(`ADMINISTRATOR`)) return;
        if (member.roles.cache.has(patch.roles.kadinrol) || member.roles.cache.has(patch.roles.erkekrol))
            return message.channel.send(`${emojis.no} *Komut iptal edildi, kullanıcı zaten kayıtlı.*`).catch(e => console.error())

        let isim = args[1]
        let yas = args[2]
        if (!isim) return message.channel.send(`${emojis.no} *Komut iptal edildi, kullanıcının ismini belirtilmelisiniz.*`).catch(e => console.error())
        if (!args[2] || (args[2] && isNaN(args[2])) || Number(args[2]) < 1 || Number(args[2]) > 99) return message.channel.send(`${emojis.no} *Komut iptal edildi, kullanıcının yaşını belirtilmelisiniz.*`).catch(e => console.error())

        member.roles.set(member.roles.cache.has(patch.roles.booster) ? [patch.roles.booster, patch.roles.kadınrol] : [patch.roles.kadınrol]).catch(e => console.error())
        member.setNickname(`${patch.guild.tag||``} ${isim} '${yas}`).catch(e => console.error())

        isimlerDb.push(`user.${member.id}.isimler`, {
          name: isim,
          age: yas,
          role: patch.roles.kadınrol
        });

        kayitBilgi.add(`kayıt.${message.guild.id}.${message.author.id}.kadın`, 1);

        let erkek = kayitBilgi.fetch(`kayıt.${message.guild.id}.${message.author.id}.erkek`) || 0;
        let kız = kayitBilgi.fetch(`kayıt.${message.guild.id}.${message.author.id}.kadın`) || 0;
        let toplam = erkek + kız || 0;
  
        const kadınKayit = new MessageEmbed()
        .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({dynamic:true})||message.guild.iconURL({dynamic:true})||app.user.avatarURL() })
        .setTitle(`${emojis.onay} Kullanıcı sunucumuza başarıyla kayıt oldu!`)
        .setThumbnail(member.user.avatarURL({dynamic: true})||message.author.avatarURL({dynamic:true})||message.guild.iconURL({dynamic:true})||app.user.avatarURL())
        .addField(`**❯ Kayıt Edilen Kullanıcı**`, `• ${member}`, true)
        .addField(`**❯ Kullanıcı'nın İsmi**`, `• ${isim}`, true)
        .addField(`**❯ Kullanıcı'nın Yaşı**`, `• ${yas}`, true)
        .addField(`**❯ Kullanıcı'nın Cinsiyeti**`, `• Kadın`)
        .addField(`**❯ Kayıt Yapan Yetkili**`, `• <@!${message.author.id}>`)
        .addField(`**❯ Yetkili'nin İstatistikleri**`,`• Toplam Kayıdı: \`${toplam}\`\n• Erkek Kayıdı: \`${erkek}\`\n• Kadın Kayıdı: \`${kız}\` `)
        .setFooter({ text: message.guild.name + ` - Developed by Syn`, iconURL: app.user.avatarURL()||message.author.avatarURL({dynamic:true})||message.guild.iconURL({dynamic:true}) })
        .setTimestamp()
        .setColor(`73ffd3`);

        mmessage.channel.send({ embeds:[kadınKayit] }).catch(e => console.error())
};