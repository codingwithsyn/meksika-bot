const { MessageEmbed } = require(`discord.js`);
moment.locale('tr')

module.exports.configuration = {
    name: 'unmute',
    aliases: ["susturmakaldır"]
};

module.exports.execute = async(client, message, args) => {

    if (!settings.author.id.some(user => message.author.id === user) && !message.member.roles.cache.has(patch.guild.ownerRole) && !message.member.roles.cache.has(patch.roles.mute))
        return message.reply(`${emojis.no} \`unmute\` komutunu kullanmak için gerekli izne sahip değilsin!`).catch(e => console.error());

    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send(`${emojis.no} Susturması açılacak kullanıcıyı etiketlemelisiniz!`).catch(e => console.error())

    let member = message.guild.member(user);

    if (member.id === app.user.id || member.roles.cache.has(patch.roles.guildbot) || member.roles.cache.has(patch.roles.bots)) return;
    if (!member.roles.cache.has(patch.roles.muted)) return message.channel.send(`${emojis.no} Kullanıcı zaten susturulmamış!`).catch(e => console.error())

    let sebep = args.splice(1).join(" ");
    if (!sebep) return message.channel.send(`${emojis.no} Kullanıcının susturmasını kaldırma sebebinizi belirtmelisiniz!`).catch(e => console.error())

    cezalar.add(`${message.guild.id}.cezano`, 1)
    let cezano = cezalar.get(`${message.guild.id}.cezano`);
    let tarih = moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss");

    cezalar.push(`user.${member.id}.cezaNo`, {
        pnvNo: cezano
    });
    cezalar.push(`${cezano}.con`, {
        member: `${member.user.username}#${member.user.discriminator}`,
        memberID: member.id,
        authorized: `${message.author.tag}`,
        authorizedID: message.author.id,
        operation: 'Susturma Kaldır',
        reason: sebep,
        time: tarih,
        pnvNo: cezano
    });

    app.users.cache.get(member.id).send(`**${message.guild.name}** sunucusunda **${message.author.tag}** adlı yetkili tarafından **${sebep}** sebebiyle susturman kaldırıldı.`).catch(e => console.error());
    member.roles.remove(patch.roles.muted).catch(e => console.error())
    message.channel.send(`${emojis.yes} *${member.user.username}#${member.user.discriminator}* (${member.user.id}), adlı kullanıcının susturulması açıldı!`).catch(e => console.error())

    const muteLog = new MessageEmbed()
        .setColor('73ffd3')
        .setTimestamp()
        .setAuthor({ name: `${message.guild.name} - Ceza Sistemi`, iconURL: message.guild.iconURL({ dynamic: true }) || app.user.avatarURL() })
        .setDescription(`❯ *Susturmayı Kaldıran Yetkili;* \`${message.author.tag}\`\n❯ *Susturmayı Kaldıran Yetkili ID;* \`${message.author.id}\`\n❯ *Susturulması Kaldırılan Kullanıcı;* \`${user.user.username}#${user.user.discriminator}\`\n❯ *Susturulması Kaldırılan Kullanıcı ID;* \`${user.user.id}\`\n❯ *Susturulmanın Kaldırılma Sebebi;* \`${sebep}\`\n❯ *Susturulmanın Kaldırılma Tarihi;* \`${tarih}\`\n❯ *Ceza NO;* \`#00${cezano}\``)

    let log = message.guild.channels.cache.get(patch.channels.muteLog) || message.guild.channels.cache.find(channel => channel.name === 'mute-bilgilendirme')
    if (!log) return;
    log.send({ embeds: [muteLog] }).catch(e => console.error())

};