const { MessageEmbed } = require(`discord.js`)

module.exports.configuration = {
    name: 'avatar',
    aliases: ['pp']
};

module.exports.execute = async(client, message, args) => {

    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || app.users.cache.get(args[0]) || message.guild.members.cache.get(message.author.id)
    let member = message.guild.member(user);
    let avatar = member.user.avatarURL({ dynamic: true, size: 2048 });

    const avatarEmbed = new MessageEmbed()
        .setAuthor({ name: member.user.tag, iconURL: avatar })
        .setColor(`73ffd3`)
        .setFooter({ text: `${message.member.displayName} (${message.author.id}) tarafından istendi..` })
        .setDescription(`[Avatar Adresi](${avatar})`)
        .setImage(avatar)

    message.channel.send({ embeds: [avatarEmbed] }).catch(e => console.error());
};