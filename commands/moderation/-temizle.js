module.exports.configuration = {
    name: 'temizle',
    aliases: ['clear']
};

module.exports.execute = async(client, message, args) => {

    if (!settings.author.id.some(user => message.author.id === user) && !message.member.roles.cache.has(patch.guild.owner))
        return message.reply(`${emojis.no} \`temizle\`  komutunu kullanmak için gerekli izne sahip değilsin!`).catch(e => console.error());

    if (!args[0] || (args[0] && isNaN(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 100)
        return message.reply(`${emojis.no} **1-100** arası silinecek mesaj miktarı girmelisiniz!`).catch(e => console.error())

    message.delete().catch(e => console.error());
    message.channel.bulkDelete(Number(args[0])).catch(e => console.error()).then(m => message.channel.send(`${emojis.yes} Başarıyla **${args[0]}** adet mesaj silindi!`).catch(e => console.error()))

};