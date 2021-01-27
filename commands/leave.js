module.exports = {
    name: "leave",
    description: "Stop the radio and leave vc",
    aliases: ["stop", "s", "dc"],
    permission: ["KICK_MEMBER"],
    async execute(message) {
        if (!radio) return message.reply("I'm not playing Radio now");
        const { channel } = message.member.voice;
        if (!channel) return message.reply("You need to join vc to kick me.");
        await channel.leave();
        await message.react("👋");
        message.client.radio.delete(message.guild.id);

    }
}