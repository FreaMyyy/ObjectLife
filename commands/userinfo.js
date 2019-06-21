const Discord = require('discord.js');

module.exports = {
    name: 'Informacje Użytkownika',
    aliases: ['user'],
    description: 'informacje użytkownika',
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
        const user = message.author;

        const roles = member.roles.map(role => role.toString());
        const color = member.roles.find(role => role.name.charAt(0) === '#');
        const embed = new Discord.RichEmbed()
            .setTitle(`${user.username}`)
            .setColor(color.hexColor)
            .setThumbnail(user.displayAvatarURL)
            .addField('Nazwa', user.username, true)
            .addField('Pseudonim', member.username, true)
            .addField('ID', user.id, true)
            .addField('Konto Utworzone', user.createdAt.toDateString(), true)
            .addField('Dołączył Na Serwer', member.joinedAt.toDateString(), true)
            .addField('Rola', roles.join(' **|** '), true)
            .setFooter('Informacje Użytkownika', user.displayAvatarURL);

        message.channel.send(embed);
    },
};