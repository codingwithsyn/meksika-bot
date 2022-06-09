module.exports.configuration = {
  name: 'code',
  aliases: ['eval'],
};

module.exports.execute = async (client, message, args) => {

  if (!settings.author.id.some(user => message.author.id == user))
    return message.reply(`${emojis.no} \`code\` komutunu kullanmak için gerekli izne sahip değilsiniz!`).catch(e => console.error());

  if ((["token", "settings", "json"]).some(word => new RegExp("(\\b)+(" + word + ")+(\\b)", "gui").test(message.content)))
    return message.channel.send(`${emojis.no} *Sistemin gizliliği için bu kod çalışmamakta.*`).catch(e => console.error())

  try {
    let toEval = args.join(" ");
    let evaluated = eval(toEval);
    if (!toEval)
      return message.channel.send(`${emojis.yes} *Application hazır. Hangi işlemi yapmak istersiniz?*`).catch(e => console.error())
    evaluated = util.inspect(evaluated);

    for (let i = 0; i < evaluated.length; i += 2000) {
      let hrstart = process.hrtime();
      let hrDiff;
      hrDiff = process.hrtime(hrstart);
      const toSend = evaluated.substring(i, Math.min(evaluated.length, i + 2000));
      return message.channel.send(`_Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ""}${hrDiff[1] / 1000000}ms._ ` + "```js\n" + toSend + "\n```").catch(e => console.error())
    }
  } catch (err) {
    let hrstart = process.hrtime();
    let hrDiff;
    hrDiff = process.hrtime(hrstart);
    message.channel.send(`_Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ""}${hrDiff[1] / 1000000}ms._ \`\`\`xl\n${err}\n\`\`\``).catch(e => console.error())
  }
};
