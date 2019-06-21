const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;
    
 let inviteEmbed = new Discord.RichEmbed()
 .setDescription("[**Zaproszenie**](.............tutaj................)")
 .setColor("#00ff00")
 .setThumbnail(bicon)
 .addField("Oficjalne zaproszenie naszego serwera!", ".......tutaj..........")

 message.channel.send(inviteEmbed);

        message.delete();

}
      module.exports.help = {
        name: "zapro"
      }