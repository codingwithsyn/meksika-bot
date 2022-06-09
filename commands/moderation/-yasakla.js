const { MessageEmbed } = require(`discord.js`)
moment.locale("tr");

module.exports.configuration = {
    name: 'ban',
    aliases: ['yasakla']
};

module.exports.execute = async(client, message, args) => {

    if (!settings.author.id.some(user => message.author.id === user) && !message.member.roles.cache.has(patch.powers.punisher) && !message.member.roles.cache.has(patch.guild.Role))
        return message.reply("`ban` komutunu kullanmak için gerekli izne sahip değilsiniz!").catch(e => console.error());

    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send(`${emojis.no} *Yasaklanacak kullanıcıyı belirtmelisiniz!*`).catch(e => console.error());

    let member = message.guild.member(user);

    if (settings.author.id.some(user => member.id === user))
        return message.channel.send(`${emojis.no} *Geliştiricimi yasaklayamazsınız.* **kahkaha sesleri**`).catch(e => console.error());

    if (member.id === message.guild.ownerID || member.roles.cache.has(patch.guild.ownerRole))
        return message.channel.send(`${emojis.no} *Sunucu sahibini yasaklayamazsınız.* **kahkaha sesleri**`).catch(e => console.error());

    if (message.author.id === member.id)
        return message.channel.send(`${emojis.no} *Kendinizi yasaklayamazsınız!*`).catch(e => console.error());

    if (member.id === app.user.id || member.roles.cache.has(patch.roles.guildbot)) return;

    let sebep = args.splice(1).join(" ");
    if (!sebep) return message.channel.send(`${emojis.no} *Kullanıcının yasaklanma sebebini belirtmelisiniz!*`).catch(e => console.error());

    if (!member.bannable) return message.channel.send(`${emojis.no} *Bu kullanıcı sahip olduğum yetkilerden yüksek, onu uzaklaştıramayacağız!*`).catch(e => console.error());

    cezalar.add(`${message.guild.id}.cezano`, 1)
    let cezano = cezalar.get(`${message.guild.id}.cezano`);
    let tarih = moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss");

    cezalar.add(`user.${member.id}.ban`, 1);
    cezalar.add(`user.${member.id}.puan`, 50);
    cezalar.push(`user.${member.id}.cezaNo`, {
        pnvNo: cezano
    });
    cezalar.push(`${cezano}.con`, {
        member: `${member.user.username}#${member.user.discriminator}`,
        memberID: member.id,
        authorized: `${message.author.tag}`,
        authorizedID: message.author.id,
        operation: 'Yasaklama',
        reason: sebep,
        time: tarih,
        pnvNo: cezano
    });

    app.users.cache.get(member.id).send(`**${message.guild.name}** sunucusunda **${message.author.tag}** adlı yetkili tarafından **${sebep}** sebebiyle yasaklandın.`).catch(e => console.error());
    islemYap(message.guild.id, message.author.id, member.id, "ban", sebep)
    message.channel.send(`${emojis.yes} *${member.user.username}#${member.user.discriminator}* (${member.user.id}), adlı kullanıcı sunucudan başarıyla yasaklandı!`).catch(e => console.error())

    const banLog = new MessageEmbed()
        .setColor('73ffd3')
        .setTimestamp()
        .setAuthor({ name: `${message.guild.name} - Ceza Sistemi`, iconURL: member.user.avatarURL({ dynamic: true }) || message.author.avatarURL({ dynamic: true }) || message.guild.iconURL({ dynamic: true }) || app.user.avatarURL() })
        .setDescription(`❯ *Yasaklayan Yetkili;* \`${message.author.tag}\`\n❯ *Yasaklayan Yetkili ID;* \`${message.author.id}\`\n❯ *Yasaklanan Kullanıcı;* \`${member.user.username}#${member.user.discriminator}\`\n❯ *Yasaklanan Kullanıcı ID;* \`${member.id}\`\n❯ *Yasaklanma Sebebi;* \`${sebep}\`\n❯ *Yasaklanma Tarihi;* \`${tarih}\`\n❯ *Ceza NO;* \`#${cezano}\``)

    let log = message.guild.channels.cache.get(patch.channels.banLog) || message.guild.channels.cache.find(channel => channel.name === 'ban-bilgilendirme')
    if (!log) return;
    log.send({ embeds: [banLog] }).catch(e => console.error())

};