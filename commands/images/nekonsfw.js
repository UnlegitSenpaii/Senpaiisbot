const commando = require('discord.js-commando');
const discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();
//credits kawaii#9523
class NekoCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name:'neko_nsfw',
            group:'images',
            memberName: 'neko_nsfw',
            description: 'nsfw neko.'
        })
    }

    async run(message, args)
    {
        if(message.channel.nsfw == false){
            message.reply("this channel isn't nsfw");
            return;
        }
        var nneko;
        var chance = Math.floor(Math.random() * 2);
        if (chance == 0){
            nneko = await neko.nsfw.neko();
        }
        else 
        {
            nneko = await neko.nsfw.nekoGif();
        }

        console.log(nneko)
        var ws = new discord.RichEmbed()
        .addField("neko", "nya~", true)
        .setColor("#FF69B4")
        .setImage(nneko.url)
        .setFooter("powered by nekos.life <3")
        message.channel.sendEmbed(ws);
    }
}

module.exports = NekoCommand;