const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
let bicon = bot.user.displayAvatarURL;
let donateEmb = new Discord.RichEmbed()
.setColor("#00ff00")
.setTitle("Donate")
.setDescription("Dobrowolne Darowizny!")
.addField("Napisz do kogoś z Administracji!")
.setFooter("Darowizny Dzięki którym możemy się rozwijać!")
.setThumbnail(bicon)

message.channel.send(donateEmb)

message.delete();

}

module.exports.help = {
  name: "donate"
}