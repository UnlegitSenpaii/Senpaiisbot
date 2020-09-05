const cmd = require("discord.js-commando");

class kickCommand extends cmd.Command {
    constructor(client) {
        super(client, {
            name: "kick",
            group: "management",
            memberName: "kick",
            description: "Kicks the mentioned user!",
        });
    }
    async run(message, args) {
        if (message.member.hasPermission("KICK_MEMBERS")) {
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
            //after these checks we can finally kick the member

            guildmember
                .kick(message.author.username + " has kicked " + pingeduser.username)
                .then(() => {
                    message.reply(`Successfully kicked ${pingeduser.tag}`);
                })
                .catch((err) => {
                    message.channel.send("I was unable to kick the member");
                    console.error(err);
                });
        } else {
            message.channel.send(
                "`You dont have enough rights to execute this command!`"
            );
        }
    }
}

module.exports = kickCommand;