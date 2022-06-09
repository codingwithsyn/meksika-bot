const { MessageEmbed } = require(`discord.js`);

module.exports = (message) => {
  // Eğer yazıyı yazan kişi bot ise, yazının başında prefix yok ise, DM'den yazılmış ise devam etme satırı.
  if (message.author.bot || !message.content.startsWith(settings.app.prefix) || message.channel.type == `dm`) return;
  // Prefixi substring ile alma kısmı.
  let args = message.content.substring(settings.app.prefix.length).split(" ");
  let command = args[0];
  args = args.splice(1);
  // Eğer bot geliştiricisi ise bu satır aralığında komutları çalıştır.
  if (settings.author.id.some(id => message.author.id === id)) {
    if (commands.has(command)) {
      let calistirici = commands.get(command);
      calistirici.execute(message.client, message, args);
    } else if (aliases.has(command)) {
      calistirici = commands.get(aliases.get(command));
      calistirici.execute(message.client, message, args);
    }
    // Geliştirici değilse buradan devam et.
  } else {
    if (commands.has(command) || aliases.has(command)) {
      // Eğer kara listeye alındıysa komutları kullanmasını engelle.
      if (blacklist.fetch(`${app.user.id}.${message.author.id}`))
        return message.channel.send(`${emojis.no} Görünüşe göre komutlarımı ve sistemlerimi kullanmak için engellenmişsin.`).catch(e => console.error());

      if (commands.has(command)) {
        let calistirici = commands.get(command);
        calistirici.execute(message.client, message, args);
      } else if (aliases.has(command)) {
        calistirici = commands.get(aliases.get(command));
        calistirici.execute(message.client, message, args);
      }
    }
  }
};
module.exports.app = {
  event: "messageCreate"
};