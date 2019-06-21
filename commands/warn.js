const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  //!warn @daeshan <reason>
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("No can do pal!");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Couldn't find them yo");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("They waaaay too kewl");
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Ostrzeżenia")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("Ostrzeżony Użytkownik", `<@${wUser.id}>`)
  .addField("Ostrzeżony W", message.channel)
  .addField("Ilośc Ostrzeżeń", warns[wUser.id].warns)
  .addField("Powód", reason);

  let warnchannel = message.guild.channels.find(`name`, "logs");//kanał w którym ma przyjsc powiadominie nadawnia przez kogos warna
  if(!warnchannel) return message.reply("Nie znaleziono kanału");

  warnchannel.send(warnEmbed);

  if(warns[wUser.id].warns == 2){
    let muterole = message.guild.roles.find(`name`, "muted");// ranga ktora dostanie za 2 warna
    if(!muterole) return message.reply("Powinieneś stworzyć role :-).");

    let mutetime = "10s";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> został tymczasowow wyciszony.`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> został odciszony.`)
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 3){
    message.guild.member(wUser).ban(reason);///ban za 3 warna, mozna se zmienic na kicka
    message.reply(`<@${wUser.id}> został zbanowany.`)
  }

}

module.exports.help = {
  name: "warn"
}
