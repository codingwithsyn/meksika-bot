const { MessageEmbed } = require(`discord.js`);

module.exports.configuration = {
  name: 'davet',
  aliases: ['invite']
};

module.exports.execute = async (client, message, args) => {

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(message.author.id);

  const davetGoruntule = new MessageEmbed()
    .setAuthor({ name: user.displayName, iconURL: user.user.displayAvatarURL({ dynamic: true }) })
    .setColor("RANDOM")
    .setFooter({ text: `${message.guild.name} - Developed by Syn`, iconURL: message.guild.iconURL({ dynamic: true }) })
    .setTimestamp();

  inviteSql.findOne({ guildID: message.guild.id, userID: user.id }, (err, inviterData) => {

    if (!inviterData) {

      davetGoruntule.setDescription(`Kullanıcının davet bilgileri bulunmamaktadır!`);
      message.channel.send({ embeds: [davetGoruntule] }).catch(e => console.error());

    } else {

      inviteSql.find({ guildID: message.guild.id, inviterID: u.id }).sort().exec((err, inviterMembers) => {

        let dailyInvites = 0;
        if (inviterMembers.length) {
          dailyInvites = inviterMembers.filter(x => message.guild.members.cache.has(x.userID) && (Date.now() - message.guild.members.cache.get(x.userID).joinedTimestamp) < 1000 * 60 * 60 * 24).length;
        };

        davetGoruntule.setDescription(`Toplam **${inviterData.regular + inviterData.bonus}** davete sahip! (**${inviterData.regular}** gerçek, **${inviterData.bonus}** bonus, **${inviterData.fake}** fake, **${dailyInvites}** günlük)`);
        message.channel.send({ embeds: [davetGoruntule] }).catch(e => console.error());

      });
    };
  });
};