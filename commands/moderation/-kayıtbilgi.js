const { MessageEmbed } = require(`discord.js`)

module.exports.configuration = {
    name: 'kayıtbilgi',
    aliases: ['kbilgi']
};

module.exports.execute = async(client, message, args) => {

    if (!settings.author.id.some(user => message.author.id === user) && !message.member.roles.cache.has(patch.guild.ownerRole) && !message.member.roles.cache.has(patch.powers.register))
        return message.reply("`kayıtbilgi` komutunu kullanmak için gerekli izne sahip değilsin!").catch(e => console.error())

    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!user)
        return message.channel.send(`${emojis.no} *Kayıt bilgisi gösterilecek kullanıcıyı etiketlemelisiniz!*`).catch(e => console.error())

    let member = message.guild.member(user)

    if (user.id === app.user.id) return message.channel.send(`${emojis.no} *Botların kayıt bilgisine bakamazınız.*`).catch(e => console.error())

    let erkek = kayitBilgi.fetch(`kayıt.${message.guild.id}.${user.id}.erkek`) || 0
    let kız = kayitBilgi.fetch(`kayıt.${message.guild.id}.${user.id}.kadın`) || 0
    let toplam = erkek + kız || 0

    const kbilgi = new MessageEmbed()
        .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true }) || message.guild.iconURL({ dynamic: true }) || app.user.avatarURL() })
        .setDescription(`${user} toplam **${toplam}** kayıt yapmış. (**${erkek}** erkek, **${kız}** kız)`)
        .setFooter({ text: message.guild.name + ` - Developed by Syn`, iconURL: message.guild.iconURL({ dynamic: true }) || message.author.avatarURL({ dynamic: true }) || app.user.avatarURL() })
        .setTimestamp()
        .setColor(`73ffd3`);

    message.channel.send({ embeds: [kbilgi] }).catch(e => console.error())

};