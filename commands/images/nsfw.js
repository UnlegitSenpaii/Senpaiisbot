const commando = require("discord.js-commando");
const discord = require("discord.js");
const client = require("nekos.life");
const neko = new client();

class NekoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "hentai",
            group: "images",
            memberName: "nsfw",
            description: "nsfw with normal - boobs - anal",
        });
    }

    async run(message, args) {
        if (message.channel.nsfw == false) {
            message.reply("this channel isn't nsfw");
            return;
        }
        var nneko;
        if (args == "normal") nneko = await neko.nsfw.hentai();
        else if (args == "boobs") nneko = await neko.nsfw.boobs();
        else if (args == "anal") nneko = await neko.nsfw.anal();
        else {
            var chance = Math.floor(Math.random() * 5);
            switch (chance) {
                case 0:
                    nneko = await neko.nsfw.hentai();
                    break;
                case 1:
                    nneko = await neko.nsfw.anal();
                    break;
                case 2:
                    nneko = await neko.nsfw.bJ();
                    break;
                case 3:
                    nneko = await neko.nsfw.tits();
                    break;
                case 4:
                    nneko = await neko.nsfw.boobs();
                    break;
            }
        }
        console.log(nneko);
        var ws = new discord.RichEmbed()
            .addField("owo whats this", "nya~", true)
            .setColor("#FF69B4")
            .setImage(nneko.url)
            .setFooter("powered by nekos.life <3");
        message.channel.send(ws);
    }
}

module.exports = NekoCommand;