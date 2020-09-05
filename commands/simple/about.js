const cmd = require("discord.js-commando");
const discord = require("discord.js");

class aboutcommand extends cmd.Command {
    constructor(client) {
        super(client, {
            name: "about",
            group: "simple",
            memberName: "about",
            description: "Find something out about the bot!",
        });
    }
    async run(message, args) {
        var myinfo = new discord.RichEmbed()
            .setColor(0x73b2d9)
            .setTitle("~ About Me ~")
            .addField("The day of my Birth: 19 July 2018", "~		~")
            .addField("Hosted and Maintained by", "Senpaii")
            .addField(
                "Github ~ My Contribution to the Arctic Code Vault",
                "https://github.com/UnlegitSenpaii/Senpaiisbot"
            )
            .setThumbnail(
                "https://cdn.discordapp.com/avatars/469470318528954369/fa8e22570d964d7294a34c9803a82ff6.png?size=2048"
            )
            .setFooter("Thank you for reading c;")
            .setURL("https://redcore.cf/")
            .setTimestamp();
        message.channel.send(myinfo);
    }
}

module.exports = aboutcommand;