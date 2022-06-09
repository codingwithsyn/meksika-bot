module.exports = (member) => {

        if (!member.guild.channels.cache.get(patch.channel.inviteChannel)) return;

        let isMemberFake = (Date.now() - member.user.createdTimestamp) < 7 * 24 * 60 * 60 * 1000;
        let inviteChannel = app.channels.cache.get(patch.channel.inviteChannel);

        inviteSql.findOne({ guildID: member.guild.id, userID: member.id }, async(err, memberData) => {

                    if (memberData && memberData.inviterID) {
                        let inviter = app.users.cache.get(memberData.inviterID) || { id: member.guild.id };

                        inviteSql.findOne({ guildID: member.guild.id, userID: memberData.inviterID }, async(err, inviterData) => {

                                    if (!inviterData) {
                                        let newInviter = new inviteSql({
                                            _id: new mongoose.Types.ObjectId(),
                                            guildID: member.guild.id,
                                            userID: inviter.id,
                                            inviterID: null,
                                            regular: 0,
                                            bonus: 0,
                                            fake: 0
                                        });
                                        newInviter.save();
                                    } else {
                                        if (isMemberFake) {
                                            if (inviterData.fake - 1 >= 0) inviterData.fake--;
                                        } else {
                                            if (inviterData.regular - 1 >= 0) inviterData.regular--;
                                        };
                                        inviterData.save().then(x => {
                                                    if (inviteChannel) inviteChannel.send(`*${member.user.tag}*, sunucumuzdan çıkış yaptı! ${inviter.tag ? `Davet eden; ${inviter.id == member.guild.id ? member.guild.name : inviter.tag} ( Toplam **${(x.regular ? x.regular : 0) + (x.bonus ? x.bonus : 0)}** daveti bulunuyor )` : `*Bulunamadı*.`}`).catch(e => console.error())
              });
            };
          });
        } else {
          if (inviteChannel) inviteChannel.send(`*${member.user.tag}*, sunucumuzdan çıkış yaptı! Davet eden; *Bulunamadı*.`).catch(e => console.error())
        };
      });
};
module.exports.app = {
  event: "guildMemberRemove"
};