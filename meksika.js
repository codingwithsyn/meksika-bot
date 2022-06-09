// Modüller //
const { Discord, Client, MessageEmbed, MessageActionRow, MessageButton, Collection, Intents } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
global.fs = require('fs');
global.util = require('util');
global.moment = require('moment');
moment.locale('tr');
global.mongoose = require('mongoose');
global.express = require("express");
global.bodyParser = require("body-parser");
global.cors = require('cors');

const { Database } = require("ark.db");
global.logs = new Database("./json/logs");
global.appExp = new express();

// Json
global.settings = require('./json/settings.json'); // Bot ayarları tanımlandı.
global.patch = require('./json/patch.json'); // Patch ayarları tanımlandı.
global.emojis = require('./json/emojis.json'); // Bot emojleri tanımlandı.

// Veritabanları
global.guildInvites = new Map();
global.roleSql = require("./models/role.js"); // Database kısmı için MongoDB bağlantısı.
global.inviteSql = require("./models/inviter.js"); // Invite kısmı için MongoDB bağlantısı.
global.blacklist = new Database('./json/blacklist'); // Bot engeli için veritabanı.
global.chatguard = new Database('./json/chatguard'); // Chat Guard sistemleri için veritabanı.
global.chatlog = new Database('./json/chatlog'); // Chat Log sistemleri için veritabanı.
global.guard = new Database('./json/guard'); // Guard sistemleri ve ayarlamaları için veritabanı.
global.src = new Database('./json/src'); // SRC sistemleri ve ayarlamaları için veritabanı.
global.afk = new Database('./json/afk'); // Away From Keyboard sistemi için veritabanı.
global.isimlerDb = new Database('./json/isimler'); // Kullanıcı isimlerin kaydını tutmak için veritabanı.
global.cezalar = new Database('./json/cezalar'); // Kullanıcı cezalarının kaydını tutmak için veritabanı.
global.kayitBilgi = new Database('./json/kayitBilgi'); // Kayıt bilgileri için veritabanı.

// MongoDB bağlantısı 
mongoose.connect(settings.mongoose.SqlConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(e => console.error());

// Application'ı oluşturuyoruz.
global.app = new Client({
    // Botun bilgilerini ayarlardan çekip günceller.
    presence: {
        status: settings.Presence.status,
        afk: false,
        activities: [{
            name: settings.Presence.name,
            type: settings.Presence.type,
        }],
    },
    // Intentleri tanımladık.
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ],
});

// Application'a giriş yapıyoruz.
app.login(settings.app.token).catch(error =>
    console.log(`- Application'a bağlanırken bir sorun yaşandı!\n Sorun: ` + error)
);

// Express
appExp.use(bodyParser.urlencoded({ extended: false }));
appExp.use(bodyParser.json());
appExp.use(cors({ origin: true, credentials: true }));
appExp.use(express.static(__dirname + "/out"))

appExp.get("/isBotLogined", (req, res) => {
    res.status(200).send({
        status: (app.user) ? true : false
    });
});

appExp.get("/getInfo", (req, res) => {
    res.status(200).send({
        info: {
            logs: logs.get("logs") || ["Henüz log kaydı bulunmamakta."],
            token: settings.app.token
        }
    });
});

// Port Ayarları
appExp.listen(3333);

// Chat Koruma için gerekli bilgiler.
global.kufurler = require('./json/swearing.json').sw;
global.invite = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i
global.link = /(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi

// Birden fazla komut klasörünü aktifleştirmek için fonksiyonumuz.
global.commands = new Collection();
global.aliases = new Collection();
const komutYukle = function(dosya) {
    fs.readdir(dosya, (error, files) => {
        if (error) console.error('- Komut dosyasına erişirken bir hata oluştu; ' + error);
        files = files.filter(file => file.endsWith(".js"));
        console.log(`+ ${dosya} klasöründen komutlar yükleniyor!`)
        files.forEach(file => {
            let prop = require(`${dosya}${file}`);
            if (!prop.configuration) return;
            console.log(` - ${dosya}${file} yüklendi.`);
            if (typeof prop.onLoad === "function") prop.onLoad(app);
            commands.set(prop.configuration.name, prop);
            if (prop.configuration.aliases) prop.configuration.aliases.forEach(aliase => aliases.set(aliase, prop.configuration.name));
        });
    });
};

// Komut klasöründeki dosyaların adlarını çekiyoruz.
var commandList = fs.readdirSync('./commands/');
// Tüm komutları yüklemek için komutYukle fonksiyonunu kullanıyoruz.
for (var i = 0; i < commandList.length; i++) {
    komutYukle(`./commands/${commandList[i]}/`);
};

// Birden fazla event klasörünü kullanmak için fonksiyonumuz.
const eventYukle = function(event) {
    fs.readdir(`./events/${event}`, (error, files) => {
        if (error) return console.error('- Event dosyasına erişirken bir hata oluştu; ' + error);
        console.log(`+ ./events/${event} klasöründen eventler yükleniyor!`)
        files.filter(file => file.endsWith(".js")).forEach(file => {
            let prop = require(`./events/${event}/${file}`);
            if (!prop.app) return;
            console.log(` - ./events/${event}/${file} yüklendi.`);
            app.on(prop.app.event, prop);
        });
    });
};

// Event klasöründeki dosyaların adlarını çekiyoruz.
var eventList = fs.readdirSync('./events/');
// Tüm eventleri yüklemek için eventYukle fonksiyonunu kullanıyoruz.
for (var i = 0; i < eventList.length; i++) {
    eventYukle(`${eventList[i]}`);
};

// Loglarımızı text olarak kaydetmemizi sağlayan fonksiyon.
global.logKaydet = function(location, data, mesaj) {
    fs.appendFile(`./logs/${location}/${data}`, mesaj, (file) => {
        if (file) throw file;
    });
};

// Dosyaları güncellemeyi sağlayan fonksiyon.
global.dosyaGuncelle = function(folder, file) {
    fs.writeFile(folder, JSON.stringify(file), (e) => {
        if (e) console.error(e);
    });
}

// Ban veya kick atmak için kısayol fonksiyonu Ornk: islemYap(message.guild.id, message.author.id, kullanici, "ban", "Küfür")
global.islemYap = function(sunucu, kullanici, yetkili, islem, sebep) {
    const user = app.guilds.cache.get(sunucu).members.cache.get(kullanici);
    if (user) {
        if (islem == "ban") {
            logs.push(`logs`,
                `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${app.guilds.cache.get(sunucu).name} sunucusundan, ${kullanici} kullanıcısı ${yetkili} tarafından ${sebep} sebebiyle yasaklandı.`
            );

            user.ban({ reason: sebep }).catch(e => console.error());
        } else if (islem == "kick") {
            logs.push(`logs`,
                `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${app.guilds.cache.get(sunucu).name} sunucusundan, ${kullanici} kullanıcısı ${yetkili} tarafından ${sebep} sebebiyle atıldı.`
            );

            user.kick().catch(e => console.error());
        } else if (islem == "jail") {

            logs.push(`logs`,
                `[${moment(Date.now()).format("DD/MMMM/YYYY - hh:mm:ss")}] ${app.guilds.cache.get(sunucu).name} sunucusundan, ${kullanici} kullanıcısı ${yetkili} tarafından ${sebep} sebebiyle cezalandırıldı.`
            );
        }
    }
}