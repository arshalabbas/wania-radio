module.exports = {
    name: "volume",
    aliases: ["v", "vol"],
    description: "Change volume of currently playing radio",
    permissions: ["KICK_MEMBERS"],
    execute(message, args) {
        const radio = message.client.radio.get(message.guild.id);

        if (!radio) return message.reply("I'm not playing Radio Now").catch(console.error);
        if (!args[0]) return message.reply(`🔊 The current volume is: **${radio.volume}%**`).catch(console.error);
        if (isNaN(args[0])) return message.reply("Please use a number to set volume.").catch(console.error);
        if (Number(args[0]) > 100 || Number(args[0]) < 0)
            return message.reply("Please use a number between 0 - 100.").catch(console.error);

        radio.volume = args[0];
        radio.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

        return radio.textChannel.send(`Volume set to: **${args[0]}%**`)
            .then(msg => {
                msg.delete({ timeout: 3000 });
            })
            .catch(console.error);
    }
};
