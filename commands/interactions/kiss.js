const commando = require("discord.js-commando");
const discord = require("discord.js");
const client = require("nekos.life");
const neko = new client();

class kissCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "kiss",
            group: "interactions",
            memberName: "kiss",
            description: "kiss others.",
        });
    }

    async run(message, args) {
        let target = message.guild.member(message.mentions.users.first());
        if (!target) {
            message.channel.send("You have to mention a user!");
            return;
        }
        var cuddle = await neko.sfw.kiss();

        console.log(cuddle);
        if (message.author == target.user) {
            var selfcuddle = new discord.RichEmbed()
                .addField(message.author.username + " kisses himself", "??", true)
                .setColor("#FF69B4")
                .setImage(cuddle.url)
                .setFooter("powered by nekos.life <3");
            message.channel.sendEmbed(selfcuddle);
            return;
        }
        var ws = new discord.RichEmbed()
            .addField(
                message.author.username + " kisses " + target.user.username,
                "o.o",
                true
            )
            .setColor("#FF69B4")
            .setImage(cuddle.url)
            .setFooter("powered by nekos.life <3");
        message.channel.send(ws);
    }
}

module.exports = kissCommand;