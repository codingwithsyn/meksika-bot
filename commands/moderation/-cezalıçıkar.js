const { MessageEmbed } = require(`discord.js`);
moment.locale('tr')

module.exports.configuration = {
    name: 'unjail',
    aliases: ["cezalıçıkar"]
};

module.exports.execute = async(client, message, args) => {

        if (!settings.author.id.some(user => message.author.id === user) && !message.member.roles.cache.has(patch.roles.ownerRole) && !message.member.roles.cache.has(patch.roles.jail))
            return message.reply(`${emojis.no} \`unjail\` komutunu kullanmak için gerekli izne sahip değilsin!`).catch(e => console.error());

        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.reply(`${emojis.no} *Komut iptal edildi, cezalıdan çıkarılacak kullanıcıyı etiketlemelisiniz!*`).catch(e => console.error())

        let member = message.guild.member(user);

        if (member.id === app.user.id || member.roles.cache.has(patch.roles.guildbot) || member.roles.cache.has(patch.roles.bots)) return;

        if (!member.roles.cache.has(patch.roles.cezali))
            return message.reply(`${emojis.no} *Kullanıcı zaten cezalı değil!*`).catch(e => console.error())

        let sebep = args.splice(1).join(" ");
        if (!sebep) return message.reply(`${emojis.no} *Kullanıcının cezalıdan çıkarılma sebebini belirtmelisiniz*!`).catch(e => console.error())

        cezalar.add(`${message.guild.id}.cezano`, 1)
        let cezano = cezalar.get(`${message.guild.id}.cezano`);
        let tarih = moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss");

        cezalar.delete(`${member.id}.jail`);
        cezalar.push(`user.${member.id}.cezaNo`, {
            pnvNo: cezano
        });
        cezalar.push(`${cezano}.con`, {
            member: `${member.user.username}#${member.user.discriminator}`,
            memberID: member.id,
            authorized: `${message.author.tag}`,
            authorizedID: message.author.id,
            operation: 'Ceza Kaldırma',
            reason: sebep,
            time: tarih,
            pnvNo: cezano
        });

        app.users.cache.get(member.id).send(`**${message.guild.name}** sunucusunda **${message.author.tag}** adlı yetkili tarafından **${sebep}** sebebiyle cezan kaldırıldı.`).catch(e => console.error());
        member.setNickname(`${patch.guild.tag||``} İsim 'Yaş`).catch(e => console.error())
        member.roles.set(member.roles.cache.has(patch.roles.booster) ? [patch.roles.kayitsiz, patch.roles.booster] : [patch.roles.kayitsiz]).catch(e => console.error())
        message.reply(`${emojis.yes} *${member.user.username}#${member.user.discriminator}* (${member.id}), adlı kullanıcı başarıyla cezalıdan çıkarıldı!`).catch(e => console.error())

        const jailLog = new MessageEmbed()
        .setColor('73ffd3')
        .setTimestamp()
        .setAuthor({ name: `${message.guild.name} - Ceza Sistemi`, iconURL: message.guild.iconURL({dynamic:true})||app.user.avatarURL() })
        .setDescription(`❯ *Cezalıdan Çıkartan Yetkili;* \`${message.author.tag}\`\n❯ *Cezalıdan Çıkartan Yetkili ID;* \`${message.author.id}\`\n❯ *Cezalıdan Çıkarılan Kullanıcı;* \`${user.user.username}#${user.user.discriminator}\`\n❯ *Cezalıdan Çıkarılan Kullanıcı ID;* \`${user.user.id}\`\n❯ *Cezalıdan Çıkartma Sebebi;* \`${sebep}\`\n❯ *Cezalıdan Çıkartma Tarihi;* \`${tarih}\`\n❯ *Ceza NO;* \`#${cezano}\``)
 
        let log = message.guild.channels.cache.get(patch.channel.jailLog) || message.guild.channels.cache.find(channel => channel.name === 'jail-bilgilendirme')
        if(!log) return;
        log.send({ embeds:[jailLog] }).catch(e => console.error())
};