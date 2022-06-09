const { MessageEmbed } = require(`discord.js`);

module.exports = (message) => {

    if (message.channel.id == src.get(`src_kanal_${message.guild.id}_${app.user.id}`) && !message.author.bot && message.author.id == app.user.id) {
        if (src.get(`src_${message.guild.id}_${app.user.id}`) == 'on') {

            message.delete().catch(error => console.error());

            if (wait.get(`wait_${message.channel.id}_${message.author.id}`))
                return message.channel.send(`${emojis.no} *SRC sınırlamasına takıldınız, lütfen bir süre sonra tekrar deneyin!*`)
                    .catch(e => console.error())
                    .then(m => m.delete({ timeout: 5000 }).catch(e => console.error()))

            let tarih = moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")
            src.add(`${message.guild.id}.istekno`, 1)
            let istekno = src.get(`${message.guild.id}.istekno`) || `0`

            const log = new MessageEmbed()
                .setColor('73ffd3')
                .setTimestamp()
                .setAuthor({ name: `${message.guild.name} - Öneri/İstek/Şikayet Sistemi`, iconURL: message.guild.iconURL({ dynamic: true }) || app.user.avatarURL() })
                .setDescription(`❯ *Gönderen Kişi;* \`${message.author.tag}\`\n❯ *Gönderen Kişi ID;* \`${message.author.id}\`\n❯ *Gönderilme Tarihi;* \`${tarih}\`\n❯ *SRC No;* \`#00${istekno}\`\n❯ *Gönderilen Mesaj;* \`${message.content}\``)

            if (message.guild.channels.cache.get(src.get(`src_kanal_log_${message.guild.id}_${app.user.id}`))) {
                message.channel.send.send({ embeds: [log] }).catch(e => console.error());
                message.reply(`*Mesajınızı yetkililere ilettim, size geri dönüş sağlayacaklarına eminim!*`)
                    .catch(e => console.error())
                    .then(m => m.delete({ timeout: 5000 }).catch(e => console.error()))
            } else {
                message.reply(`*Maalesef mesajınızı yetkililere iletemedim, sorun hakkında bilgi almak istiyorsanız geliştiricime ulaşın!*`)
                    .catch(e => console.error())
                    .then(m => m.delete({ timeout: 5000 }).catch(e => console.error()))
            }

            src.add(`wait_${message.channel.id}_${message.author.id}`, 1)
            setTimeout(function() {
                src.delete(`wait_${message.channel.id}_${message.author.id}`)
            }, 60000);
        }
    }
};
module.exports.app = {
    event: "message"
};