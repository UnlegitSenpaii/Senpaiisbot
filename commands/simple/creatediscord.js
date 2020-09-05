const cmd = require("discord.js-commando");
const discord = require("discord.js");
//TO DO:
//Create Channel: Log in Group Administrator
//https://youtu.be/S5DVdjLQA44 look what to write in logs c;
class CreateCommand extends cmd.Command {
    constructor(client) {
        super(client, {
            name: "creatediscord",
            group: "simple",
            memberName: "creatediscord",
            description: "Creates the roles and channels the Bot needs!",
        });
    }
    async run(message, args) {
        if (
            message.member.roles.find((role) => role.name === "God") ||
            message.member.hasPermission("ADMINISTRATOR")
        ) {
            if (message.guild.roles.find((role) => role.name === "Neko")) {
                message.channel.send("`Group Neko already exists skipping..`");
            } else {
                message.guild.createRole({
                    name: "Neko",
                    permissions: [1278594241],
                    color: "FF0000",
                    position: "5",
                    mentionable: true,
                });
            }
            if (message.guild.roles.find((role) => role.name === "Kitsune")) {
                message.channel.send("`Group Kitsune already exists skipping..`");
            } else {
                message.guild.createRole({
                    name: "Kitsune",
                    permissions: [1278594241],
                    color: "#00FFFF",
                    position: "6",
                    mentionable: true,
                });
            }
            if (message.guild.roles.find((role) => role.name === "NSFW")) {
                message.channel.send("`Group NSFW already exists skipping..`");
            } else {
                message.guild.createRole({
                    name: "NSFW",
                    permissions: [],
                    position: "7",
                    color: "#D3D3D3",
                    mentionable: true,
                });
            }
            if (message.guild.roles.find((role) => role.name === "Neko Sensei")) {
                message.channel.send("`Group Neko Sensei already exists skipping..`");
            } else {
                message.guild.createRole({
                    name: "Neko Sensei",
                    permissions: [1341652179],
                    position: "2",
                    color: "#FFFF33",
                    mentionable: true,
                });
            }
            if (message.guild.roles.find((role) => role.name === "Kitsune Sensei")) {
                message.channel.send(
                    "`Group Kitsune Sensei already exists skipping..`"
                );
            } else {
                message.guild.createRole({
                    name: "Kitsune Sensei",
                    permissions: [1341652179],
                    position: "3",
                    color: "#32CD32",
                    mentionable: true,
                });
            }
            if (message.guild.roles.find((role) => role.name === "redcore.win")) {
                message.channel.send("`Group redcore.win already exists skipping..`");
            } else {
                message.guild.createRole({
                    name: "redcore.win",
                    permissions: [1278594241],
                    position: "4",
                    color: "#32CD32",
                    mentionable: true,
                });
            }
            if (!message.guild.channels.find((channel) => channel.name === "Bot"))
                message.guild.createChannel("Bot", "category");
            if (!message.guild.channels.find((channel) => channel.name === "Rules"))
                message.guild.createChannel("Rules", "text");
            if (!message.guild.channels.find((channel) => channel.name === "Commands"))
                message.guild.createChannel("Commands", "text");
            if (!message.guild.channels.find((channel) => channel.name === "Logs"))
                message.guild.createChannel("Logs", "text");
            message.channel.send("`Succesfully created all roles!`");
            message.channel.send(
                "`You can edit the Permissions of the Roles to your likeable!`"
            );
        } else {
            message.channel.send(
                "`You dont have enough Permissions to execute this command!`"
            );
        }
    }
}

module.exports = CreateCommand;