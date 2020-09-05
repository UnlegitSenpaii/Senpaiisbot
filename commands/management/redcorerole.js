const cmd = require("discord.js-commando");

class redcorewincommand extends cmd.Command {
    constructor(client) {
        super(client, {
            name: "succ",
            group: "management",
            memberName: "succ",
            description: "Gives a user the redcore.win role!",
        });
    }
    async run(message, args) {
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
        let redcorerole = message.member.guild.roles.find(
            (name) => name.name === "redcore.win"
        );
        if (message.member.roles.find((role) => role.name === "reseller")) {
            guildmember.addRole(redcorerole);
            message.channel.send("`gave the user the redcore.win role!`");
        } else message.channel.send("`???`");
    }
}

module.exports = redcorewincommand;