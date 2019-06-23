const commando = require('discord.js-commando');
const discord = require('discord.js');
const client = require('nekos.life');
const neko = new client();



class cuddleCommand extends commando.Command
{
    constructor(client)
    {
        super(client,
        {
            name:'cuddle',
            group:'interactions',
            memberName: 'cuddle',
            description: 'cuddle other users.'
        })
    }

    async run(message, args)
    {
        let target = message.guild.member(message.mentions.users.first());
        if(!target){
            message.channel.send("You have to mention a user!");
            return;
        }
        var cuddle = await neko.sfw.cuddle();
        console.log(cuddle);
        if(target == message.author)
        {
            var selfcuddle = new discord.RichEmbed()
            .addField(message.author + " cuddles himself", ":3", true)
            .setColor("#FF69B4")
            .setImage(cuddle.url)
            .setFooter("powered by nekos.life <3")
            message.channel.sendEmbed(selfcuddle);
            return;
        }
        var ws = new discord.RichEmbed()
        .addField(""  , ":3", true)
        .setColor("#FF69B4")
        .setImage(cuddle.url)
        .setFooter("powered by nekos.life <3")
        message.channel.send(message.author + " cuddles " + target);
        message.channel.sendEmbed(ws);
    }
}

module.exports = cuddleCommand;