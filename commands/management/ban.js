const cmd = require("discord.js-commando");

class banCommand extends cmd.Command {
    constructor(client) {
        super(client, {
            name: "ban",
            group: "management",
            memberName: "ban",
            description: "Bans the mentioned user!",
        });
    }
    async run(message, args) {
        if (message.member.hasPermission("BAN_MEMBERS")) {
            const pingeduser = message.mentions.users.first();
            if (!pingeduser) {
                message.channel.send("`You have to mention a user!`");
                return;
            }
            const guildmember = message.guild.member(pingeduser);
            if (!guildmember) {
                message.channel.send("`The user you tagged is not on this server`");
                return;
            }

            guildmember
                .ban(message.author.username + " has banned " + pingeduser.username)
                .then(() => {
                    message.reply(`Successfully banned ${pingeduser.tag}`);
                })
                .catch((err) => {
                    message.channel.send("I was unable to ban the member");
                    console.error(err);
                });
        } else {
            message.channel.send(
                "`You dont have enough rights to execute this command!`"
            );
        }
    }
}

module.exports = banCommand;