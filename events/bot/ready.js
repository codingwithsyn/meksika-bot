const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = async () => {
  // Bot başladığında ekrana yazdırılacak mesajlar.
  console.log(`\n- ${app.user.tag} (${app.user.id}), aktif ediliyor..`);
  console.log(`- Toplamda ${app.guilds.cache.size} sunucu ve ${app.users.cache.size} kullanıcıya sahip.`);
  console.log(`- Developed by Syn`);

  // Ayarladığınız ses kanalını arar, var ise bağlanır.
  if (app.channels.cache.get(settings.Presence.voiceChannel)) {
    var guildID = app.channels.cache.get(settings.Presence.voiceChannel).guildId;
    joinVoiceChannel({
      channelId: settings.Presence.voiceChannel,
      guildId: guildID,
      adapterCreator: app.guilds.cache.get(guildID).voiceAdapterCreator
    })
  } else console.log(`- Application ses kanalına bağlanırken sorun yaşadı!`);
}

module.exports.app = {
  event: "ready"
};