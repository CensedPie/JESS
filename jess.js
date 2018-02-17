const Discord = require("discord.js");
const logger = require("./logWriterJs.js");
const newdate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

const bot = new Discord.Client();

const auth = require("./auth.json");

bot.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log('Bot has started, with ' + bot.users.size - 1 + ' users, in ' + bot.channels.size + ' channels of ' + bot.guilds.size + ' guilds');
});

bot.on("guildCreate", guild => {
    // This event triggers when the bot joins a server.
    console.log('New guild joined: ' + guild.name +' (id: ' + guild.id + '). This guild has ' + guild.memberCount + ' members!');
});

bot.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a server.
    console.log('I have been removed from: ' + guild.name + ' (id: ' + guild.id + ')');
});

bot.on("message", async message => {

    //If the message is from a bot, don't process it.
    if(message.author.bot) return;

    //If the message doesn't have the identifier .jess don't process it.
    if(message.content.indexOf(auth.prefix) !== 0) return;

    //Split and trim the message content into an array of args = ["arg1", "arg2", "arg3"]
    //Ignores prefix because of slice command
    const args = message.content.slice(auth.prefix.length).trim().split(/ +/g);
    
    //Args to lower case for processing in case people write ARG1 instead of arg1.
    const command = args.shift().toLowerCase();

    //Set Variable to Format Message Date/Time/Author/Username/Content
    var textInfo = (newdate + " " + message.author + " " + message.author.username + ": " + message.content + "\r\n");
    
    //Use function myWrite to save message to a channel named file.
    logger.myWrite(textInfo, message.channel.name);
});

//Log the bot in.
bot.login(auth.token);