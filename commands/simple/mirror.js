const cmd = require("discord.js-commando");

class MirrorCommand extends cmd.Command {
    constructor(client) {
        super(client, {
            name: "mirror",
            group: "simple",
            memberName: "mirror",
            description: "See yourself or the person you tag in the mirror",
        });
    }
    async run(message, args) {
        if (args == "") message.channel.send(message.author.avatarURL);
        else {
            message.channel.send(message.mentions.users.first().avatarURL);
        }
    }
}

module.exports = MirrorCommand;