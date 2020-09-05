const cmd = require("discord.js-commando");

class linksCommand extends cmd.Command {
    constructor(client) {
        super(client, {
            name: "links",
            group: "management",
            memberName: "links",
            description: "Switches links on and off!",
        });
    }
    async run(message, args) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            if (args == "on") {
                if (!links) {
                    links = true;
                    message.channel.send("`Links are now activated again!`");
                } else {
                    message.channel.send("`Links are already disabled!`");
                }
            } else if (args == "off") {
                if (links) {
                    links = false;
                    message.channel.send("`Links are now disabled!`");
                } else {
                    message.channel.send("`Links are already disabled!`");
                }
            } else {
                message.channel.send("`You have to provide on or off as an argument!`");
            }
        } else {
            message.channel.send(
                "`You dont have enough rights to execute this command!`"
            );
        }
    }
}

module.exports = linksCommand;