const { MessageEmbed } = require(`discord.js`)

module.exports.configuration = {
    name: 'afkboz',
    aliases: ['kuboz']
};

module.exports.execute = async(client, message, args) => {

    if (!settings.author.id.some(user => message.author.id === user) && !message.member.roles.cache.has(patch.guild.owner))
        return message.reply(`${emojis.no} \`afkboz\` komutunu kullanmak için gerekli izne sahip değilsin!`).catch(e => console.error());

    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!user)
        return message.channel.send(`${emojis.no} Komut iptal edildi, Klavyeden Uzakta modunu bozacağınız kullanıcıyı etiketlemelisiniz!`)
            .catch(e => console.error())

    if (afk.fetch(`tag_${message.guild.id}_${user.id}`)) {

        user.setNickname(user.displayName.replace('[AFK]', '')).catch(e => console.error());
        afk.delete(`tag_${message.guild.id}_${user.id}`);

        const afkBoz = new MessageEmbed()
            .setAuthor({ name: `Klavyeden Uzakta!` })
            .setDescription(`<@${user.id}> adlı kullanıcı artık **Klavyeden Uzakta** değil!`)
            .setColor(`73ffd3`)
        message.channel.send({ embeds: [afkBoz] }).catch(e => console.error());

    } else {
        message.channel.send(`${emojis.no} Kullanıcı zaten **Klavyeden Uzakta** değil!`).catch(e => console.error());
    }
};