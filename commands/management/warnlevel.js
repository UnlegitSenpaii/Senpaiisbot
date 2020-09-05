const discord = require("discord.js");
const cmd = require("discord.js-commando");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("././warnings.json", "utf8"));
class warnreadCommand extends cmd.Command {
    constructor(client) {
        super(client, {
            name: "warnings",
            group: "management",
            memberName: "warnings",
            description: "Tells you how many warnings a user has!",
        });
    }
    async run(message, args) {
        const pingeduser = message.mentions.users.first();
        if (!pingeduser)
            return message.channel.send("`You have to mention a user!`");

        const guildmember = message.guild.member(pingeduser);
        if (!guildmember)
            return message.channel.send(
                "`The user you tagged is not on this server`"
            );

        if (!warns[guildmember.id]) warns[guildmember.id] = { warns: 0 };

        message.channel.send(
            "`" +
            pingeduser.username +
            " has " +
            warns[guildmember.id].warns +
            " warnings in total!`"
        );
    }
}

module.exports = warnreadCommand;