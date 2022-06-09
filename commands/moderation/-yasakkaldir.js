const { MessageEmbed } = require(`discord.js`)

module.exports.configuration = {
    name: 'unban',
    aliases: ['yasakkaldir']
};

module.exports.execute = async(client, message, args) => {

    if (!settings.author.id.some(user => message.author.id === user) && !message.member.roles.cache.has(patch.guild.ownerRole) && !message.member.roles.cache.has(patch.roles.punisher))
        return message.reply("`unban` komutunu kullanmak için gerekli izne sahip değilsiniz!").catch(e => console.error());

    let user = args[0];

    if (!args[0] || (args[0] && isNaN(args[0])))
        return message.channel.send(`${emojis.no} *Yasağı kalkacak kullanıcıyı ID şeklinde belirtmelisiniz!*`).catch(e => console.error())

    let sebep = args.splice(1).join(" ");
    if (!sebep)
        return message.channel.send(`${emojis.no} *Kullanıcının yasağını kaldırma sebebinizi belirtmelisiniz!*`).catch(e => console.error())

    message.guild.members.unban(u).then(e => message.channel.send(`${emojis.yes} (${user}), kullanıcının yasağı başarıyla kaldırıldı!`).catch(e => console.error())).catch(e => console.error())

};