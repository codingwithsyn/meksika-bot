module.exports.configuration = {
  name: 'reboot',
  aliases: ['yenidenbaslat'],
};

module.exports.execute = async (client, message, args) => {

  if (!settings.author.id.some(user => message.author.id == user))
    return message.reply(`${emojis.no} \`reboot\` komutunu kullanmak için gerekli izne sahip değilsin!`).catch(e => console.error());

  console.clear();
  message.channel.send(`${emojis.yes} <@!${message.author.id}>, *sistemler yeniden başlatılıyor lütfen bekleyin.*`).catch(e => console.error()).then(p => process.exit(0));
};