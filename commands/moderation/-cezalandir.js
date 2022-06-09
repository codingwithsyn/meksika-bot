const { MessageEmbed } = require(`discord.js`);
moment.locale('tr')

module.exports.configuration = {
    name: 'jail',
    aliases: ["cezalandır"]
};

module.exports.execute = async(client, message, args) => {

    if (!settings.author.id.some(user => message.author.id === user) && !message.member.roles.cache.has(patch.guild.ownerRole) && !message.member.roles.cache.has(patch.roles.jail))
        return message.reply(`${emojis.no} \`jail\` komutunu kullanmak için gerekli izne sahip değilsin!`).catch(e => console.error());

    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.reply(`${emojis.no} *Komut iptal edildi, cezalıya atılacak kullanıcıyı etiketlemelisiniz!*`).catch(e => console.error())

    let member = message.guild.member(user);

    if (message.author.id == member.id)
        return message.reply(`${emojis.no} *Kendini cezalandırman için farklı yöntemler biliyorum.*`).catch(e => console.error())

    if (settings.app.owner.some(user => member.id === user) || member.id === message.guild.ownerID || member.roles.cache.has(patch.guild.ownerRole))
        return message.reply(`${emojis.no} *Geliştiricimi cezalıya atamazsınız!* **kahkaha sesleri**`).catch(e => console.error())

    if (member.id === app.user.id || member.roles.cache.has(patch.roles.guildbot) || member.roles.cache.has(patch.roles.bots))
        return message.reply(`${emojis.no} *Botları cezalıya atamazsınız!*`).catch(e => console.error())

    if (member.roles.cache.has(patch.roles.cezali))
        return message.reply(`${emojis.no} *Kullanıcı zaten cezalandırılmış!*`).catch(e => console.error())

    let sebep = args.splice(1).join(" ");
    if (!sebep) return message.reply(`${emojis.no} *Kullanıcının cezalıya atılma sebebini belirtmelisiniz!*`).catch(e => console.error())

    cezalar.add(`${message.guild.id}.cezano`, 1)
    let cezano = cezalar.get(`${message.guild.id}.cezano`);
    let tarih = moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss");

    cezalar.add(`${member.id}.jail`, 1);
    cezalar.add(`user.${member.id}.jail`, 1);
    cezalar.add(`user.${member.id}.puan`, 30);
    cezalar.push(`user.${member.id}.cezaNo`, {
        pnvNo: cezano
    });
    cezalar.push(`${cezano}.con`, {
        member: `${member.user.username}#${member.user.discriminator}`,
        memberID: member.id,
        authorized: `${message.author.tag}`,
        authorizedID: message.author.id,
        operation: 'Cezalandırma',
        reason: sebep,
        time: tarih,
        pnvNo: cezano
    });

    app.users.cache.get(member.id).send(`**${message.guild.name}** sunucusunda **${message.author.tag}** adlı yetkili tarafından **${sebep}** sebebiyle cezalıya atıldın.`).catch(e => console.error());
    member.roles.set(member.roles.cache.has(patch.roles.booster) ? [patch.roles.cezali, patch.roles.booster] : [patch.roles.cezali]).catch(e => console.error())
    message.channel.send(`${emojis.yes} *${member.user.username}#${member.user.discriminator}* (${member.id}), adlı kullanıcı başarıyla cezalıya atıldı!`).catch(e => console.error())

    const jailLog = new MessageEmbed()
        .setColor('73ffd3')
        .setTimestamp()
        .setAuthor({ name: `${message.guild.name} - Ceza Sistemi`, iconURL: message.guild.iconURL({ dynamic: true }) || app.user.avatarURL() })
        .setDescription(`❯ *Cezalandıran Yetkili;* \`${message.author.tag}\`\n❯ *Cezalandıran Yetkili ID;* \`${message.author.id}\`\n❯ *Cezalandırılan Kullanıcı;* \`${user.user.username}#${user.user.discriminator}\`\n❯ *Cezalandırılan Kullanıcı ID;* \`${user.user.id}\`\n❯ *Ceza Sebebi;* \`${sebep}\`\n❯ *Ceza Tarihi;* \`${tarih}\`\n❯ *Ceza NO;* \`#00${cezano}\``)

    let log = message.guild.channels.cache.get(patch.channel.jailLog) || message.guild.channels.cache.find(channel => channel.name === 'jail-bilgilendirme')
    if (!log) return;
    log.send({ embeds: [jailLog] }).catch(e => console.error())

};