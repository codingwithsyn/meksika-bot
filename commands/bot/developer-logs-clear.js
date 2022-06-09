module.exports.configuration = {
    name: 'logs-clear',
    aliases: ['kayıtları-temizle'],
};

module.exports.execute = async (client, message, args) => {

    if (!settings.author.id.some(user => message.author.id == user))
        return message.reply(`${emojis.no} \`logs-clear\` komutunu kullanmak için gerekli izne sahip değilsiniz!`).catch(e => console.error());

    logs.delete('logs');
    message.react(emojis.yes).catch(e => console.error());
};
