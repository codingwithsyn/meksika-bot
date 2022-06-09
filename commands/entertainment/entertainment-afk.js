const { MessageEmbed } = require(`discord.js`)

module.exports.configuration = {
    name: 'afk',
    aliases: ['ku']
};

module.exports.execute = async(client, message, args) => {

    if (afk.get(`tag_${message.guild.id}_${message.author.id}`))
        return message.reply(`${emojis.no} *Zaten **Klavyeden Uzakta** modundasınız!*`).catch(e => console.error())

    let sebep = args.join(" ")
    if (!sebep) return message.reply(`${emojis.no} *Klavyeden Uzakta kalma sebebinizi belirtmelisiniz!*`).catch(e => console.error())

    if (link.test(sebep) || invite.test(sebep))
        return message.reply(`${emojis.no} *Klavyeden Uzakta sebebinize link ekleyemezsiniz!*`).catch(e => console.error())

    if ((kufur).some(word => new RegExp("(\\b)+(" + word + ")+(\\b)", "gui").test(sebep)))
        return message.reply(`${emojis.no} *Klavyeden Uzakta sebebinize hakaret/küfür ekleyemezsiniz!*`).catch(e => console.error())

    message.member.setNickname(`[AFK] ${message.member.displayName}`).catch(e => console.error())
    afk.set(`tag_${message.guild.id}_${message.author.id}`, sebep);

    const awayFromKeyboard = new MessageEmbed()
        .setAuthor({ name: `Klavyeden Uzakta!` })
        .setDescription(`<@${message.author.id}>, adlı kullanıcı artık **${sebep}** sebebi ile *Klavyeden Uzakta*!`)
        .setColor(`73ffd3`)
    message.channel.send({ embeds: [awayFromKeyboard] }).catch(e => console.error())
};