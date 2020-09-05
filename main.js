const cmd = require("discord.js-commando");
const bot = new cmd.Client();
const discord = require("discord.js");

const serverStats = {
    guildID: "471739831173775379",
    totalUsersID: "593133820534980656",
    memberCountID: "593133846439133234",
    botCountID: "593133878051471600",
};

bot.registry.registerGroup("simple", "Simple");
bot.registry.registerGroup("team", "Teams");
bot.registry.registerGroup("management", "Management");
bot.registry.registerGroup("interactions", "Interactions");
bot.registry.registerGroup("images", "Images");
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");
global.lastmessageuser = 0;
global.lastmessagesend = 0;
global.currentNekoMembers = [];
global.currentKitsuneMembers = [];
global.disablechat = false;
global.links = true;
global.bannedwords = [];
global.avatarURL = bot.avatarURL;

let remindersChannel = "724294728702754859";

lastmonth = 0;
LastEveryoneMessageContent = "";

function isUrl(s) {
    if (!isUrl.rx_url) {
        isUrl.rx_url = /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
        isUrl.prefixes = ["http://", "https://", "ftp://", "www."];
        isUrl.domains = [
            "com",
            "ru",
            "net",
            "org",
            "de",
            "jp",
            "uk",
            "br",
            "pl",
            "in",
            "it",
            "fr",
            "au",
            "info",
            "nl",
            "ir",
            "cn",
            "es",
            "cz",
            "kr",
            "ua",
            "ca",
            "eu",
            "biz",
            "za",
            "gr",
            "co",
            "ro",
            "se",
            "tw",
            "mx",
            "vn",
            "tr",
            "ch",
            "hu",
            "at",
            "be",
            "dk",
            "tv",
            "me",
            "ar",
            "no",
            "us",
            "sk",
            "xyz",
            "fi",
            "id",
            "cl",
            "by",
            "nz",
            "il",
            "ie",
            "pt",
            "kz",
            "io",
            "my",
            "lt",
            "hk",
            "cc",
            "sg",
            "edu",
            "pk",
            "su",
            "bg",
            "th",
            "top",
            "lv",
            "hr",
            "pe",
            "club",
            "rs",
            "ae",
            "az",
            "si",
            "ph",
            "pro",
            "ng",
            "tk",
            "ee",
            "asia",
            "mobi",
        ];
    }

    if (!isUrl.rx_url.test(s)) return false;
    for (let i = 0; i < isUrl.prefixes.length; i++)
        if (s.startsWith(isUrl.prefixes[i])) return true;
    for (let i = 0; i < isUrl.domains.length; i++)
        if (
            s.endsWith("." + isUrl.domains[i]) ||
            s.includes("." + isUrl.domains[i] + "/") ||
            s.includes("." + isUrl.domains[i] + "?")
        )
            return true;
    return false;
}

function ChatFilter(message) {
    if (message.content.length > 2000) return;
    if (message.channel.type == "dm") return;
    if (message.system)
    //we dont wanna fuck with for example join messages -> messages that were sent by discord and not the user itself
        return;
    if (message.author == bot.user) return;

    let logChannel = message.guild.channels.find(
        (channel) => channel.name === "logs"
    );
    var found = false;

    if (
        lastmessagesend === message.content &&
        message.content.length <= 1 &&
        !message.content.includes("!")
    ) {
        message.delete();
        message.author.send("`Please dont Spam!`");
        console.log(
            "Deleted " +
            message.content +
            " from " +
            message.channel.name +
            " send by " +
            message.author.username +
            " uid: " +
            message.author +
            "!"
        );
        if (logChannel)
            logChannel.send(
                "Deleted " +
                message.content +
                " from " +
                message.channel.name +
                " send by " +
                message.author.username +
                " uid: " +
                message.author +
                "!"
            );
    }

    for (var i in bannedwords) {
        if (message.content.toLowerCase().includes(bannedwords[i].toLowerCase()))
            found = true;
    }

    if (found) {
        message.delete();
        message.author.send("`You arent allowed to use that word!`");
        console.log(
            "Deleted " +
            message.content +
            " from " +
            message.channel.name +
            " send by " +
            message.author.username +
            " uid: " +
            message.author +
            "!"
        );
        if (logChannel)
            logChannel.send(
                "Deleted " +
                message.content +
                " from " +
                message.channel.name +
                " send by " +
                message.author.username +
                " uid: " +
                message.author +
                "!"
            );
    }

    if (!links) {
        if (
            message.content.toLowerCase().includes("https://") ||
            message.content.toLowerCase().includes("http://") ||
            isUrl(message.content)
        ) {
            message.delete();
            message.author.send("`Links are not allowed!`");
            console.log(
                "Deleted message from: " +
                message.author.username +
                message.author +
                " reason: Link!"
            );
            if (logChannel)
                logChannel.send(
                    "Deleted message from: " +
                    message.author.username +
                    message.author +
                    " reason: Link!"
                );
        }
    }
}

bot.on("messageUpdate", (oldMessage, newMessage) => {
    ChatFilter(newMessage);
    lastmessagesend = newMessage.content;
});

bot.on("guildBanRemove", (guild, user) => {
    console.log("The Ban of " + user.username + " got revoked!");
});

bot.on("guildBanAdd", (guild, user) => {
    console.log("A user got banned!");
});

bot.on("reconnecting", () => {
    console.log("Bot timed out! reconnecting..");
});

bot.on("disconnect", (event) => {
    console.log("Bot disconected! Error Code: " + event.code);
});

bot.on("message", (message) => {
    if (message.content.length > 2000) return;
    if (message.channel.type == "dm") return;
    if (message.system)
    //we dont wanna fuck with for example join messages -> messages that were sent by discord and not the user itself
        return;

    let logChannel = message.guild.channels.find(
        (channel) => channel.name === "logs"
    );
    let commandChannel = message.guild.channels.find(
        (channel) => channel.name === "commands"
    );
    if (message.channel == commandChannel) {
        if (message.content.charAt(0) != "!" && message.author != bot.user) {
            message.author.send(
                "`In the Command Channel only Bot Commands are allowed!`"
            );
            if (logChannel)
                logChannel.send(
                    "Deleted " +
                    message.content +
                    " from " +
                    message.channel.name +
                    " send by " +
                    message.author.username +
                    " uid: " +
                    message.author +
                    " Reason: Non Command in Command Channel!"
                );
        }
        message.delete();
    }
    if (message.author == bot.user) return;

    ChatFilter(message);

    if (message.content.toLowerCase().includes("@everyone")) {
        message.channel.send("`leave me alone!`");
    }

    if (message.content == "Hello") {
        if (message.author == "<@223876496291266560>")
            message.channel.send("`Hello, my dear creator!`");
        else message.reply("`Hello!`");
    }
    lastmessagesend = message.content;
});

bot.on("guildMemberAdd", (member) => {
    console.log(member.user + " ist dem Server beigetreten! ID: " + member);

    if (member.guild.id !== serverStats.guildID) return;

    bot.channels
        .get(serverStats.totalUsersID)
        .setName(`Total Users : ${member.guild.memberCount}`);
    bot.channels
        .get(serverStats.memberCountID)
        .setName(
            `Member Count : ${member.guild.members.filter((m) => !m.user.bot).size}`
        );
    bot.channels
        .get(serverStats.botCountID)
        .setName(
            `Bot Count : ${member.guild.members.filter((m) => m.user.bot).size}`
        );

    let logChannel = bot.channels.find((channel) => channel.name === "logs");
    if (logChannel)
        logChannel.send(member + " has joined the Server! ID: " + member.id);

    member.send("`Welcome to Senpaii's Discord!`");
    member.send(
        "`Please read through the Rules and accept them with eather choosing !neko or !kitsune to get a rank!`"
    );
});

bot.on("guildMemberRemove", (member) => {
    if (member.guild.id !== serverStats.guildID) return;

    bot.channels
        .get(serverStats.totalUsersID)
        .setName(`Total Users : ${member.guild.memberCount}`);
    bot.channels
        .get(serverStats.memberCountID)
        .setName(
            `Member Count : ${member.guild.members.filter((m) => !m.user.bot).size}`
        );
    bot.channels
        .get(serverStats.botCountID)
        .setName(
            `Bot Count : ${member.guild.members.filter((m) => m.user.bot).size}`
        );

    let logChannel = bot.channels.find((channel) => channel.name === "logs");
    if (logChannel)
        logChannel.send(member + " has left the Server! ID: " + member.id);
});
bot.on("ready", () => {
    let statuses = [
        "Working hardly for my master!",
        "Im not allowed to prefer nekos or kitsunes :3",
        "Creator: Senpaii|先輩#1633",
        "Advantage through technology!",
        "redcore.win is my favorite site!",
    ];
    console.log("Bot is running!");

    setInterval(() => {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status);
        var today = new Date();
        var currentMonth = today.getMonth() + 1;
        var currentDay = today.getDate();
        if (lastmonth != currentMonth && currentDay === 1) {
            var remindChannel = bot.channels.get(remindersChannel);
            if (remindChannel) {
                remindChannel.send(
                    "`oi `<@223876496291266560>`its the first day of the month again! update your gay ass cheat!`"
                );
                lastmonth = currentMonth;
            } else console.log("Coudnt find Log Channel :c");
        }
    }, 10000);

    bot.user.setStatus("Online");

    var channel = bot.channels.find((channel) => channel.name === "logs");
    if (channel) channel.send("`Successfully started up.`");
    else console.log("Coudnt find Log Channel :c");
});
//Discord Server this Bot is on: discord.redcore.cf
bot.login("Hidden"); //Bot by Senpaii -> Discord: Senpaii|先輩#1633