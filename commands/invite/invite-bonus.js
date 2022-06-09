const { MessageEmbed } = require(`discord.js`);

module.exports.configuration = {
  name: 'bonus',
  aliases: []
};

module.exports.execute = async (client, message, args) => {

    if (!settings.author.id.some(user => message.author.id === user) && !message.member.permission.has("ADMINISTRATOR"))
      return message.reply(`${emojis.no} \`bonus\` komutunu kullanmak için gerekli izne sahip değilsin!`).catch(e => console.error());

    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let sayi = args[1];

    if (!uye || !args[1] && isNaN(args[1]))
      return message.channel.send(`${emojis.no} Geçerli bir kullanıcı ve sayı belirtmelisiniz!\n${emojis.yes} \`${settings.app.prefix}bonus @kullanıcı +10/-10*\``).catch(e => console.error())

    inviteSql.findOne({ guildID: message.guild.id, userID: uye.id }, (err, inviterData) => {

      if (!inviterData) {
        let newInviter = new inviteSql({
          _id: new mongoose.Types.ObjectId(),
          guildID: message.guild.id,
          userID: uye.id,
          inviterID: null,
          regular: 0,
          bonus: sayi,
          fake: 0
        });
        newInviter.save().then(m => message.channel.send(`${emojis.yes} Belirtilen kullanıcının bonus davetine **${sayi}** miktarında bonus eklendi!`).catch(e => console.error()));
      } else {
        eval(`inviterData.bonus = inviterData.bonus+${Number(sayi)}`);
        inviterData.save().then(m => message.channel.send(`${emojis.yes} Belirtilen kullanıcının bonus davetine **${sayi}** miktarında bonus eklendi!`).catch(e => console.error()));
      };
    });
};