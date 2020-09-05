const discord = require("discord.js");
const cmd = require("discord.js-commando");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("././warnings.json", "utf8"));
class warnCommand extends cmd.Command {
    constructor(client) {
        super(client, {
            name: "warn",
            group: "management",
            memberName: "warn",
            description: "Adds a warning to a user!",
        });
    }
    async run(message, args) {
        if (message.member.hasPermission("MANAGE_ROLES")) {
            const pingeduser = message.mentions.users.first();
            if (!pingeduser)
                return message.channel.send("`You have to mention a user!`");

            const guildmember = message.guild.member(pingeduser);
            if (!guildmember)
                return message.channel.send(
                    "`The user you tagged is not on this server`"
                );

            if (guildmember.hasPermission("MANAGE_ROLES"))
                return message.channel.send("`You can't warn this user!`");

            if (!warns[guildmember.id])
                warns[guildmember.id] = {
                    warns: 0,
                };

            warns[guildmember.id].warns++;

            fs.writeFile("././warnings.json", JSON.stringify(warns), (err) => {
                console.log(err);
            });

            let mutetime;

            mutetime = warns[guildmember.id].warns * 10;

            message.reply(
                `Successfully warned and muted ${pingeduser.username} for ${mutetime} minutes.`
            );
            guildmember.send(
                "`You have been warned by an administrator and are muted for " +
                mutetime +
                " minutes. Your total warnings: " +
                warns[guildmember.id].warns +
                "`"
            );
            let logChannel = message.guild.channels.find(
                (channel) => channel.name === "logs"
            );

            let userRoles = guildmember.roles;

            guildmember.removeRoles(userRoles);

            let muterole = message.guild.roles.find((role) => role.name === "muted");

            if (!muterole) return message.channel.send("`Coudn't find muted role!`");

            await guildmember.addRole(muterole);
            var muteTime = mutetime * 1000 * 60;
            if (logChannel) {
                let LogImbed = new discord.RichEmbed()
                    .setDescription("Warning")
                    .setAuthor(message.author.username)
                    .setColor("#fc6400")
                    .addField("Warned User", `${pingeduser}`)
                    .addField("Warned In", message.channel)
                    .addField("Number of Warnings", warns[guildmember.id].warns)
                    .addField("Time Out Time", muteTime / 60000 + " minutes");
                logChannel.send(LogImbed);
            }

            setTimeout(function() {
                guildmember.removeRole(muterole);
                guildmember.addRoles(userRoles);
                if (logChannel)
                    logChannel.send("`" + pingeduser.username + " has been unmuted`");
            }, muteTime);
        } else {
            message.channel.send(
                "`You dont have enough rights to execute this command!`"
            );
        }
    }
}

module.exports = warnCommand;