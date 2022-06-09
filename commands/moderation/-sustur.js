const { MessageEmbed } = require(`discord.js`);
moment.locale('tr')

module.exports.configuration = {
    name: 'mute',
    aliases: ["sustur"]
};

module.exports.execute = async(client, message, args) => {

    if (!settings.author.id.some(user => message.author.id === user) && !message.member.roles.cache.has(patch.guild.ownerRole) && !message.member.roles.cache.has(patch.roles.mute))
        return message.reply(`${emojis.no} \`mute\` komutunu kullanmak için gerekli izne sahip değilsin!`).catch(e => console.error());

    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!user)
        return message.channel.send(`${emojis.no} *Susturulacak kullanıcıyı etiketlemelisiniz!*`).catch(e => console.error())

    let member = message.guild.member(u);

    if (message.author.id === member.id) return message.channel.send(`${emojis.no} *Kendinizi susturamazsınız!*`).catch(e => console.error())

    if (settings.app.owner.some(user => user.id === user) || member.id === message.guild.ownerID)
        return message.channel.send(`${emojis.no} *Geliştiricimi susturamazsınız.* **kahkaha sesleri**`).catch(e => console.error())

    if (member.id === app.user.id || member.roles.cache.has(patch.roles.guildbot) || member.roles.cache.has(patch.roles.bots))
        return message.channel.send(`${emojis.no} *Botları susturamazsınız.*`).catch(e => console.error())

    if (member.roles.cache.has(patch.roles.muted)) return message.channel.send(`${emojis.no} *Kullanıcı zaten susturulmuş!*`).catch(e => console.error())

    let mutetime = args[1]
    if (!mutetime) return message.channel.send(`${emojis.no} *Kullanıcının susturulma süresini belirtmelisiniz!*`).catch(e => console.error())

    let sebep = args.splice(2).join(" ");
    if (!sebep) return message.channel.send(`${emojis.no} *Kullanıcının susturulma sebebini belirtmelisiniz!*`).catch(e => console.error())

    cezalar.add(`${message.guild.id}.cezano`, 1)
    let cezano = cezalar.get(`${message.guild.id}.cezano`);
    let tarih = moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss");

    cezalar.add(`user.${member.id}.mute`, 1);
    cezalar.add(`user.${member.id}.puan`, 5);
    cezalar.push(`user.${member.id}.cezaNo`, {
        pnvNo: cezano
    });
    cezalar.push(`${cezano}.con`, {
        member: `${member.user.username}#${member.user.discriminator}`,
        memberID: member.id,
        authorized: `${message.author.tag}`,
        authorizedID: message.author.id,
        operation: 'Susturulma',
        reason: sebep,
        time: tarih,
        pnvNo: cezano
    });

    app.users.cache.get(member.id).send(`**${message.guild.name}** sunucusunda **${message.author.tag}** adlı yetkili tarafından **${sebep}** sebebiyle susturuldun.`).catch(e => console.error());
    member.roles.add(patch.roles.muted).catch(e => console.error())
    message.channel.send(`${emojis.yes} *${member.user.username}#${member.user.discriminator}* (${member.user.id}), adlı kullanıcı başarıyla susturuldu!`).catch(e => console.error())

    setTimeout(function() {
        member.roles.remove(patch.roles.muted).catch(e => console.error())
    }, ms(mutetime));

    const muteLog = new MessageEmbed()
        .setColor('73ffd3')
        .setTimestamp()
        .setAuthor({ name: `${message.guild.name} - Ceza Sistemi`, iconURL: message.guild.iconURL({ dynamic: true }) || app.user.avatarURL() })
        .setDescription(`❯ *Susturan Yetkili;* \`${message.author.tag}\`\n❯ *Susturan Yetkili ID;* \`${message.author.id}\`\n❯ *Susturulan Kullanıcı;* \`${user.user.username}#${user.user.discriminator}\`\n❯ *Susturulan Kullanıcı ID;* \`${user.user.id}\`\n❯ *Susturulma Sebebi;* \`${sebep}\`\n❯ *Susturulma Tarihi;* \`${tarih}\`\n❯ *Ceza NO;* \`#${cezano}\``)

    let log = message.guild.channels.cache.get(patch.channels.muteLog) || message.guild.channels.cache.find(channel => channel.name === 'mute-bilgilendirme')
    if (!log) return;
    log.send({ embeds: [muteLog] }).catch(e => console.error())
};