const { MessageEmbed } = require(`discord.js`)

module.exports.configuration = {
    name: 'isimler',
    aliases: ['isimsicil']
};

module.exports.execute = async(client, message, args) => {

        if (!settings.author.id.some(user => message.author.id === user) && !message.member.roles.cache.has(patch.guild.ownerRole) && !message.member.roles.cache.has(patch.roles.change) && !message.member.roles.cache.has(patch.roles.register))
            return message.reply("`isimler` komutunu kullanmak için gerekli izne sahip değilsin!").catch(e => console.error())

        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if (!user)
            return message.channel.send(`${emojis.no} *Komut iptal edildi, isim siciline bakılacak kullanıcıyı belirtmelisiniz!*`).catch(e => console.error())

        let member = message.guild.member(user)

        let isimler = isimlerDb.get(`user.${member.id}.isimler`) || [];

        const noRec = new MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true }) || message.guild.iconURL({ dynamic: true }) || app.user.avatarURL() })
            .setTimestamp()
            .setColor(`73ffd3`)
            .setFooter({ text: `${message.guild.name} - Developed by Syn`, iconURL: message.guild.iconURL({ dynamic: true }) || app.user.avatarURL() })
            .setDescription(`${member} adlı kullanıcının isim kayıdı bulunamadı..`)

        const rec = new MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true }) || message.guild.iconURL({ dynamic: true }) || app.user.avatarURL() })
            .setTimestamp()
            .setColor(`73ffd3`)
            .setFooter({ text: `${message.guild.name} - Developed by Syn`, iconURL: message.guild.iconURL({ dynamic: true }) || app.user.avatarURL() })
            .setDescription(`${member} adlı kullanıcının toplam **${isimler.length || 1}** isim kayıdı bulundu!\n\n${isimler.map((value, index) => `**${index+1}.** \`${patch.guild.tag} ${value.name} '${value.age}\` - ${message.guild.roles.cache.has(value.role) ? `<@&${value.role}>` : `\`${value.role}\``}`).join("\n")}`)

  isimler.length >= 1 ? message.channel.send({ embeds:[rec] }).catch(e => console.error()) : message.channel.send({ embeds:[noRec] }).catch(e => console.error());

};