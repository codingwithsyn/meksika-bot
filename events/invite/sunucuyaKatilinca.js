module.exports = async(member) => {

    if (!member.guild.channels.cache.get(patch.channel.inviteChannel)) return;

    let cachedInvites = guildInvites.get(member.guild.id);
    let newInvites = await member.guild.invites.fetch();

    let usedInvite = newInvites.find(inv => cachedInvites.get(inv.code) < inv.uses);
    if (!usedInvite) return;
    let inviter = app.users.cache.get(usedInvite.inviter.id) || { id: member.guild.id };
    let isMemberFake = (Date.now() - member.user.createdTimestamp) < 7 * 24 * 60 * 60 * 1000;
    let inviteChannel = app.channels.cache.get(patch.channel.inviteChannel);

    inviteSql.findOne({ guildID: member.guild.id, userID: member.id }, (err, joinedMember) => {

        if (!joinedMember) {
            let newJoinedMember = new inviteSql({
                _id: new mongoose.Types.ObjectId(),
                guildID: member.guild.id,
                userID: member.id,
                inviterID: inviter.id,
                regular: 0,
                bonus: 0,
                fake: 0
            });
            newJoinedMember.save();
        } else {
            joinedMember.inviterID = inviter.id;
            joinedMember.save();
        };
    });

    if (isMemberFake) {
        inviteSql.findOne({ guildID: member.guild.id, userID: inviter.id }, (err, inviterData) => {

            if (!inviterData) {
                let newInviter = new inviteSql({
                    _id: new mongoose.Types.ObjectId(),
                    guildID: member.guild.id,
                    userID: inviter.id,
                    inviterID: null,
                    regular: 0,
                    bonus: 0,
                    fake: 1
                });
                newInviter.save().then(x => {
                    if (inviteChannel) inviteChannel.send(`${member}, sunucumuza giriş yaptı! Davet eden; *${inviter.id == member.guild.id ? member.guild.name : inviter.tag}* ( Toplam **${(x.regular ? x.regular : 0) + (x.bonus ? x.bonus : 0)}** daveti bulunuyor )`).catch(e => console.error())
                });

            } else {
                inviterData.fake++
                    inviterData.save().then(x => {
                        if (inviteChannel) inviteChannel.send(`${member}, sunucumuza giriş yaptı! Davet eden; *${inviter.id == member.guild.id ? member.guild.name : inviter.tag}* ( Toplam **${(x.regular ? x.regular : 0) + (x.bonus ? x.bonus : 0)}** daveti bulunuyor )`).catch(e => console.error())

                    });
            };
        });

    } else {

        inviteSql.findOne({ guildID: member.guild.id, userID: inviter.id }, (err, inviterData) => {

            if (!inviterData) {
                let newInviter = new inviteSql({
                    _id: new mongoose.Types.ObjectId(),
                    guildID: member.guild.id,
                    userID: inviter.id,
                    inviterID: null,
                    regular: 1,
                    bonus: 0,
                    fake: 0
                });
                newInviter.save().then(x => {
                    if (inviteChannel) inviteChannel.send(`${member}, sunucumuza giriş yaptı! Davet eden; *${inviter.id == member.guild.id ? member.guild.name : inviter.tag}* ( Toplam **${(x.regular ? x.regular : 0) + (x.bonus ? x.bonus : 0)}** daveti bulunuyor )`).catch(e => console.error())
                });

            } else {
                inviterData.regular++;
                inviterData.save().then(x => {
                    if (inviteChannel) inviteChannel.send(`${member}, sunucumuza giriş yaptı! Davet eden; *${inviter.id == member.guild.id ? member.guild.name : inviter.tag}* ( Toplam **${(x.regular ? x.regular : 0) + (x.bonus ? x.bonus : 0)}** daveti bulunuyor )`).catch(e => console.error())

                });
            };
        });
    };
    guildInvites.set(member.guild.id, newInvites);
};

module.exports.app = {
    event: "guildMemberAdd"
};