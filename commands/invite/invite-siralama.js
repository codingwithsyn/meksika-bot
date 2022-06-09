const { MessageEmbed } = require(`discord.js`);

module.exports.configuration = {
  name: 'sıralama',
  aliases: ['top']
};

module.exports.execute = async (client, message, args) => {

  Array.prototype.chunk = function (chunk_size) {
    let myArray = Array.from(this);
    let tempArray = [];
    for (let index = 0; index < myArray.length; index += chunk_size) {
      let chunk = myArray.slice(index, index + chunk_size);
      tempArray.push(chunk);
    }
    return tempArray;
  };

  const topEmbed = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor({ name: `${message.guild.name}, Dvaet Sıralaması`, iconURL: message.guild.iconURL({ dynamic: true }) })
    .setFooter({ text: `${message.guild.name} - Developed by Syn`, iconURL: message.guild.iconURL({ dynamic: true }) })

  let currentPage = 1;

  inviteSql.find({ guildID: message.guild.id }).sort().exec(async (err, pageArray) => {

    pageArray = pageArray.filter(w => message.guild.members.cache.has(w.userID)).sort((uye1, uye2) => ((uye2.regular ? uye2.regular : 0) + (uye2.bonus ? uye2.bonus : 0)) - ((uye1.regular ? uye1.regular : 0) + (uye1.bonus ? uye1.bonus : 0)));
    if (err) console.error();

    if (!pageArray.length) {
      message.channel.send({ embeds:[topEmbed.setDescription("Sunucuya ait davet verisi bulunamadı!")] }).catch(e => console.error());
    } else {
      let pages = pageArray.chunk(10);
      if (!pages.length || !pages[currentPage - 1].length)
        return message.channel.send(`${settings.emojis.no} Sunucuya ait daveti olan üye bulunamadı!`).catch(e => console.error());

      let msg = await message.channel.send({ embeds: [topEmbed] }).catch(e => console.error())
      let reactions = ["◀", "❌", "▶"];

      for (let reaction of reactions) await msg.react(reaction).catch(e => console.error());

      if (msg) await msg.edit({ embeds:[topEmbed.setDescription(`${pages[currentPage - 1]
        .map((kisi, index) => `\`${index + 1}.\` ${message.guild.members.cache.get(kisi.userID).toString()} | **${kisi.regular + kisi.bonus}** davet.`).join('\n')}`)
        .setFooter({ text:`Görüntülenen sayfa; ${currentPage}` })] }).catch(e => console.error())

      const back = msg.createReactionCollector((reaction, user) => reaction.emoji.name == "◀" && user.id == message.author.id, { time: 20000 }),
        st = msg.createReactionCollector((reaction, user) => reaction.emoji.name == "❌" && user.id == message.author.id, { time: 20000 }),
        go = msg.createReactionCollector((reaction, user) => reaction.emoji.name == "▶" && user.id == message.author.id, { time: 20000 });

      back.on("collect", async reaction => {
        await reaction.users.remove(message.author.id).catch(e => console.error())
        if (currentPage == 1) return;
        currentPage--;
        if (msg) msg.edit(topEmbed.setDescription(`${pages[currentPage - 1].map((kisi, index) => `\`${index + 1}.\` ${message.guild.members.cache.get(kisi.userID).toString()} | **${kisi.regular + kisi.bonus}** davet.`).join('\n')}`).setFooter(`Görüntülenen sayfa; ${currentPage}`)).catch(e => console.error())
      })

      go.on("collect", async reaction => {
        await reaction.users.remove(message.author.id).catch(e => console.error())
        if (currentPage == pages.length) return;
        currentPage++;
        if (msg) msg.edit(topEmbed.setDescription(`${pages[currentPage - 1].map((kisi, index) => `\`${index + 1}.\` ${message.guild.members.cache.get(kisi.userID).toString()} | **${kisi.regular + kisi.bonus}** davet.`).join('\n')}`).setFooter(`Görüntülenen sayfa; ${currentPage}`)).catch(e => console.error())
      })

      st.on("collect", async reaction => {
        await back.stop();
        await go.stop();
        await st.stop();
        if (message) message.delete().catch(e => console.error())
        if (msg) return msg.delete().catch(e => console.error())
      });

      back.on("end", async () => {
        await back.stop();
        await go.stop();
        await st.stop();
        if (message) message.delete().catch(e => console.error())
        if (msg) return msg.delete().catch(e => console.error())
      });
    };
  });
};