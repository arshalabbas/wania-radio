const { MessageEmbed } = require('discord.js');
const { radioLinks } = require('../util/radioLinks');
index = -1;
module.exports = {
    name: "play",
    description: "Stream radio in voice channel.\nUsage:\n`;p` - for default radio channels.\n`;p <stream URL>` - for stream custom radio.",
    aliases: ["p", "stream"],
    async execute(message, args) {
        const channel = message.member.voice.channel;
        if (channel == null) return message.reply("You need to join voice channel");
        const permissions = channel.permissionsFor(message.client.user);
        if (!channel) return message.reply("You need to join voice channel.");
        if (!permissions.has("CONNECT"))
            return message.reply("Cannot connect to voice channel, missing permissions");
        if (!permissions.has("SPEAK"))
            return message.reply("I cannot speak in this voice channel, make sure I have the proper permissions!");

        const radioConstruct = {
            radio: [],
            textChannel: message.channel,
            connection: null,
            volume: 100,
            playingMessage: null,
        }

        const playEmb = new MessageEmbed()
            .setAuthor('Now Playing', "https://media.giphy.com/media/4Br65Qd4T3l2JpgI1t/giphy.gif")
            .setThumbnail(message.guild.iconURL())
            .setColor(16747679)
            .setTimestamp();
        let radio = null;
        const connection = await channel.join();
        await connection.voice.setSelfDeaf(true);
        radioConstruct.connection = connection;
        if (!args.length) {
            if (index >= radioLinks.length - 1) {
                index = 0;
            } else {
                index++;
            }
            const element = index;
            const randomRadio = radioLinks[element];
            await connection.play(randomRadio.link);
            playEmb.addFields(
                { name: "Radio Name", value: randomRadio.name },
                { name: "Stream URL", value: randomRadio.link }
            );
            radio = {
                name: randomRadio.name,
                link: randomRadio.link
            }
            radioConstruct.playingMessage = message.channel.send(playEmb);
        } else {
            const url = args[0];
            var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            if (!pattern.test(url)) {
                channel.leave();
                return message.reply("Give valid stream link.")
            }
            var radioName = url.split("/").pop();
            if (radioName.endsWith(".mp3")) {
                radioName = radioName.substr(0, radioName.length - 4);
            }
            if (radioName.includes("?") || radioName.includes("&") || radioName.includes(".")) {
                radioName = "I cant fetch the name of this radio."
            }
            await connection.play(url);
            playEmb.addFields(
                { name: "Radio Name", value: radioName },
                { name: "Stream URL", value: url }
            );
            radio = {
                name: radioName,
                link: url
            }
            radioConstruct.playingMessage = message.channel.send(playEmb);
        }
        radioConstruct.radio.push(radio);
        message.client.radio.set(message.guild.id, radioConstruct);
    }
}