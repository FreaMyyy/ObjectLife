const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("Informacje Bota")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Nazwa Bota", bot.user.username)
    .addField("Utworzony w ", bot.user.createdAt);

    message.channel.send(botembed);
}

module.exports.help = {
  name:"botinfo"
}
