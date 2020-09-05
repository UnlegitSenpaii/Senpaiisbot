const commando = require("discord.js-commando");
const discord = require("discord.js");
const client = require("nekos.life");
const neko = new client();

class cuddleCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "poke",
            group: "interactions",
            memberName: "poke",
            description: "poke others.",
        });
    }

    async run(message, args) {
        let target = message.guild.member(message.mentions.users.first());
        if (!target) {
            message.channel.send("You have to mention a user!");
            return;
        }
        var cuddle = await neko.sfw.poke();
        console.log(cuddle);
        if (message.author.user == target) {
            var selfcuddle = new discord.RichEmbed()
                .addField(message.author.username + " pokes himself", ":3", true)
                .setColor("#FF69B4")
                .setImage(cuddle.url)
                .setFooter("powered by nekos.life <3");
            message.channel.sendEmbed(selfcuddle);
            return;
        }
        var ws = new discord.RichEmbed()
            .addField(
                message.author.username + " pokes " + target.user.username,
                ":3",
                true
            )
            .setColor("#FF69B4")
            .setImage(cuddle.url)
            .setFooter("powered by nekos.life <3");
        message.channel.send(ws);
    }
}

module.exports = cuddleCommand;