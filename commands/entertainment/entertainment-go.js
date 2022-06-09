const { MessageEmbed } = require(`discord.js`)

module.exports.configuration = {
    name: 'git',
    aliases: ["go"]
};

module.exports.execute = async(client, message, args) => {

    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    let member = message.guild.member(user);

    if (!message.member.voice.channelID)
        return message.reply(`${emojis.no} *Komutu kullanmak için ses kanalına bağlanmalısınız!*`).catch(e => console.error());
    if (!user)
        return message.reply(`${emojis.no} *Sizi taşımamı istediğin kullanıcıyı etiketlemelisiniz!*`).catch(e => console.error());

    if (member.id === app.user.id)
        return message.reply(`${emojis.no} *Botların yanına gidemezsiniz.*`).catch(e => console.error());
    if (!member.voice.channelID)
        return message.reply(`${emojis.no} *Kullanıcı ses kanallarına bağlı değil!*`).catch(e => console.error());

    if (message.member.voice.channelID === member.voice.channelID)
        return message.reply(`${emojis.no} *Belirtilen kullanıcıyla aynı ses kanalındasınız!*`).catch(e => console.error());

    if (settings.author.id.some(user => message.author.id === user)) {

        const onay = new MessageEmbed()
            .setDescription("Yes! <@" + message.member + ">, Business Class uçak biletinizle sizi otomatik olarak <@" + u + "> adlı kullanıcının yanına götürüyorum uçuşa hazırlanın! :airplane:\nBulunduğu Kanal: `" + kullanıcı.voice.channel.name + "`")
            .setColor(`73ffd3`)
        message.channel.send({ embeds: [onay] }).catch(e => console.error());
        message.member.voice.setChannel(member.voice.channelID).catch(e => console.error());

    } else {

        const kgirisi = new MessageEmbed()
            .setDescription(`Hey ${u}, ${message.member} adlı kullanıcı senin yanına gelmek istiyor onaylıyor musun?`)
            .setColor(`73ffd3`);

        const onay = new MessageEmbed()
            .setDescription("Yes! <@" + message.member + ">, Economy Class uçak biletinizle sizi otomatik olarak <@" + u + "> adlı kullanıcının yanına götürüyorum uçuşa hazırlanın! :airplane:\nBulunduğu Kanal: `" + kullanıcı.voice.channel.name + "`")
            .setColor(`73ffd3`)

        const reactionFilter = (reaction, user) => {
            return reaction.emoji.name == 'thumbsup' && user.id === member.id;
        };

        message.channel.send(kgirisi).then(async msg => {
            await msg.react('thumbsup').catch(e => console.error());
            msg.awaitReactions(reactionFilter, { max: 1, time: 15000, error: ['time'] }).then(c => {

                let cevap = c.first();
                if (cevap) {
                    message.member.voice.setChannel(member.voice.channelID).catch(e => console.error());
                    message.channel.send({ embeds: [onay] }).catch(e => console.error());

                };
            });
        });
    };
};