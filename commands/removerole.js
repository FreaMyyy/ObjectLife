const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Przepraszam, kolego, nie możesz tego zrobić.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Nie można znaleźć tego użytkownika, yo.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Określ role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Nie można znaleźć takiej roli.");

  if(!rMember.roles.has(gRole.id)) return message.reply("On nie posiadał takiej roli.");
  await(rMember.removeRole(gRole.id));

  try{
    await rMember.send(`RIP, straciłeś ${gRole.name} role.`)
  }catch(e){
    message.channel.send(`RIP dla <@${rMember.id}>, Usunęliśmy ${gRole.name} od ciebie. Próbowałem powiadomić go przez DM, ale miał je zablokowana.`)
  }
}

module.exports.help = {
  name: "removerole"
}
