const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  //!addrole @andrew Dog Person
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Przepraszam, kolego, nie możesz tego zrobić.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Nie można znaleźć tego użytkownika, yo.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Określ rolę!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Nie mogłem znaleźć tej roli.");

  if(rMember.roles.has(gRole.id)) return message.reply("On już ma tę rolę.");
  await(rMember.addRole(gRole.id));

  try{
    await rMember.send(`Gratulacje, otrzymałeś rolę ${gRole.name}`)
  }catch(e){
    console.log(e.stack);
    message.channel.send(`Gratulacje dla <@${rMember.id}>, dostał rolę ${gRole.name}. Próbowaliśmy ich DM, ale ich DM są zablokowane.`)
  }
}

module.exports.help = {
  name: "addrole"
}
