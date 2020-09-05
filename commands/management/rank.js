const cmd = require("discord.js-commando");
const request = require("request");

class verifyCommand extends cmd.Command {
    constructor(client) {
        super(client, {
            name: "verify",
            group: "management",
            memberName: "verify",
            description: "verify your forum account with discord",
        });
    }
    async run(message, args) {
        if (message.member.roles.find("name", "redcore.win")) {
            message.channel.send(
                "`You already have synced your Discord with the Forum!`"
            );
            return;
        }
        let requestURL = "hidden";
        request(requestURL, (error, response, body) => {
            if (error) {
                console.log(error);
                message.channel.send(
                    "Coudnt connect to redcore server, try again later.`"
                );
                return;
            }

            if (body.includes("Invalid User!") || body.length == 0 || body == "") {
                message.channel.send(
                    "`Sorry, coudnt find your redcore account. Maybe its not synced yet?`"
                );
                return;
            }
            let username = body;
            let redcorerole = message.member.guild.roles.find(
                (name) => name.name === "redcore.win"
            );
            message.member.addRole(redcorerole);
            message.channel.send("`Welcome " + username + "!`");
            console.log(username + " just verified!");
        });
    }
}

module.exports = verifyCommand;