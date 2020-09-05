const cmd = require("discord.js-commando");

class CoinFlipCommand extends cmd.Command {
    constructor(client) {
        super(client, {
            name: "flip",
            group: "simple",
            memberName: "flip",
            description: "Throws a coin for you!",
        });
    }
    async run(message, args) {
        var chance = Math.random();
        if (chance == 0) {
            message.channel.send(message.author + ",`Your coin landed on head!`");
        } else {
            message.channel.send(message.author + "`Your coin landed on tail!`");
        }
    }
}

module.exports = CoinFlipCommand;