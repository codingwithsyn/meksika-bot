const { MessageEmbed } = require(`discord.js`)

module.exports = (user) => {

    if (user.author.bot || user.channel.type == `dm` || user.content.startsWith(`${settings.app.prefix}afk`)) return;

    let awayEmbed = new MessageEmbed()
        .setColor(`73ffd3`)
        .setAuthor(`Klavyeden Uzakta!`)

    if (afk.get(`tag_${user.guild.id}_${user.author.id}`)) {

        user.member.setNickname(user.member.displayName.replace('[AFK]', '')).catch(e => console.error())
        afk.delete(`tag_${user.guild.id}_${user.author.id}`);
        let afkboz = awayEmbed.setDescription(`<@${user.author.id}> adlı kullanıcı **Klavyeden Uzakta** modundan çıktı. Tekrar hoş geldin!`)
        user.channel.send({ embeds: [afkboz] }).catch(e => console.error())

    }

    let userMention = user.mentions.members.first();
    if (userMention && (afk.get(`tag_${user.guild.id}_${userMention.id}`))) {

        let sebep = afk.get(`tag_${user.guild.id}_${userMention.id}`);
        let afketiket = awayEmbed.setDescription(`${userMention} adlı kullanıcı **${sebep}** sebebi ile **Klavyeden Uzakta** modunda!`)
        user.channel.send({ embeds: afketiket }).catch(e => console.error())

    }
};

module.exports.app = {
    event: "message"
};