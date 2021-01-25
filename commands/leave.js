module.exports = {
    name: "leave",
    description: "Stop the radio and leave vc",
    aliases: ["stop", "s", "dc"],
    permissions: ["KICK_MEMBERS"],
    async execute(message) {
        const radio = message.client.radio.get(message.guild.id);
        if (!radio) return message.reply("I'm not in vc now.");
        const vc = message.member.voice.channel;
        if (vc) {
            await vc.leave();
            await message.react("👋");
            const radio = message.client.radio.get(message.guild.id);
            message.client.radio.delete(message.guild.id);
        } else {
            message.reply("You need to join vc to kick me.");
        }
    }
}