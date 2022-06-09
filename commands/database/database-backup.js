const { MessageEmbed } = require(`discord.js`)

module.exports.configuration = {
  name: 'db-backup',
  aliases: ['db-yedekle']
};

module.exports.execute = async (client, message, args) => {

  if (!settings.author.id.some(user => message.author.id == user))
    return message.reply(`${emojis.no} \`backup\` komutunu kullanmak için gerekli izne sahip değilsiniz!`).catch(e => console.error());

  let role = message.guild.roles.cache.get(args[0]);
  if (!role) return message.channel.send(`${emojis.no} Belirttiğiniz rol sunucuda bulunmamakta!`).catch(e => console.error());

  message.react(emojis.yes).catch(e => console.error());
  logs.push(`logs`,
    `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${message.author.username} adlı geliştirici ${message.guild.name} sunucusunda ${args[0]} rolünün yedeğini aldı.`
  );
  message.guild.roles.cache.filter(r => r.name !== "@everyone" && !r.managed).forEach(role => {

    roleSql.findOne({ guildID: message.guild.id, roleID: role.id }, async (error, regRole) => {
      if (!regRole) {
        let newRoleSchema = new roleSql({
          _id: new mongoose.Types.ObjectId(),
          guildID: message.guild.id,
          roleID: role.id,
          name: role.name,
          color: role.hexColor,
          hoist: role.hoist,
          permissions: role.permissions,
          position: role.position,
          mentionable: role.mentionable,
          time: Date.now(),
          members: role.members.map(m => m.id),
        });
        newRoleSchema.save();
      } else {
        regRole.name = role.name;
        regRole.color = role.hexColor;
        regRole.hoist = role.hoist;
        regRole.permissions = role.permissions;
        regRole.position = role.position;
        regRole.mentionable = role.mentionable;
        regRole.time = Date.now();
        regRole.members = role.members.map(m => m.id);
        regRole.save();
      };
    });
  });
};