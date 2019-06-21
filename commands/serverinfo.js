const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setTitle("Informacje Serwera")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Nazwa Serwera", message.guild.name)
    .addField("Utowrzony w", message.guild.createdAt)
    .addField("Dołączyłeś", message.member.joinedAt)
    .addField("Ilość użytkowników", message.guild.memberCount);

    message.channel.send(serverembed);
}

module.exports.help = {
  name:"serverinfo"
}
