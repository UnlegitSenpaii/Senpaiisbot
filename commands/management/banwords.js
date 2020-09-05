const cmd = require("discord.js-commando");

class importCommand extends cmd.Command {
    constructor(client) {
        super(client, {
            name: "banword",
            group: "management",
            memberName: "banword",
            description: "Adds a word to the blacklist!",
        });
    }
    async run(message, args) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            bannedwords.push(args);
            message.channel.send("`Successfully added " + args + " !`");
        } else {
            message.channel.send(
                "`You dont have enough rights to execute this command!`"
            );
        }
    }
}

module.exports = importCommand;