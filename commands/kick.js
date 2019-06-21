const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Nieznaleziono użytkownika!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nie, nie mogę!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nie można wykopać tej osoby!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Wykopany użytkownik", `${kUser} z ID ${kUser.id}`)
    .addField("Wykopany przez", `<@${message.author.id}> z ID ${message.author.id}`)
    .addField("Wykopany w", message.channel)
    .addField("Czas", message.createdAt)
    .addField("Powód", kReason);

    let kickChannel = message.guild.channels.find(`name`, "logs");// kanal gdzie przychodzi powiadomieni
    if(!kickChannel) return message.channel.send("Nie można znaleźć kanału zdarzeń.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
}

module.exports.help = {
  name:"kick"
}
