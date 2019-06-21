const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Nieznaleziono użytkownika!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Nie, nie mogę!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nie można zbanować tej osoby!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Zbanowany użytkownik", `${bUser} with ID ${bUser.id}`)
    .addField("Zbanowany przez", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Zbanowany w", message.channel)
    .addField("Czas", message.createdAt)
    .addField("Powód", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "logs"); // kanal gdzie przychodzi powiadomienie
    if(!incidentchannel) return message.channel.send("Nie można znaleźć kanału zdarzeń.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
}

module.exports.help = {
  name:"ban"
}
