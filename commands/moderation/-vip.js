const { MessageEmbed } = require(`discord.js`)

module.exports.configuration = {
    name: 'vip',
    aliases: []
};
module.exports.execute = async(client, message, args) => {

    if (!settings.author.id.some(user => message.author.id === user) && !message.member.roles.cache.has(patch.guild.owner) && !message.member.roles.cache.has(patch.powers.clown))
        return message.reply(`${emojis.no} \`vip\` komutunu kullanmak için gerekli izne sahip değilsin!`).catch(e => console.error())

    let user = message.mentions.users.first() || message.guild.members.cache.get(args[1])
    if (!user)
        return message.reply(`${emojis.no} *Komut iptal edildi, **VIP** verilecek veya alınacak kullanıcıyı etiketlemelisiniz!*`).catch(e => console.error())

    let member = message.guild.member(user);

    if (member.roles.cache.has(patch.roles.cezali))
        return message.reply(`${emojis.no} *Komut iptal edildi, kullanıcı cezalı olduğu için **VIP** veremiyorum!*`).catch(e => console.error())

    if (member.roles.cache.has(patch.roles.süpheli))
        return message.reply(`${emojis.no} *Komut iptal edildi, kullanıcı şüpheli olduğu için **VIP** veremiyorum!*`).catch(e => console.error())

    if (member.id === app.user.id || member.roles.cache.has(patch.roles.guildbot) || member.roles.cache.has(patch.roles.bots))
        return message.reply(`${emojis.no} *Düşünsene, mantıklı ol. Botlara niye **VIP** verilebilsin?*`).catch(e => console.error())

    if (args[0] === `ver`) {

        if (member.roles.cache.has(patch.roles.vip))
            return message.channel.send(`${emojis.no} *Görünüşe göre bu kullanıcıda zaten **VIP** bulunuyor.*`).catch(e => console.error())
        member.roles.add(patch.roles.vip).catch(e => console.error())

        const vipver = new MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true }) || message.guild.iconURL({ dynamic: true }) || app.user.avatarURL() })
            .setColor(`73ffd3`)
            .setTimestamp()
            .setFooter({ text: `${message.guild.name} - Developed by Syn`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setDescription(`${emojis.onay} ${member}, adlı kullanıcıya <@&${patch.roles.vip}> verildi!`)

        message.channel.send({ embeds: [vipver] }).catch(e => console.error())

    } else if (args[0] === `al`) {

        if (!member.roles.cache.has(patch.roles.vip))
            return message.channel.send(`${emojis.no} Kullanıcıda zaten VIP rolü bulunmuyor!`).catch(e => console.error())
        member.roles.remove(patch.roles.vip).catch(e => console.error())

        const vipal = new MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true }) || message.guild.iconURL({ dynamic: true }) || app.user.avatarURL() })
            .setColor(`73ffd3`)
            .setTimestamp()
            .setFooter({ text: `${message.guild.name} - Developed by Syn`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setDescription(`${emojis.onay} ${member}, adlı kullanıcının <@&${patch.roles.vip}> rolü alındı!`)

        message.channel.send({ embeds: [vipal] }).catch(e => console.error());

    } else {
        message.reply(`${emojis.no} *Komut kullanımı hatalı, **ver/al** belirtmelisiniz!*`).catch(e => console.error())
    }
};