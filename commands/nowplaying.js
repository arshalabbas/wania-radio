const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "nowplaying",
    description: "Show now playing radio",
    aliases: ["np"],
    execute(message) {
        const radioCollection = message.client.radio.get(message.guild.id);
        if (!radioCollection) return message.reply("I'm not playing Radio now");
        const radio = radioCollection.radio[0];

        const npEmb = new MessageEmbed()
            .setAuthor('Now Playing', "https://media.giphy.com/media/4Br65Qd4T3l2JpgI1t/giphy.gif")
            .setThumbnail(message.guild.iconURL())
            .setColor(16747679)
            .addFields(
                { name: "Radio Name", value: radio.name },
                { name: "Stream URL", value: radio.link }
            )
            .setTimestamp();
        message.channel.send(npEmb);
    }
}