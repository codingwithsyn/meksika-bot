const { MessageEmbed } = require(`discord.js`)

module.exports.configuration = {
    name: 'çek',
    aliases: ['getir']
};

module.exports.execute = async(client, message, args) => {

    if (!settings.author.id.some(user => message.author.id === user) && !message.member.roles.cache.has(patch.guild.ownerRole) && !message.member.roles.cache.has(patch.roles.move))
        return message.reply(`${emojis.no} \`çek\` komutunu kullanmak için gerekli izne sahip değilsin!`).catch(e => console.error());

    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!user)
        return message.reply(`${emojis.no} *Komut iptal edildi, kanalınıza taşınacak kullanıcıyı etiketlemelisiniz!*`).catch(e => console.error())
    let member = message.guild.member(user);

    if (!message.member.voice.channelID) return message.reply(`${emojis.no} *Komut iptal edildi, komutu kullanmak için ses kanalına bağlanmalısınız!*`).catch(e => console.error())

    if (member.id === message.author.id) return message.reply(`${emojis.no} *Kendinizi çekemezsiniz!*`).catch(e => console.error())

    if (member.id === app.user.id || member.roles.cache.has(patch.roles.guildbot) || member.roles.cache.has(patch.roles.bots))
        return message.reply(`${emojis.no} *Botları odaya çekemezsiniz!*`).catch(e => console.error())

    if (!member.voice.channelID)
        return message.reply(`${emojis.no} *Kullanıcı ses kanallarına bağlı değil!*`).catch(e => console.error())

    if (message.member.voice.channelID === member.voice.channelID)
        return message.reply(`${emojis.no} *Belirtilen kullanıcıyla aynı ses kanalındasınız!*`).catch(e => console.error())

    const moveEmbed = new MessageEmbed()
        .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true }) })
        .setTimestamp()
        .setColor(`73ffd3`)
        .setFooter({ text: `${message.guild.name} - Developed by Syn`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setDescription("<@" + user + ">, adlı kullanıcı `" + member.voice.channel.name + "` kanalından `" + message.member.voice.channel.name + "` kanalına <@" + message.member + "> adlı yetkili tarafından çekildi.")

    member.voice.setChannel(message.member.voice.channelID).catch(e => console.error())
    message.channel.send({ embeds: [moveEmbed] }).catch(e => console.error())
};