const cmd = require("discord.js-commando");

class ClientId extends cmd.Command {
    constructor(client) {
        super(client, {
            name: "clientid",
            group: "simple",
            memberName: "clientid",
            description: "Gets your clientid",
        });
    }
    async run(message, args) {
        message.channel.send("`" + message.author + "`");
    }
}

module.exports = ClientId;